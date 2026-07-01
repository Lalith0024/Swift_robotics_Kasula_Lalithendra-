from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TopicBase(BaseModel):
    name: str

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class SourceBase(BaseModel):
    name: str
    source_type: str

class SourceCreate(SourceBase):
    pass

class Source(SourceBase):
    id: int
    is_active: bool
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class CompetitorBase(BaseModel):
    name: str

class CompetitorCreate(CompetitorBase):
    pass

class Competitor(CompetitorBase):
    id: int
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class ArticleBase(BaseModel):
    title: str
    summary: str
    url: str
    source: str
    category: str
    sentiment: str
    published_at: datetime

class Article(ArticleBase):
    id: int
    class Config:
        from_attributes = True
