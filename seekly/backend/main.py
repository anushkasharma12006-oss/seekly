from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from config import settings
from models import (
    SearchRequest,
    SearchResponse,
    HistoryItem,
    Preferences,
    ExploreCategory,
)
from services.search_service import execute_search
from services.history_service import (
    add_history_entry,
    get_history,
    delete_history_entry,
    clear_history,
    get_saved_preferences,
    save_preferences,
)
from services.explore_service import get_explore_categories

app = FastAPI(
    title="Seekly API",
    description="Backend search and grounded synthesis engine for Seekly",
    version="1.0.0",
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check() -> Dict[str, Any]:
    return {
        "status": "healthy",
        "app": "Seekly AI Search Engine",
        "version": "1.0.0",
        "capabilities": {
            "live_web_search": True,
            "search_providers": ["duckduckgo", "tavily" if settings.TAVILY_API_KEY else None, "demo"],
            "has_gemini_key": bool(settings.GEMINI_API_KEY),
            "has_tavily_key": bool(settings.TAVILY_API_KEY),
            "default_search": settings.DEFAULT_SEARCH_PROVIDER,
            "default_ai": "gemini" if settings.GEMINI_API_KEY else "seekly_grounded_engine",
            "demo_mode": settings.DEMO_MODE,
        }
    }

@app.post("/api/search", response_model=SearchResponse)
async def perform_search(request: SearchRequest):
    if not request.query.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query cannot be empty"
        )
    
    response = await execute_search(request)

    # Automatically save to history if not demo-forced
    try:
        add_history_entry(
            query=response.query,
            answer_snippet=response.answer,
            sources_count=len(response.sources)
        )
    except Exception as e:
        print(f"[History Save Log] {e}")

    return response

@app.get("/api/history", response_model=List[HistoryItem])
async def fetch_history(limit: int = 50):
    return get_history(limit=limit)

@app.delete("/api/history/{item_id}")
async def remove_history_item(item_id: str):
    success = delete_history_entry(item_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History item not found")
    return {"status": "deleted", "id": item_id}

@app.delete("/api/history")
async def clear_all_history():
    clear_history()
    return {"status": "cleared"}

@app.get("/api/preferences", response_model=Preferences)
async def fetch_preferences():
    return get_saved_preferences()

@app.post("/api/preferences")
async def update_preferences(prefs: Preferences):
    save_preferences(prefs)
    return {"status": "saved", "preferences": prefs}

@app.get("/api/explore", response_model=List[ExploreCategory])
async def fetch_explore():
    return get_explore_categories()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
