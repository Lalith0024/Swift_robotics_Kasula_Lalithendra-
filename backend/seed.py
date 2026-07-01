import os
from sqlalchemy.orm import Session
from app.db.database import engine, Base, SessionLocal
from app.models.db_models import Topic, Source, Competitor
from app.db.init_db import init_db

def seed_data():
    print("Initializing database...")
    init_db()
    
    db = SessionLocal()
    
    try:
        # Topics
        topics = ["United States economy", "India inflation", "China trade policy"]
        for t in topics:
            if not db.query(Topic).filter_by(name=t).first():
                db.add(Topic(name=t))
                
        # Sources
        sources = [
            {"name": "Zenserp News Search", "type": "zenserp"},
            {"name": "Economic Indicators (FRED)", "type": "fred"}
        ]
        for s in sources:
            if not db.query(Source).filter_by(name=s["name"]).first():
                db.add(Source(name=s["name"], source_type=s["type"]))
                
        # Competitors
        competitors = ["Acme Robotics", "GlobalTech"]
        for c in competitors:
            if not db.query(Competitor).filter_by(name=c).first():
                db.add(Competitor(name=c))
                
        db.commit()
        print("Successfully seeded initial topics, sources, and competitors.")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
