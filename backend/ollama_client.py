
# Helper to interact with local Ollama API
import requests
import json

def get_ollama_response(message: str) -> str:
    response = requests.post(
        "http://127.0.0.1:11434/api/chat",
        json={
            "model": "gemma3:1b",  # or another model you have
            "messages": [{"role": "user", "content": message}]
        },
        stream=True
    )
    full_reply = ""
    for line in response.iter_lines():
        if line:
            data = json.loads(line.decode("utf-8"))
            # Debug: print each chunk
            print("Ollama chunk:", data)
            if "error" in data:
                return f"Ollama error: {data['error']}"
            if "message" in data and isinstance(data["message"], dict):
                full_reply += data["message"].get("content", "")
    return full_reply
