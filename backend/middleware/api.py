import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# Use a specific model — create it once
model = genai.GenerativeModel("gemini-1.5-flash")  # or "gemini-pro", "gemini-1.5-pro"

def generate_response(user_text):
    try:
        response = model.generate_content(user_text)
        return response.text
    except Exception as e:
        return str(e)
