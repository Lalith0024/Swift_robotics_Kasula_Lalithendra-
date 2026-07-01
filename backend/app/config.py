from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./econwatch.db"
    POLLING_INTERVAL_MINUTES: int = 15
    
    ANTHROPIC_API_KEY: Optional[str] = None
    GROQ_API_KEY: Optional[str] = None
    NEWSAPI_KEY: Optional[str] = None
    GNEWS_API_KEY: Optional[str] = None
    FRED_API_KEY: Optional[str] = None
    ZENSERP_API_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
