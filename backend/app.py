from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from hrv_analyzer import HRVAnalyzer  
from database import save_heart_rate_data  # ✅ Import database function
import sqlite3  # ✅ Add this line
import json  # ✅ Import json to parse JSON strings
import bcrypt
import random
from datetime import datetime, timedelta, timezone
import smtplib

app = Flask(__name__)
CORS(app)

# ✅ Initialize HRVAnalyzer
hrv_analyzer = HRVAnalyzer()

# ✅ Define the database path
DB_PATH = "heart_rate.db"

# ✅ Email Config (Use your email credentials)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "soulgood108@gmail.com"
EMAIL_PASSWORD = "vtjebcxxwqhwoenk"




# 🔹 User Signup
@app.route('/signup', methods=['POST'])
def signup():
    """Registers a new user"""
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    picture = data.get('picture')  # URL or base64 image
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (name, email, picture, password) VALUES (?, ?, ?, ?)", 
                       (name, email, picture, hashed_password))
        user_id = cursor.lastrowid  # Get the assigned user ID
        conn.commit()
        conn.close()

        return jsonify({
            "message": "User registered successfully!",
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "picture": picture
            }
        }), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 409


# 🔹 Get User by ID
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Fetch user details without exposing password"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email, picture FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "picture": user[3]
        }), 200
    else:
        return jsonify({"error": "User not found"}), 404


# 🔹 Update User Profile (Only updates provided fields)
@app.route('/user/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update name, email, or picture only if provided"""
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    picture = data.get('picture')

    update_fields = []
    values = []

    if name and name.strip():
        update_fields.append("name = ?")
        values.append(name.strip())
    if email and email.strip():
        update_fields.append("email = ?")
        values.append(email.strip())
    if picture and picture.strip():
        update_fields.append("picture = ?")
        values.append(picture.strip())

    if not update_fields:
        return jsonify({"error": "No valid fields provided for update"}), 400

    values.append(user_id)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"UPDATE users SET {', '.join(update_fields)} WHERE id = ?", values)
    conn.commit()
    conn.close()

    return jsonify({"message": "User updated successfully!"}), 200


# 🔹 Helper Function to Send Email
def send_email(to_email, subject, message):
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            email_message = f"Subject: {subject}\n\n{message}"
            server.sendmail(EMAIL_SENDER, to_email, email_message)
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
    return True

# 🔹 Helper Function to Send Reset-Code
@app.route('/user/send-reset-code', methods=['POST'])
def send_reset_code():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400
    normalized_email = email.strip().lower()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 🔹 Check if user exists and get user_id
    cursor.execute("SELECT id FROM users WHERE email=?", (normalized_email,))
    user = cursor.fetchone()

    if not user:
        conn.close()
        return jsonify({"error": "User not found"}), 404  # 🔥 Return error if user doesn't exist

    user_id = user[0]  # Extract user_id

    # Generate a 4-digit verification code
    reset_code = str(random.randint(1000, 9999))
    expiration_time = datetime.utcnow().replace(tzinfo=timezone.utc) + timedelta(seconds=60)  # Ensure UTC

    # 🔹 Store user_id, email, reset_code, and expiration time
    cursor.execute("""
        INSERT INTO password_reset_codes (user_id, email, reset_code, expires_at) 
        VALUES (?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET user_id=?, reset_code=?, expires_at=?
    """, (user_id, email, reset_code, expiration_time.isoformat(), user_id, reset_code, expiration_time.isoformat()))

    conn.commit()
    conn.close()

    # DEBUG: Print stored code details
    print(f"DEBUG: Stored reset code {reset_code} for user {user_id} ({email}), expires at {expiration_time}")

    # Send email
    email_sent = send_email(email, "Your SouGood iOS Mobile App Password Reset Code", f"Your reset code is: {reset_code}")
    if not email_sent:
        return jsonify({"error": "Failed to send email"}), 500

    return jsonify({"message": "Reset code sent successfully", "expires_in": "60 seconds"}), 200


