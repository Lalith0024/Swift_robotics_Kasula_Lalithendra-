from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import db_models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Competitor])
def get_competitors(db: Session = Depends(get_db)):
    return db.query(db_models.Competitor).filter(db_models.Competitor.is_active == True).all()

@router.post("/", response_model=schemas.Competitor)
def create_competitor(competitor: schemas.CompetitorCreate, db: Session = Depends(get_db)):
    db_competitor = db.query(db_models.Competitor).filter(db_models.Competitor.name == competitor.name).first()
    if db_competitor:
        if not db_competitor.is_active:
            db_competitor.is_active = True
            db.commit()
            db.refresh(db_competitor)
            return db_competitor
        raise HTTPException(status_code=400, detail="Competitor already exists")
    
    new_competitor = db_models.Competitor(name=competitor.name)
    db.add(new_competitor)
    db.commit()
    db.refresh(new_competitor)
    return new_competitor

@router.delete("/{competitor_id}")
def delete_competitor(competitor_id: int, db: Session = Depends(get_db)):
    db_competitor = db.query(db_models.Competitor).filter(db_models.Competitor.id == competitor_id).first()
    if not db_competitor:
        raise HTTPException(status_code=404, detail="Competitor not found")
    
    db_competitor.is_active = False
    db.commit()
    return {"message": "Competitor deleted"}
