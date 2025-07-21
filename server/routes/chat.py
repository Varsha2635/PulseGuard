import openai
from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

chat_bp = Blueprint('chat', __name__)

@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4"
            messages=[
                {"role": "system", "content": "You are a helpful AI health assistant who gives advice related to heart disease."},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=150
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