# 🔹 Helper Function to Verify Reset-Code
@app.route('/user/verify-reset-code', methods=['POST'])
def verify_reset_code():
    data = request.get_json()
    email = data.get("email")
    reset_code = data.get("reset_code")

    if not email or not reset_code:
        return jsonify({"error": "Email and reset code are required"}), 400

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # 🔍 DEBUG: Log all stored reset codes for the email
        cursor.execute("SELECT * FROM password_reset_codes WHERE email=?", (email,))
        all_entries = cursor.fetchall()
        print(f"DEBUG: Stored Reset Codes for {email}: {all_entries}")

        # Fetch reset code details
        cursor.execute("""
            SELECT users_id, reset_code, expires_at 
            FROM password_reset_codes 
            WHERE email=?
        """, (email,))
        
        record = cursor.fetchone()
        conn.close()

        if not record:
            print(f"DEBUG: No reset code found for {email}")
            return jsonify({"error": "Reset code expired or not found."}), 400

        user_id, stored_code, expires_at_str = record
        print(f"DEBUG: Found record - Code: {stored_code}, Expires At: {expires_at_str}")

        # ✅ Ensure `expires_at` is correctly parsed with UTC
        expires_at = datetime.fromisoformat(expires_at_str)
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)  # Assume UTC if missing

        # ✅ Get current time in UTC
        current_time = datetime.now(timezone.utc)
        print(f"DEBUG: Current UTC Time: {current_time}, Expiration Time: {expires_at}")

        # ✅ Compare correctly
        if current_time > expires_at:
            print(f"DEBUG: Reset code expired! Now: {current_time}, Expiration: {expires_at}")
            return jsonify({"error": "Reset code expired."}), 400

        if str(stored_code).strip() != str(reset_code).strip():
            print(f"DEBUG: Incorrect reset code! Expected: {stored_code}, Got: {reset_code}")
            return jsonify({"error": "Incorrect reset code."}), 400

        return jsonify({
            "message": "Reset code verified! Proceed to reset password",
            "userId": user_id  # 🔥 Now the response includes userId
        }), 200

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

# 🔹 Reset Password
@app.route('/user/reset-password/<int:user_id>', methods=['PUT'])
def reset_password(user_id):
    """Reset user's password"""
    data = request.get_json()
    new_password = data.get('new_password')

    if not new_password or not new_password.strip():
        return jsonify({"error": "New password is required"}), 400

    hashed_password = bcrypt.hashpw(new_password.strip().encode('utf-8'), bcrypt.gensalt())

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed_password, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Password reset successfully!"}), 200


# 🔹 User Login
@app.route('/login', methods=['POST'])
def login():
    """Authenticates a user and returns user ID"""
    data = request.get_json()
    email = data.get('email')  # Use email for login
    password = data.get('password')

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, picture, password FROM users WHERE email=?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[4]):  # No need to encode user[4]
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "picture": user[3]
            }
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# code below has to change
@app.route('/receive_heart_rate', methods=['POST'])
def receive_heart_rate():
    """ ✅ Receives heart rate data, processes it, and saves it per user """
    
    data = request.get_json()
    user_id = data.get("user_id")  # 🔥 User ID required

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    heart_rate_data = data.get("heart_rate_data", [])
    device = data.get("device", "Unknown Device")

    if not heart_rate_data:
        return jsonify({"error": "No heart rate data provided"}), 400

    print(f"📡 Received heart rate data from user {user_id} ({device})")

    df = pd.DataFrame(heart_rate_data)
    df = df.rename(columns={"timestamp": "dt", "value": "bpm"})

    processed_data = hrv_analyzer.preprocess_hrv_data(df)
    if processed_data.empty:
        return jsonify({"error": "Insufficient HRV data"}), 400

    features = ['SDNN', 'RMSSD', 'LF/HF']
    processed_features = processed_data[features].dropna()

    if processed_features.empty:
        return jsonify({"error": "Not enough valid data for stress prediction"}), 400

    depression_risk_score = hrv_analyzer.analyze_depression_risk(processed_features)

    # Determine stress risk
    if (0.0<=depression_risk_score<0.3):
        stress_risk = "Normal"
    elif (0.3<=depression_risk_score<0.6):
        stress_risk = "Moderate Stress"
    else:
        stress_risk = "High Stress"
        songs = hrv_analyzer.recommend_music(depression_risk_score)

    # Store results in the database with `user_id`
    save_heart_rate_data(
        user_id=user_id,  
        device=device,
        timestamp=pd.Timestamp.now().isoformat(),
        stress_risk=stress_risk,
        processed_features=processed_features.to_json(),
        stress_predictions=depression_risk_score
    )
    if stress_risk != "High Stress":
        return jsonify({
            "message": "Heart rate data processed successfully",
            "stress_risk": stress_risk,
            "stress_predictions": depression_risk_score,
        })
    else:
        return jsonify({
            "message": "Heart rate data processed successfully",
            "stress_risk": stress_risk,
            "stress_predictions": depression_risk_score,
            "Songs":songs
        })

# this might have to change as well
@app.route('/get_latest_heart_rate', methods=['GET'])
def get_latest_heart_rate():
    """Retrieve the latest heart rate record for a specific user"""
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    conn = sqlite3.connect("heart_rate.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM heart_rate_records WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1
    """, (user_id,))
    record = cursor.fetchone()
    conn.close()

    if record:
        return jsonify({
            "id": record[0],
            "device": record[2],
            "timestamp": record[3],
            "stress_risk": record[4],
            "processed_features": json.loads(record[5]),
            "stress_predictions": json.loads(record[6])
        })
    else:
        return jsonify({"error": "No records found for this user"}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5050)
