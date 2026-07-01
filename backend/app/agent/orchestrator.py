import asyncio
from datetime import datetime, timedelta
from app.db.database import SessionLocal
from app.models import db_models
from app.agent.fetchers.newsapi_fetcher import fetch_newsapi
from app.agent.fetchers.gnews_fetcher import fetch_gnews
from app.agent.filters.dedup import is_duplicate, calculate_hash
from app.agent.filters.relevance_filter import is_relevant
from app.agent.summarizer import summarize_article
import dateutil.parser

async def run_fetch_cycle():
    print(f"[{datetime.utcnow().isoformat()}] Starting fetch cycle...")
    db = SessionLocal()
    
    try:
        topics = [t.name for t in db.query(db_models.Topic).filter(db_models.Topic.is_active == True).all()]
        competitors = [c.name for c in db.query(db_models.Competitor).filter(db_models.Competitor.is_active == True).all()]
        sources = db.query(db_models.Source).filter(db_models.Source.is_active == True).all()
        
        tracking_list = topics + competitors
        if not tracking_list:
            print("No active topics or competitors to track. Skipping.")
            return

        # Fetch articles
        raw_articles = []
        for source in sources:
            try:
                if source.source_type == 'newsapi':
                    articles = await fetch_newsapi(tracking_list)
                    raw_articles.extend(articles)
                elif source.source_type == 'gnews':
                    articles = await fetch_gnews(tracking_list)
                    raw_articles.extend(articles)
            except Exception as e:
                print(f"Error fetching from {source.name}: {e}")
                
        if not raw_articles:
            print("No articles fetched.")
            return
            
        print(f"Fetched {len(raw_articles)} raw articles.")

        # Get existing articles from last 7 days for dedup
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        existing_articles = db.query(db_models.Article).filter(
            db_models.Article.published_at >= seven_days_ago
        ).all()

        added_count = 0
        for raw in raw_articles:
            # Dedup
            if is_duplicate(raw['title'], raw['source_name'], existing_articles):
                continue

            # Relevance
            if not is_relevant(raw['title'], raw['content'], tracking_list):
                continue
                
            # Summarize
            structured_data = summarize_article(raw['title'], raw['content'])
            
            try:
                pub_date = dateutil.parser.parse(raw['published_at'])
            except Exception:
                pub_date = datetime.utcnow()
                
            # Store
            new_article = db_models.Article(
                title=structured_data.get("title", raw['title']),
                original_title=raw['title'],
                summary=structured_data.get("summary", ""),
                url=raw['url'],
                source=raw['source_name'],
                category=structured_data.get("category", "Other"),
                sentiment=structured_data.get("sentiment", "Neutral"),
                published_at=pub_date,
                dedup_hash=calculate_hash(raw['title'], raw['source_name'])
            )
            
            db.add(new_article)
            # Add to local existing list to prevent duplicates within same batch
            existing_articles.append(new_article)
            added_count += 1
            
        db.commit()
        print(f"[{datetime.utcnow().isoformat()}] Fetch cycle complete. Added {added_count} new articles.")
        
    except Exception as e:
        print(f"Error in fetch cycle: {e}")
    finally:
        db.close()
