from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React Native

load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Retrieve User information - to become dynamic by retrieving front-end
Nickname = "John"
Interest = "Likes playing gacha game"
Music_Genre = "JPOP"
PHQ9_response = "0, 0, 0, 0, 0, 1, 1, 1, 1"

PHQ9_question = """
Over the last 2 weeks, how often have you been bothered by the following problems?
Not at all - 0, Several days - 1, More than half the days - 2, Nearly every day - 3

1. Little interest or pleasure in doing things
2. Feeling down, depressed, or hopeless
3. Trouble falling or staying asleep, or sleeping too much
4. Feeling tired or having little energy
5. Poor appetite or overeating
6. Feeling bad about yourself — or that you are a failure or have let yourself or your family down
7. Trouble concentrating on things, such as reading or watching TV
8. Moving or speaking slowly, or the opposite — being fidgety or restless
9. Thoughts that you would be better off dead, or of hurting yourself
"""

# Emergency mental health hotlines in Singapore
Sg_SOS = """
Singapore Hotlines:
1. Samaritans of Singapore: 24-hour Hotline: 1767
2. Samaritans of Singapore: 24-hour CareText: 9151 1767 (via WhatsApp)
3. Institute of Mental Health: 24-hour Hotline: 6389 2222
4. TOUCHline: Monday to Friday, 9:00am – 6:00pm (excluding pH): 1800 377 2252
"""
# Ban Words 
NG_Words = "Die, Kill, Cut the rope, Suicide"

# OpenAI System Prompt for Chatbot Chat
SYSTEM_PROMPT = f"""You are Souly, a warm and empathetic mental wellness assistant. 

Tone and Approach:
- Maintain a calm, friendly, and understanding tone.
- Always validate and acknowledge emotions before offering guidance.
- Provide gentle support and coping advices based on their needs.
- If the user mentions self-harm or suicidal thoughts or any {NG_Words}, encourage them to seek professional help and immediately share these Singapore hotlines: {Sg_SOS}.

Ensuring a Natural Flow:
- If a user expresses frustration, remain patient and understanding.
- Tailor responses based on the user’s mood and needs to ensure they feel supported.
- As much as possible, respond to the user's input and make them feel heard.

Personalization
- Always use their {Nickname}
- For advices, recommend relaxation techniques related to their {Interest} or music related to their {Music_Genre}
"""
# ------------------ Chat Route ------------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=700,
            temperature=0.7
        )
        bot_reply = response.choices[0].message.content
        return jsonify({"response": bot_reply})
    except Exception as e:
        print("🔥 Chat error:", e)
        return jsonify({"error": str(e)}), 500

# ------------------ OpenAI Query Helper ------------------
def query_openai_api(messages, max_retries=3, delay=10):
    for attempt in range(max_retries):
        try:
            response = openai.ChatCompletion.create(
                #model="gpt-3.5-turbo-0125",
                model="gpt-4o",
                messages=messages,
                max_tokens=800,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Retrying... ({attempt+1}/{max_retries}) Error: {str(e)}")
            time.sleep(delay)
    return "Sorry, the model is currently unavailable. Please try again later."

# ------------------ Summary Generator ------------------
def generate_summary(messages):
    summary_prompt = f"""Based on our conversation, summarize the user's concerns in a compassionate and supportive manner. Your summary should include:
    1. A gentle recap of their emotional state: Identify the key issues they have expressed, using empathetic and reassuring language.
    2. A well-being assessment: If their responses suggest symptoms of depression (e.g., persistent sadness, loss of interest, fatigue, sleep/appetite disturbances, low self-worth, or thoughts of self-harm), kindly acknowledge that they might be experiencing symptoms of depression. 
    3. You may only mention that they are at risk of depression (either low, medium or high). Do not diagnose them as depressed — simply express concern and suggest professional support or seek medical attention for an accurate diagnosis.
    4. Personalized coping advice: Offer realistic, actionable suggestions based on their concerns, such as self-care techniques, mindfulness exercises, or seeking support from loved ones.
    5. Encouragement to seek help if needed: If they mentioned self-harm or suicidal thoughts, gently emphasize the importance of reaching out for professional help. Provide these helplines in Singapore: {Sg_SOS}
    Ensure your tone remains warm, understanding, and non-judgmental. 
    End with a beautiful life quote.

    Always end with a full stop.
    """
    full_messages = messages + [{"role": "user", "content": summary_prompt}]
    return query_openai_api(full_messages)

# ------------------ Summary Route ------------------
@app.route("/summary", methods=["POST"])
def summarize():
    data = request.json
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "Conversation history is required"}), 400

    try:
        summary = generate_summary(messages)
        return jsonify({"summary": summary})
    except Exception as e:
        print("🔥 Summary error:", e)
        return jsonify({"error": str(e)}), 500
    

# ------------------ PHQ9 Generator ------------------
def generate_phq(messages):
    phq_prompt = f"""You are Souly, a warm and empathetic mental wellness assistant. 
    
    The user is named {Nickname}.
    Here are their PHQ-9 responses: {PHQ9_response}
    These responses correspond to the following questions: {PHQ9_question}

    Please follow the steps below in your response without showing the guideline:

    1. Calculate the total PHQ-9 score by summing the values in the response list.
    2. Use the following guideline to assess risk level:
       - 0–4: Minimal risk of depression
       - 5–9: Mild risk of depression
       - 10–14: Moderate risk of depression
       - 15–19: Moderately severe risk of depression
       - 20–27: Severe risk of depression

    3. Based on the total score, determine the user's risk level of depression.
    4. If the score is below 15:
       - Identify which answers have a score of 4 and give personalized advice for those specific symptoms only.
    5. If the score is 15 or above, provide:
       - Advice for 1 or 2 questions that scored 3 or 4
       - Gently encourage the user to seek professional help.
       - Include these mental health helplines in Singapore: {Sg_SOS}

    Ensure that your tone should be warm, understanding, non-judgmental, gentle and supportive.
    This is NOT an email. 
    """
    full_messages = messages + [{"role": "user", "content": phq_prompt}]
    return query_openai_api(full_messages)

# ------------------ PHQ9 Route ------------------
@app.route("/phq", methods=["POST"])
def phq9():
    data = request.json
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "Conversation history is required"}), 400

    try:
        phq_response = generate_phq(messages)
        return jsonify({"phq_response": phq_response})
    except Exception as e:
        print("🔥 PHQ9 error:", e)
        return jsonify({"error": str(e)}), 500

# ------------------ Home Route ------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask Chatbot API is running!"})

# ------------------ Run Server ------------------
if __name__ == "__main__":
    app.run(debug=True)