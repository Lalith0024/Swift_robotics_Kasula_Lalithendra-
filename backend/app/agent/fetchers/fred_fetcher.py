import httpx
from typing import Dict
from app.config import settings

async def fetch_fred_indicators() -> Dict:
    if not settings.FRED_API_KEY:
        return {"GDP": "N/A", "Inflation": "N/A", "Unemployment": "N/A"}
        
    # Standard US series for MVP
    indicators = {
        "GDP": "GDP",
        "Inflation": "CPIAUCSL",
        "Unemployment": "UNRATE"
    }
    
    results = {}
    async with httpx.AsyncClient() as client:
        for name, series_id in indicators.items():
            try:
                response = await client.get(
                    "https://api.stlouisfed.org/fred/series/observations",
                    params={
                        "series_id": series_id,
                        "api_key": settings.FRED_API_KEY,
                        "file_type": "json",
                        "sort_order": "desc",
                        "limit": 1
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    obs = data.get("observations", [])
                    if obs:
                        val = obs[0].get("value")
                        # Format slightly
                        if name == "Unemployment" or name == "Inflation":
                            results[name] = f"{val}%"
                        elif name == "GDP":
                            results[name] = f"${val}B"
                        else:
                            results[name] = val
                    else:
                        results[name] = "N/A"
                else:
                    print(f"FRED API error: {response.status_code} - {response.text}")
                    results[name] = "N/A"
            except Exception as e:
                print(f"Exception fetching FRED for {name}: {e}")
                results[name] = "N/A"
                
    return results
