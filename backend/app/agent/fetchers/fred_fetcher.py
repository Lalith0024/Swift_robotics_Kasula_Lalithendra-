import httpx
from typing import Dict

async def fetch_fred_indicators() -> Dict:
    """
    Fetches key US macroeconomic indicators using the World Bank API.
    Completely free, no API key required.
    Indicators: GDP (current USD), Inflation (CPI %), Unemployment (%)
    """
    # World Bank indicator codes
    indicators = {
        "GDP": "NY.GDP.MKTP.CD",        # GDP (current USD)
        "Inflation": "FP.CPI.TOTL.ZG",  # Inflation, CPI (annual %)
        "Unemployment": "SL.UEM.TOTL.ZS" # Unemployment, total (% of labor force)
    }

    results = {}

    async with httpx.AsyncClient() as client:
        for name, indicator_code in indicators.items():
            try:
                response = await client.get(
                    f"https://api.worldbank.org/v2/country/US/indicator/{indicator_code}",
                    params={
                        "format": "json",
                        "mrv": 1,      # Most recent value
                        "per_page": 1
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    # World Bank returns [metadata, [data_points]]
                    if isinstance(data, list) and len(data) > 1:
                        records = data[1]
                        if records and records[0].get("value") is not None:
                            val = records[0]["value"]
                            year = records[0].get("date", "")
                            
                            if name == "GDP":
                                # Convert to trillions for readability
                                trillions = val / 1_000_000_000_000
                                results[name] = {"value": f"${trillions:.2f}T", "year": year}
                            elif name in ("Inflation", "Unemployment"):
                                results[name] = {"value": f"{val:.1f}%", "year": year}
                            else:
                                results[name] = {"value": str(round(val, 2)), "year": year}
                        else:
                            results[name] = {"value": "N/A", "year": ""}
                    else:
                        results[name] = {"value": "N/A", "year": ""}
                else:
                    print(f"World Bank API error for {name}: {response.status_code}")
                    results[name] = {"value": "N/A", "year": ""}
            except Exception as e:
                print(f"Exception fetching World Bank indicator {name}: {e}")
                results[name] = {"value": "N/A", "year": ""}

    return results
