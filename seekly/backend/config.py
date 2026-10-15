import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from backend directory or project root
base_dir = Path(__file__).resolve().parent
load_dotenv(base_dir / ".env")
load_dotenv(base_dir.parent / ".env")

class Settings:
    HOST: str = os.getenv("SEEKLY_HOST", "127.0.0.1")
    PORT: int = int(os.getenv("SEEKLY_PORT", "8000"))
    
    # AI Providers
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Search Providers
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "")
    SERPAPI_API_KEY: str = os.getenv("SERPAPI_API_KEY", "")
    
    DEFAULT_SEARCH_PROVIDER: str = os.getenv("DEFAULT_SEARCH_PROVIDER", "duckduckgo")
    DEFAULT_AI_PROVIDER: str = os.getenv("DEFAULT_AI_PROVIDER", "auto")
    
    DEMO_MODE: bool = os.getenv("DEMO_MODE", "false").lower() in ("true", "1", "yes")
    
    DATA_DIR: Path = base_dir / "data"
    
settings = Settings()
settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
