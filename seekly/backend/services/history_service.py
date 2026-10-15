import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional
from config import settings
from models import HistoryItem, Preferences

HISTORY_FILE = settings.DATA_DIR / "history.json"
PREFS_FILE = settings.DATA_DIR / "preferences.json"

def _load_history() -> List[dict]:
    if not HISTORY_FILE.exists():
        return []
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def _save_history(items: List[dict]):
    try:
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(items, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"[History Save Error] {e}")

def add_history_entry(query: str, answer_snippet: str, sources_count: int) -> HistoryItem:
    items = _load_history()
    # Avoid immediate duplicates
    if items and items[0].get("query", "").lower() == query.lower():
        # Update timestamp of recent query
        items[0]["created_at"] = datetime.now(timezone.utc).isoformat()
        _save_history(items)
        return HistoryItem(**items[0])

    item = {
        "id": str(uuid.uuid4())[:8],
        "query": query,
        "answer_snippet": answer_snippet[:160] + "..." if len(answer_snippet) > 160 else answer_snippet,
        "sources_count": sources_count,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "tags": []
    }
    # Keep up to 100 entries
    items.insert(0, item)
    _save_history(items[:100])
    return HistoryItem(**item)

def get_history(limit: int = 50) -> List[HistoryItem]:
    items = _load_history()
    return [HistoryItem(**i) for i in items[:limit]]

def delete_history_entry(item_id: str) -> bool:
    items = _load_history()
    new_items = [i for i in items if i.get("id") != item_id]
    if len(new_items) != len(items):
        _save_history(new_items)
        return True
    return False

def clear_history():
    _save_history([])

def get_saved_preferences() -> Preferences:
    if not PREFS_FILE.exists():
        return Preferences()
    try:
        with open(PREFS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return Preferences(**data)
    except Exception:
        return Preferences()

def save_preferences(prefs: Preferences):
    try:
        with open(PREFS_FILE, "w", encoding="utf-8") as f:
            json.dump(prefs.model_dump(), f, indent=2)
    except Exception as e:
        print(f"[Prefs Save Error] {e}")
