from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SearchSource(BaseModel):
    id: int
    title: str
    url: str
    domain: str
    snippet: str
    score: Optional[float] = None
    published_date: Optional[str] = None
    favicon: Optional[str] = None

class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)
    mode: str = Field(default="all", description="Search mode: all, deep, fast, academic")
    max_results: int = Field(default=6, ge=1, le=15)
    search_provider: Optional[str] = None
    ai_provider: Optional[str] = None
    user_api_key: Optional[str] = None  # Optional user-supplied key from settings

class QuickFact(BaseModel):
    label: str
    value: str

class SearchResponse(BaseModel):
    query: str
    answer: str
    sources: List[SearchSource]
    related_questions: List[str] = []
    quick_facts: List[QuickFact] = []
    provider_info: Dict[str, Any]
    created_at: str

class HistoryItem(BaseModel):
    id: str
    query: str
    answer_snippet: str
    sources_count: int
    created_at: str
    tags: Optional[List[str]] = []

class Preferences(BaseModel):
    theme: str = "light"
    accent: str = "lilac"
    motion: str = "full"
    search_engine: str = "duckduckgo"
    ai_engine: str = "auto"
    safe_search: str = "moderate"
    max_sources: int = 6
    save_history: bool = True

class ExploreCategory(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    accent_color: str
    queries: List[str]
