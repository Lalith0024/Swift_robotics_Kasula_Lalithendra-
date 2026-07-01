# Setup Guide

## Prerequisites

- Node.js (v18+)
- Python (3.11+)

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in the required keys.

```env
# At least ONE of the following is required for AI features
ANTHROPIC_API_KEY=your_anthropic_api_key
GROQ_API_KEY=your_groq_api_key

# Free News APIs (at least one is required)
NEWSAPI_KEY=your_newsapi_key
GNEWS_API_KEY=your_gnews_api_key
FRED_API_KEY=your_fred_api_key
```

### Getting Free API Keys
- **Groq**: https://console.groq.com/keys
- **NewsAPI**: https://newsapi.org/register
- **GNews**: https://gnews.io/
- **FRED**: https://fred.stlouisfed.org/docs/api/api_key.html

## Running the Application

### 1. Backend

Navigate to the `backend` directory, install requirements, and run the server:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

*Note: The database will be created automatically on the first startup.*

#### Seeding Initial Data
To populate the database with default topics and sources for demo purposes:
```bash
python seed.py
```

### 2. Frontend

Open a new terminal window, navigate to the `frontend` directory, install dependencies, and run Vite:

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.
