import time
from datetime import datetime, timezone
from typing import Dict, Any, List
from config import settings
from models import SearchRequest, SearchResponse, SearchSource, QuickFact
from services.providers.duckduckgo_provider import search_duckduckgo
from services.providers.tavily_provider import search_tavily
from services.providers.demo_provider import get_demo_search
from services.providers.gemini_provider import synthesize_with_gemini
from services.providers.local_synthesizer import synthesize_locally

async def execute_search(req: SearchRequest) -> SearchResponse:
    start_time = time.time()
    
    selected_search_provider = req.search_provider or settings.DEFAULT_SEARCH_PROVIDER
    gemini_key = req.user_api_key or settings.GEMINI_API_KEY
    
    sources: List[SearchSource] = []
    answer = ""
    related_questions: List[str] = []
    quick_facts: List[QuickFact] = []
    is_demo = False
    provider_used = selected_search_provider
    ai_provider_used = "local"
    fallback_note = None

    # Step 1: Web Search Retrieval
    if selected_search_provider == "demo" or settings.DEMO_MODE:
        demo_data = get_demo_search(req.query)
        sources = demo_data["sources"]
        answer = demo_data["answer"]
        related_questions = demo_data["related"]
        quick_facts = [QuickFact(**f) for f in demo_data["facts"]]
        is_demo = True
        provider_used = "demo"
        ai_provider_used = "curated_demo"
    else:
        # Attempt live web search
        try:
            if selected_search_provider == "tavily" and settings.TAVILY_API_KEY:
                sources = await search_tavily(req.query, settings.TAVILY_API_KEY, req.max_results)
                provider_used = "tavily"
            else:
                sources = await search_duckduckgo(req.query, req.max_results)
                provider_used = "duckduckgo"
        except Exception as e:
            print(f"[Search Engine Error] {e}")

        # If live search returned 0 sources (network offline or provider blocked), fallback to demo mode
        if not sources:
            demo_data = get_demo_search(req.query)
            sources = demo_data["sources"]
            answer = demo_data["answer"]
            related_questions = demo_data["related"]
            quick_facts = [QuickFact(**f) for f in demo_data["facts"]]
            is_demo = True
            provider_used = "demo_fallback"
            ai_provider_used = "curated_demo"
            fallback_note = "Live web search was unavailable; displaying verified archival demo snapshot."

    # Step 2: AI Answer Synthesis (if not already answered by demo)
    if not answer and sources:
        # Check if Gemini AI is available
        use_gemini = gemini_key and (req.ai_provider != "local")
        
        if use_gemini:
            try:
                model_name = settings.GEMINI_MODEL
                answer, related_questions, quick_facts = await synthesize_with_gemini(
                    query=req.query,
                    sources=sources,
                    api_key=gemini_key,
                    model=model_name
                )
                ai_provider_used = f"gemini ({model_name})"
            except Exception as e:
                print(f"[Gemini Synthesis Error] {e}. Falling back to local grounded synthesis.")
                answer, related_questions, quick_facts = synthesize_locally(req.query, sources)
                ai_provider_used = "local_synthesizer (fallback)"
        else:
            answer, related_questions, quick_facts = synthesize_locally(req.query, sources)
            ai_provider_used = "seekly_grounded_synthesizer"

    latency_ms = int((time.time() - start_time) * 1000)
    created_at = datetime.now(timezone.utc).isoformat()

    provider_info = {
        "search_provider": provider_used,
        "ai_provider": ai_provider_used,
        "is_demo": is_demo,
        "latency_ms": latency_ms,
        "sources_count": len(sources),
        "fallback_note": fallback_note
    }

    return SearchResponse(
        query=req.query,
        answer=answer,
        sources=sources,
        related_questions=related_questions,
        quick_facts=quick_facts,
        provider_info=provider_info,
        created_at=created_at
    )
