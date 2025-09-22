
# Chatbot Ollama

## 📋 Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)
- [Extra Features](#extra-features)
- [Design Trade-offs](#design-trade-offs)

---

## ⚡ Introduction
Chatbot Ollama is a full-stack chatbot application using Ollama as the LLM backend. It features a FastAPI backend and a Next.js/React frontend for a modern, interactive chat experience.

---

## ✨ Key Features
- FastAPI backend for async API and Pydantic validation
- Next.js frontend with React and Tailwind CSS
- Local LLM inference via Ollama
- Extensible architecture for extra features

---

## 🏗️ Architecture
See `docs/architecture.png` for a visual overview.

---

## 📋 Requirements
- Python 3.7+
- Node.js 14+
- npm 6+
- Ollama (for local LLM inference)

---

## 🚀 Getting Started

**Clone the repo:**
```sh
git clone https://github.com/haze1166/chatbot-ollama.git
cd chatbot-ollama
```

**Install backend dependencies:**
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Install frontend dependencies:**
```sh
cd frontend
npm install
npm run dev
```

---

## 🐥 Frontend
- Built with Next.js, React, and Tailwind CSS
- Chat UI with glassmorphism effects
- Run locally: `npm run dev`

---

## 🗄️ Backend
- FastAPI server for chat API
- Connects to Ollama for LLM inference
- Run locally: `uvicorn main:app --reload`

---

## 🛠️ Extra Features
See `docs/extra-features.md` for planned and optional features:
- Authentication
- Chat memory
- Custom themes

---

## ⚖️ Design Trade-offs
See `docs/tradeoffs.md` for more details:
- FastAPI for async and validation, but requires Python knowledge
- Next.js for SSR, but more complex than plain React
- Ollama for local LLM, but needs local resources



