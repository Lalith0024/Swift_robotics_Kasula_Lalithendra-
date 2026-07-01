from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes_news, routes_topics, routes_sources, routes_competitors
from app.db.init_db import init_db
from app.agent.scheduler import start_scheduler

app = FastAPI(title="EconWatch API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    start_scheduler()

app.include_router(routes_news.router, prefix="/api/news", tags=["News"])
app.include_router(routes_topics.router, prefix="/api/topics", tags=["Topics"])
app.include_router(routes_sources.router, prefix="/api/sources", tags=["Sources"])
app.include_router(routes_competitors.router, prefix="/api/competitors", tags=["Competitors"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
