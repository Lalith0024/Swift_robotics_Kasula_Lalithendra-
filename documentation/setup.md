# Setup

## Requirements

- Python 3.11 or later
- Node.js 18 or later

That's it. No Docker, no external database, no cloud services.

---

## Backend

Navigate to the `backend` folder and create a virtual environment:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Seed the database with starter topics and a Zenserp source:

```bash
python seed.py
```

Start the server:

```bash
uvicorn app.main:app --reload
```

The API will be running at `http://localhost:8000`. You can explore all endpoints at `http://localhost:8000/docs`.

### Environment variables

The `.env` file in `backend/` already has everything you need:

```
ZENSERP_API_KEY=386936d0-7520-11f1-9cf8-65009a64d175
DATABASE_URL=sqlite:///./econwatch.db
POLLING_INTERVAL_MINUTES=15
```

The database file (`econwatch.db`) is created automatically in the `backend/` folder the first time the server starts. You don't need to run any migrations or setup commands.

---

## Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will tell you which port it's running on (usually 5173, sometimes 5174 or 5175 if those are in use). Open that URL in your browser.

---

## Verifying it works

1. Open the frontend URL in your browser. You should see the onboarding modal on first visit.
2. Go to the dashboard. Click **Fetch Now** to trigger an immediate news fetch instead of waiting 15 minutes.
3. After a few seconds, refresh — articles should appear in the feed.
4. The three indicator cards at the top (GDP, Inflation, Unemployment) pull from the World Bank's public API. They should show real values automatically.

---

## Triggering a manual fetch

You can also trigger a fetch cycle directly from the terminal:

```bash
curl -X POST http://localhost:8000/api/fetch-now
```

Or from the browser's address bar, hit `http://localhost:8000/docs` and use the `/api/fetch-now` endpoint there.
