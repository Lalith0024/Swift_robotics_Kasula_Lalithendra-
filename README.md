# EconWatch

A country-level economic news monitoring agent built as a take-home assignment for Swift Robotics.

The idea is simple: you pick the countries, topics, or competitors you care about, and EconWatch continuously watches the web for relevant updates, filters out the noise, and shows you a clean feed of what actually matters.

---

## What it does

- Pulls news in real time using the Zenserp search API
- Filters out irrelevant or duplicate articles automatically
- Summarizes each article into a short structured update (title, summary, category, sentiment)
- Shows live US macroeconomic indicators (GDP, inflation, unemployment) pulled from the World Bank
- Lets you manage your tracked topics, sources, and competitors from the settings panel

## Tech stack

**Backend** — Python 3.11, FastAPI, SQLite, APScheduler, httpx  
**Frontend** — React 18, Vite, plain CSS  
**Data** — Zenserp (news), World Bank API (indicators)

---

## Running locally

### 1. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload
```

The backend will start at `http://localhost:8000`.

### 2. Set up the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (or whichever port Vite picks) in your browser.

### 3. Environment

The only required environment variable is already in `backend/.env`:

```
ZENSERP_API_KEY=386936d0-7520-11f1-9cf8-65009a64d175
DATABASE_URL=sqlite:///./econwatch.db
```

SQLite creates the database file automatically on first run. No external database setup needed.

---

## Project structure

```
econwatch/
├── backend/
│   ├── app/
│   │   ├── agent/          # Fetchers, filters, summarizer, scheduler
│   │   ├── api/            # FastAPI route handlers
│   │   ├── db/             # Database setup and initialization
│   │   └── models/         # SQLAlchemy models and Pydantic schemas
│   ├── seed.py             # Populates the DB with starter data
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/     # Dashboard, Settings, Onboarding UI
│       ├── hooks/          # useNews, useSettings, usePolling
│       └── services/       # API client
└── documentation/
    ├── project_guide.md    # Architecture decisions and how the pipeline works
    ├── setup.md            # Detailed setup instructions
    └── further_development.md  # What I'd build next
```

---

## Documentation

- [How it works / architecture](documentation/project_guide.md)
- [Detailed setup guide](documentation/setup.md)
- [What I'd improve next](documentation/further_development.md)
