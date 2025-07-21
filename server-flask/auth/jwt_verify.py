import jwt
from flask import request
from dotenv import load_dotenv
import os

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")

def verify_jwt():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None, 'Missing Authorization header'

    try:
        token = auth_header.split(" ")[1]
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded, None
    except jwt.ExpiredSignatureError:
        return None, 'Token expired'
    except jwt.InvalidTokenError:
        return None, 'Invalid token'
