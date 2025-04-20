import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def generate_response(user_text):

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=user_text
        )
        
        return response.text
    except Exception as e:
        return str(e)