import httpx
from typing import List, Dict
from app.config import settings
from datetime import datetime

async def fetch_gnews(topics: List[str]) -> List[Dict]:
    if not settings.GNEWS_API_KEY:
        return []
        
    articles = []
    search_queries = topics if topics else ["economy"]
    
    async with httpx.AsyncClient() as client:
        for topic in search_queries:
            try:
                response = await client.get(
                    "https://gnews.io/api/v4/search",
                    params={
                        "q": topic,
                        "apikey": settings.GNEWS_API_KEY,
                        "lang": "en",
                        "max": 10
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    for item in data.get("articles", []):
                        if item.get("title"):
                            articles.append({
                                "title": item["title"],
                                "content": item.get("description", "") or "",
                                "url": item.get("url", ""),
                                "source_name": item.get("source", {}).get("name", "GNews"),
                                "published_at": item.get("publishedAt", datetime.utcnow().isoformat())
                            })
                else:
                    print(f"GNews error: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"Exception fetching GNews for topic {topic}: {e}")
                
    return articles
