# FastAPI entry point


from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from backend.schemas import ChatRequest, ChatResponse, UserRegister, UserLogin, TokenResponse
from backend.ollama_client import get_ollama_response
import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta



from typing import Dict, List
# Simple in-memory user store and chat memory
users_db: Dict[str, bytes] = {}
chat_memory: Dict[str, List[Dict[str, str]]] = {}
SECRET_KEY = "supersecretkey"  # Change for production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Auth helpers
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None or username not in users_db:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication")

# Registration endpoint
@app.post("/register", response_model=TokenResponse)
def register(user: UserRegister):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    users_db[user.username] = hashed
    access_token = create_access_token({"sub": user.username})
    return TokenResponse(access_token=access_token)

# Login endpoint
@app.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password
    hashed = users_db.get(username)
    if not hashed or not bcrypt.checkpw(password.encode(), hashed):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token({"sub": username})
    return TokenResponse(access_token=access_token)


# Protected chat endpoint with memory
@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest, username: str = Depends(get_current_user)):
    # Retrieve user memory
    history = chat_memory.get(username, [])
    # Add user message to history
    history.append({"sender": "user", "text": request.message})
    # Get bot response
    response = get_ollama_response(request.message)
    # Add bot response to history
    history.append({"sender": "bot", "text": response})
    # Save updated history
    chat_memory[username] = history
    return ChatResponse(response=response)

# Endpoint to get chat history for current user
@app.get("/history")
def get_history(username: str = Depends(get_current_user)):
    return chat_memory.get(username, [])
