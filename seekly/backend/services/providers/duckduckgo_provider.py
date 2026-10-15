import urllib.parse
from typing import List
import httpx
from bs4 import BeautifulSoup
from models import SearchSource

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
]

def clean_ddg_url(url: str) -> str:
    """Extract real destination URL from DuckDuckGo redirect link."""
    if not url:
        return ""
    if url.startswith("//"):
        url = "https:" + url
    if "uddg=" in url:
        try:
            parsed = urllib.parse.urlparse(url)
            params = urllib.parse.parse_qs(parsed.query)
            if "uddg" in params:
                return urllib.parse.unquote(params["uddg"][0])
        except Exception:
            pass
    return url

def extract_domain(url: str) -> str:
    """Extract clean hostname from URL."""
    try:
        parsed = urllib.parse.urlparse(url)
        domain = parsed.netloc.lower()
        if domain.startswith("www."):
            domain = domain[4:]
        return domain or "web"
    except Exception:
        return "web"

async def search_duckduckgo(query: str, max_results: int = 6) -> List[SearchSource]:
    """
    Execute real live web search against DuckDuckGo HTML without requiring any API keys.
    """
    url = "https://html.duckduckgo.com/html/"
    headers = {
        "User-Agent": USER_AGENTS[0],
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": "https://html.duckduckgo.com/",
    }
    data = {"q": query, "b": ""}

    sources: List[SearchSource] = []
    
    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        try:
            response = await client.post(url, headers=headers, data=data)
            if response.status_code != 200:
                # Try fallback GET search
                response = await client.get(f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}", headers=headers)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                results = soup.find_all("div", class_="result")

                for i, r in enumerate(results):
                    if len(sources) >= max_results:
                        break
                    
                    # Extract title and link
                    title_elem = r.find("a", class_="result__a")
                    if not title_elem:
                        continue
                    
                    raw_url = title_elem.get("href", "")
                    clean_url = clean_ddg_url(raw_url)
                    title = title_elem.get_text(strip=True)
                    
                    # Extract snippet
                    snippet_elem = r.find("a", class_="result__snippet")
                    if not snippet_elem:
                        snippet_elem = r.find("div", class_="result__snippet")
                    snippet = snippet_elem.get_text(strip=True) if snippet_elem else ""

                    if not clean_url or not title or clean_url.startswith("https://duckduckgo.com"):
                        continue

                    domain = extract_domain(clean_url)
                    favicon = f"https://www.google.com/s2/favicons?domain={domain}&sz=64"

                    sources.append(
                        SearchSource(
                            id=len(sources) + 1,
                            title=title,
                            url=clean_url,
                            domain=domain,
                            snippet=snippet,
                            score=round(1.0 - (len(sources) * 0.08), 2),
                            favicon=favicon
                        )
                    )
        except Exception as e:
            print(f"[DuckDuckGo Error] {e}")

    return sources
