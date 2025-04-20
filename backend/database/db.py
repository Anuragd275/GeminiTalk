from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt

load_dotenv()

MONGO_CONNECTION_URI = os.getenv("MONGO_CONNECTION_URI")


client = MongoClient(MONGO_CONNECTION_URI)
db = client['user']
collection = db['userData']

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


def db_signup(user_email, password):
    try:
        result = collection.find_one({'email': user_email})
        if result:
            return False
        else:
            password = hash_password(password)
            result = collection.insert_one({'email': user_email, 'password': password})
            return True
    except Exception as e:
        return str(e)
    
def db_signin(user_email, password):
    try:
        user = collection.find_one({'email': user_email})
        if not user:
            return False

        stored_hashed_password = user['password']

        if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
            return True
        else:
            return False
    except Exception as e:
        return str(e)
