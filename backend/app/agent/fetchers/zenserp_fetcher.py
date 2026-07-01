import httpx
from typing import List, Dict
from app.config import settings
from datetime import datetime

async def fetch_zenserp(topics: List[str]) -> List[Dict]:
    if not settings.ZENSERP_API_KEY:
        return []
        
    articles = []
    search_queries = topics if topics else ["economy"]
    
    async with httpx.AsyncClient() as client:
        for topic in search_queries:
            try:
                response = await client.get(
                    "https://app.zenserp.com/api/v2/search",
                    params={
                        "apikey": settings.ZENSERP_API_KEY,
                        "q": topic,
                        "tbm": "nws", # News search
                        "num": 10 # Limit to 10 results
                    },
                    timeout=15.0
                )
                if response.status_code == 200:
                    data = response.json()
                    for item in data.get("news_results", []):
                        if item.get("title"):
                            # Zenserp typically returns 'date' as a string, e.g., '1 hour ago' or a date string
                            # We might just use current time if we can't parse it well, but it's okay for orchestrator to handle
                            articles.append({
                                "title": item["title"],
                                "content": item.get("description", "") or item.get("snippet", "") or "",
                                "url": item.get("link", ""),
                                "source_name": item.get("source", "Zenserp News"),
                                "published_at": item.get("date", datetime.utcnow().isoformat())
                            })
                else:
                    print(f"Zenserp error: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"Exception fetching Zenserp for topic {topic}: {e}")
                
    return articles
