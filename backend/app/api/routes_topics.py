from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import db_models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Topic])
def get_topics(db: Session = Depends(get_db)):
    return db.query(db_models.Topic).filter(db_models.Topic.is_active == True).all()

@router.post("/", response_model=schemas.Topic)
def create_topic(topic: schemas.TopicCreate, db: Session = Depends(get_db)):
    db_topic = db.query(db_models.Topic).filter(db_models.Topic.name == topic.name).first()
    if db_topic:
        if not db_topic.is_active:
            db_topic.is_active = True
            db.commit()
            db.refresh(db_topic)
            return db_topic
        raise HTTPException(status_code=400, detail="Topic already exists")
    
    new_topic = db_models.Topic(name=topic.name)
    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)
    return new_topic

@router.delete("/{topic_id}")
def delete_topic(topic_id: int, db: Session = Depends(get_db)):
    db_topic = db.query(db_models.Topic).filter(db_models.Topic.id == topic_id).first()
    if not db_topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    db_topic.is_active = False
    db.commit()
    return {"message": "Topic deleted"}
