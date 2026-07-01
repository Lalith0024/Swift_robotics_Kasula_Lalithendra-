import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.config import settings
from app.agent.orchestrator import run_fetch_cycle

scheduler = AsyncIOScheduler()

def start_scheduler():
    # Run once at startup
    asyncio.create_task(run_fetch_cycle())
    
    # Schedule regular polling
    scheduler.add_job(
        run_fetch_cycle, 
        'interval', 
        minutes=settings.POLLING_INTERVAL_MINUTES
    )
    scheduler.start()
    print(f"Scheduler started. Polling interval: {settings.POLLING_INTERVAL_MINUTES} minutes.")
