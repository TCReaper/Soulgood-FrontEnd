import sqlite3
import json
from datetime import datetime

# Database file path
DB_PATH = "heart_rate.db"

def init_db():
    """Initialize the database and create necessary tables if they don't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("🔍 Initializing database...")

    # ✅ Create Users Table (Updated Schema)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        picture TEXT,
        password TEXT NOT NULL
    )
    """)
        # ✅ Create Heart Rate Records Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS heart_rate_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        device TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        entry_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        stress_risk TEXT NOT NULL,
        processed_features TEXT NOT NULL,
        stress_predictions TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)

    # ✅ Create Password Reset Codes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS password_reset_codes (
        email TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        reset_code TEXT NOT NULL,
        expires_at TEXT NOT NULL
    )
    """)

    # ✅ Modify heart rate table to include user_id
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS heart_rate_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        device TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        entry_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        stress_risk TEXT NOT NULL,
        processed_features TEXT NOT NULL,
        stress_predictions TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    """)

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully!")


def check_and_update_db():
    """Check and update the database schema to ensure it matches the new structure."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("🔍 Checking database schema...")

    # Check columns in the users table
    cursor.execute("PRAGMA table_info(users)")
    user_columns = [column[1] for column in cursor.fetchall()]

    if "username" in user_columns:
        print("⚠️ Removing old 'username' column and updating to 'name' and 'email'...")
        cursor.execute("ALTER TABLE users RENAME TO users_old")

        cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            picture TEXT,
            password TEXT NOT NULL
        )
        """)

        cursor.execute("""
        INSERT INTO users (id, name, password)
        SELECT id, username, password FROM users_old
        """)

        cursor.execute("DROP TABLE users_old")
        conn.commit()
        print("✅ Users table updated!")

    # Check columns in heart_rate_records table
    cursor.execute("PRAGMA table_info(heart_rate_records)")
    columns = [column[1] for column in cursor.fetchall()]

    # ✅ Remove 'bpm' column if it exists
    if "bpm" in columns:
        print("⚠️ Removing unused 'bpm' column...")
        cursor.execute("""
            CREATE TABLE heart_rate_records_new AS
            SELECT id, user_id, device, timestamp, entry_date, stress_risk, processed_features, stress_predictions
            FROM heart_rate_records
        """)
        cursor.execute("DROP TABLE heart_rate_records")
        cursor.execute("ALTER TABLE heart_rate_records_new RENAME TO heart_rate_records")
        conn.commit()
        print("✅ 'bpm' column removed!")

    # ✅ Ensure 'entry_date' column exists
    if "entry_date" not in columns:
        print("⚠️ Missing 'entry_date' column! Updating database schema...")
        cursor.execute("ALTER TABLE heart_rate_records ADD COLUMN entry_date DATETIME DEFAULT CURRENT_TIMESTAMP")
        conn.commit()
        print("✅ Database schema updated!")

    conn.close()
    print("✅ Database check complete.")


def save_heart_rate_data(user_id, device, timestamp, stress_risk, processed_features, stress_predictions):
    """Save heart rate analysis for a specific user"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO heart_rate_records (user_id, device, timestamp, stress_risk, processed_features, stress_predictions)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (user_id, device, timestamp, json.dumps(stress_risk), json.dumps(processed_features), json.dumps(stress_predictions)))

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False


def get_latest_heart_rate():
    """Retrieve the most recent heart rate record."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    print("🔍 Fetching the latest heart rate record...")
    cursor.execute("""
    SELECT * FROM heart_rate_records ORDER BY timestamp DESC LIMIT 1
    """)
    record = cursor.fetchone()
    conn.close()

    if record:
        print(f"✅ Latest Record: {record}")
    else:
        print("⚠️ No records found!")

    return record


# ✅ Initialize and update the database
init_db()
check_and_update_db()
