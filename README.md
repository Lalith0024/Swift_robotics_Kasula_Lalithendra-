# EconWatch — Country Economic News Monitoring Agent

![EconWatch](/public/screenshot-placeholder.png)

EconWatch is an AI-powered agent designed for Swift Robotics to monitor economic updates, filter out noise, and deliver structured insights. 

It features an intelligent orchestration backend that fetches from multiple APIs (NewsAPI, GNews, FRED), deduplicates articles, and uses LLMs (Anthropic Claude or Groq Llama 3) to summarize signal over noise. The frontend is built with React, styled in Swift Robotics' visual aesthetic, and offers real-time polling updates.

## Quick Start

### 1. Configure Environment
Copy `.env.example` to `.env` in the `backend/` directory and add your API keys.

### 2. Boot Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload
```

### 3. Boot Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to get started.

## Documentation
- [Project Architecture & Design Decisions](documentation/project_guide.md)
- [Detailed Setup Instructions](documentation/setup.md)
- [Further Development Roadmap](documentation/further_development.md)
