from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import db_models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Source])
def get_sources(db: Session = Depends(get_db)):
    return db.query(db_models.Source).filter(db_models.Source.is_active == True).all()

@router.post("/", response_model=schemas.Source)
def create_source(source: schemas.SourceCreate, db: Session = Depends(get_db)):
    db_source = db.query(db_models.Source).filter(db_models.Source.name == source.name).first()
    if db_source:
        if not db_source.is_active:
            db_source.is_active = True
            db_source.source_type = source.source_type
            db.commit()
            db.refresh(db_source)
            return db_source
        raise HTTPException(status_code=400, detail="Source already exists")
    
    new_source = db_models.Source(name=source.name, source_type=source.source_type)
    db.add(new_source)
    db.commit()
    db.refresh(new_source)
    return new_source

@router.delete("/{source_id}")
def delete_source(source_id: int, db: Session = Depends(get_db)):
    db_source = db.query(db_models.Source).filter(db_models.Source.id == source_id).first()
    if not db_source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    db_source.is_active = False
    db.commit()
    return {"message": "Source deleted"}
