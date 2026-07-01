from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from datetime import datetime
from app.db.database import get_db
from app.models import db_models, schemas
from app.agent.fetchers.fred_fetcher import fetch_fred_indicators

router = APIRouter()

@router.get("/", response_model=List[schemas.Article])
def get_news(
    topic: Optional[str] = None, 
    since: Optional[datetime] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(db_models.Article)
    
    # We might not have a direct link between Article and Topic in the schema if we just store the title and summary
    # Let's assume the frontend filters by category or we just return all recently fetched ones.
    # We can add a topic field to Article if needed. For now, just return latest.
    if since:
        query = query.filter(db_models.Article.published_at >= since)
        
    articles = query.order_by(desc(db_models.Article.published_at)).limit(limit).all()
    return articles

@router.get("/indicators")
async def get_indicators():
    return await fetch_fred_indicators()
