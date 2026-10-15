import urllib.parse
from typing import List
import httpx
from models import SearchSource

def extract_domain(url: str) -> str:
    try:
        parsed = urllib.parse.urlparse(url)
        domain = parsed.netloc.lower()
        if domain.startswith("www."):
            domain = domain[4:]
        return domain or "web"
    except Exception:
        return "web"

async def search_tavily(query: str, api_key: str, max_results: int = 6) -> List[SearchSource]:
    """Execute live web search using Tavily Search API."""
    if not api_key:
        return []

    url = "https://api.tavily.com/search"
    payload = {
        "api_key": api_key,
        "query": query,
        "search_depth": "basic",
        "include_answer": False,
        "max_results": max_results,
    }

    sources: List[SearchSource] = []
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            res = await client.post(url, json=payload)
            if res.status_code == 200:
                data = res.json()
                for i, item in enumerate(data.get("results", [])):
                    link = item.get("url", "")
                    title = item.get("title", "")
                    snippet = item.get("content", "")
                    domain = extract_domain(link)
                    favicon = f"https://www.google.com/s2/favicons?domain={domain}&sz=64"
                    
                    sources.append(
                        SearchSource(
                            id=i + 1,
                            title=title,
                            url=link,
                            domain=domain,
                            snippet=snippet,
                            score=item.get("score"),
                            favicon=favicon
                        )
                    )
        except Exception as e:
            print(f"[Tavily Error] {e}")

    return sources
