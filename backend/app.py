import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from database.db import *
from middleware.api import *

load_dotenv()

app = Flask(__name__)
CORS(app)

# index
@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"


@app.route('/signup', methods=['POST'])
def signup():

    data = request.json
    user_email = data['user_email']
    password = data['password']

    try:
        result = db_signup(user_email, password)
        if result:
            return jsonify({'message': 'Signup successful'}), 200
        else:
            return jsonify({'message': 'Signup failed'}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/signin', methods=['POST'])
def signin():

    data = request.json
    user_email = data['user_email']
    password = data['password']

    try:
        result = db_signin(user_email, password)
        if result:
            return jsonify({'message': 'Signin successful'}), 200
        else:
            return jsonify({'message': 'Signin failed'}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data['user_text']

    try:
        result = generate_response(user_text)
        if result:
            return jsonify({'message': result}), 200
        else:
            return jsonify({'message': 'Chat failed'}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)