# Extra helpers (logging, error handling)
import logging

def setup_logger():
    logging.basicConfig(level=logging.INFO)
    return logging.getLogger("chatbot-ollama")
