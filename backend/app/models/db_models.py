from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Source(Base):
    __tablename__ = "sources"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    source_type = Column(String) # 'newsapi', 'gnews', 'fred'
    is_active = Column(Boolean, default=True)
    status = Column(String, default="active") # active, degraded
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Competitor(Base):
    __tablename__ = "competitors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    original_title = Column(String)
    summary = Column(Text)
    url = Column(String)
    source = Column(String)
    category = Column(String) # Policy, Markets, Trade, Employment, Other
    sentiment = Column(String) # Positive, Neutral, Negative
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    dedup_hash = Column(String, unique=True, index=True)
