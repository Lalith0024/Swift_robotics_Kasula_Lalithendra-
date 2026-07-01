import httpx
from typing import List, Dict
from app.config import settings
from datetime import datetime

async def fetch_newsapi(topics: List[str]) -> List[Dict]:
    if not settings.NEWSAPI_KEY:
        return []
        
    articles = []
    # If there are no topics, we can't search well, maybe just return empty or search 'economy'
    search_queries = topics if topics else ["economy"]
    
    async with httpx.AsyncClient() as client:
        for topic in search_queries:
            try:
                response = await client.get(
                    "https://newsapi.org/v2/everything",
                    params={
                        "q": topic,
                        "apiKey": settings.NEWSAPI_KEY,
                        "language": "en",
                        "sortBy": "publishedAt",
                        "pageSize": 10
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    for item in data.get("articles", []):
                        if item.get("title") and item.get("title") != "[Removed]":
                            articles.append({
                                "title": item["title"],
                                "content": item.get("description", "") or "",
                                "url": item.get("url", ""),
                                "source_name": item.get("source", {}).get("name", "NewsAPI"),
                                "published_at": item.get("publishedAt", datetime.utcnow().isoformat())
                            })
                else:
                    print(f"NewsAPI error: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"Exception fetching NewsAPI for topic {topic}: {e}")
                
    return articles
