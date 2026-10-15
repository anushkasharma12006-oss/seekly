# Seekly — Premium AI Search Engine

> **“Curiosity finds better answers.”**  
> Explore the web, understand what matters, and discover more with Seekly.

---

Seekly is an editorial, production-minded AI-powered search engine combining the editorial elegance of Apple, the interface craftsmanship of Linear, the search intelligence of Perplexity, and the warm aesthetics of Fide Island.

Unlike generic dashboards or mock landing pages, Seekly is a full-stack, fully functional search application featuring real web-search indexing, source citations, grounded answer synthesis, persistent history, responsive navigation, and design tokens.

---

## 🌟 Key Features

### 1. Grounded Source Rigor & Citation Integrity
- **Live Web Indexing**: Powered by a modular search adapter (DuckDuckGo live web search out-of-the-box with **zero API keys required**, or optional Tavily/SerpAPI).
- **Interactive Inline Citations**: Verified citations like `[1]`, `[2]` are rendered as interactive pills. Hovering previews the source; clicking smoothly scrolls to and highlights the target source card.
- **Truthful Provenance**: If external network connections or API credentials are unavailable, Seekly switches to a clearly labeled **Demo Mode** with verified archival records. It never hallucinates citations or misrepresents mock data as live search results.

### 2. Editorial Design System
- **Warm Ivory Palette**: Light theme with `#FFF9F3` warm ivory background, soft peach (`#FFE8D6`), blush pink (`#FFD6E7`), muted lilac (`#E6D8FF`), and deep navy-plum text (`#17172B`).
- **Dark Navy Plum Palette**: Deep navy-plum (`#10111F`) background, `#191B2D` surfaces, and lavender-violet accents with restrained peach highlights.
- **Signature Typography**: Editorial serif (`Newsreader`) paired with high-clarity sans-serif (`Plus Jakarta Sans`) and code monospace (`JetBrains Mono`).
- **3D Abstract Visual**: Original rotating orbital visual crafted with layered CSS 3D transforms, rotating celestial rings, and pastel radiant mesh.

### 3. Tactile Interaction & Accessibility
- **Magnetic Buttons**: Selected action controls follow the cursor with spring physics on pointer devices.
- **Motion Scale**: User-selectable motion scale (`full`, `reduced`, `minimal`) honoring WCAG `prefers-reduced-motion`.
- **Keyboard Shortcuts**: `⌘K` or `Ctrl+K` to focus the search bar, `/` for instant query entry, `Esc` to dismiss drawers or clear fields.
- **Audio Read-Aloud**: Integrated speech synthesis reads answers aloud with one click.
- **Export & Share**: Copy clean Markdown summaries with citations, export `.md` files, or copy direct search query links.

### 4. Complete Application Pages
- **Home**: Editorial hero, 3D abstract visual, search bar with filter chips, and suggested exploration topics.
- **Search Results**: Multi-stage progress loader (`Querying index` ➔ `Reading sources` ➔ `Synthesizing answer`), grounded answer card, verified sources carousel, related questions, and desktop side panel.
- **Explore**: Curated discovery hub featuring categories across Modern Computing, Cosmos, Design Systems, and Cognitive Flow.
- **History**: Local-first query timeline with relative timestamps, search filter, individual entry deletion, JSON export, and confirmation dialog.
- **Settings**: Complete control over theme mode (Light/Dark/System), 5 custom accent color palettes (Warm Lilac, Rose Blush, Peach Dawn, Sky Blue, Forest Mint), motion preference, search engine selection, and custom Gemini API keys.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, React Markdown |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2, HTTPX, BeautifulSoup4, python-dotenv |
| **Search Providers** | DuckDuckGo HTML Adapter (Free, live), Tavily (Optional), Curated Archival Demo |
| **AI Synthesis** | Google Gemini API (2.5 Flash / 1.5 Flash), Seekly Grounded Local Synthesizer |
| **Persistence** | File-backed JSON (`backend/data/`) and browser `localStorage` |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0 or newer)
- **Python** (v3.10 or newer)

---

### Step 1: Install Backend Dependencies

```bash
cd backend
python -m pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

### Step 3: Run the Application

You can start both servers simultaneously:

#### Option A: One-Click Launch Script (Windows)
```powershell
# From the project root:
.\start.ps1
# Or double click: start.bat
```

#### Option B: Manual Execution

**Terminal 1 — Backend:**
```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend API will run at: `http://127.0.0.1:8000` (API Docs at `/docs`)*

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
*Frontend will run at: `http://localhost:5173`*

---

## ⚙️ Environment Variables & Provider Setup

Seekly includes a `.env.example` in both the root and `backend/` directories.

```bash
# Server configuration
SEEKLY_HOST=127.0.0.1
SEEKLY_PORT=8000

# AI Provider Credentials (Optional)
# If provided, Gemini 2.5 Flash synthesizes deep answers grounded in search sources.
# If omitted, Seekly uses its built-in local grounded synthesizer from live web snippets.
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Search Provider Credentials (Optional)
# DuckDuckGo live search works out-of-the-box with NO API KEY.
# If you have a Tavily key, add it below:
TAVILY_API_KEY=your_tavily_api_key_here

# Default Search Provider: "duckduckgo", "tavily", or "demo"
DEFAULT_SEARCH_PROVIDER=duckduckgo

# Default AI Provider: "auto", "gemini", or "local"
DEFAULT_AI_PROVIDER=auto

# Demo Mode: Set to "true" to force verified archival demo results without web querying
DEMO_MODE=false
```

### Configuring Google Gemini (Optional)
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Add `GEMINI_API_KEY=your_key` to `backend/.env`, or enter it directly in the **Settings** page within the Seekly UI.
3. When configured, Seekly will utilize Gemini to formulate grounded responses strictly adhering to retrieved sources.

---

## 🔬 Search Architecture & Demo Mode

### How Search Works
```
User Query ──► FastAPI Backend (/api/search)
                  │
                  ├──► 1. Web Search Adapter
                  │       ├── DuckDuckGo Live (Default, no key required)
                  │       ├── Tavily Search (If configured)
                  │       └── Fallback to Curated Demo (If network offline)
                  │
                  ├──► 2. Answer Synthesis Adapter
                  │       ├── Google Gemini API (If GEMINI_API_KEY set)
                  │       └── Seekly Grounded Synthesizer (Zero-key local algorithm)
                  │
                  └──► 3. Response Schema
                          ├── Answer with numbered citations [1], [2]
                          ├── Verified source list (domain, favicon, snippet, url)
                          ├── Follow-up questions
                          └── Provider metadata & latency
```

### Demo Mode Transparency
- If credentials or internet connectivity are unavailable, Seekly displays an unmistakable **"Demo Mode (Archival Snapshot)"** pill.
- The system never claims demo results are live search results.
- In demo mode, sources and citations point to real historical articles from verified domains (e.g. Nature, NASA, ESA).

---

## 📁 Project Directory Structure

```
seekly/
├── backend/
│   ├── data/                   # File-backed local persistence (history, prefs)
│   ├── services/
│   │   ├── providers/
│   │   │   ├── duckduckgo_provider.py  # Live web search scraper/parser
│   │   │   ├── tavily_provider.py      # Tavily search API adapter
│   │   │   ├── demo_provider.py        # Verified archival dataset
│   │   │   ├── gemini_provider.py      # Google Gemini AI synthesis
│   │   │   └── local_synthesizer.py    # Zero-key grounded summarizer
│   │   ├── search_service.py   # Search orchestrator
│   │   ├── history_service.py  # History & preferences manager
│   │   └── explore_service.py  # Curated topic registry
│   ├── config.py               # Pydantic settings & env loading
│   ├── models.py               # Request & response data models
│   ├── main.py                 # FastAPI application & REST endpoints
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Logo, MagneticButton, ThemeToggle, CitationBadge, StatusBadge, Modal
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── hero/           # HeroSection, HeroVisual3D, DiscoveryChips
│   │   │   ├── search/         # SearchBar, SearchResultsView, AnswerCard, SourcesSection, SourceModal, SearchSidePanel
│   │   │   ├── explore/        # ExploreView
│   │   │   ├── history/        # HistoryView
│   │   │   └── settings/       # SettingsView
│   │   ├── context/            # ThemeContext, SearchContext, ToastContext
│   │   ├── hooks/              # useMagnetic, useKeyboardShortcut
│   │   ├── services/           # api.ts (backend client + resilient fallback)
│   │   ├── types/              # TypeScript definitions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css           # Design tokens, color system, and typography
│   ├── public/
│   │   └── favicon.svg         # Original Seekly radiant discovery spark
│   ├── vite.config.ts          # Vite configuration with API proxy
│   ├── tsconfig.json
│   └── package.json
├── .env.example
├── start.ps1                   # PowerShell startup script
├── start.bat                   # Windows batch startup script
└── README.md
```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and available provider capabilities |
| `POST` | `/api/search` | Execute web search and grounded synthesis |
| `GET` | `/api/history` | Retrieve saved search timeline |
| `DELETE` | `/api/history/{id}` | Delete a single history record |
| `DELETE` | `/api/history` | Clear all search history |
| `GET` | `/api/preferences` | Retrieve user preferences |
| `POST` | `/api/preferences` | Update user preferences |
| `GET` | `/api/explore` | Fetch curated discovery categories and questions |

---

## 🛠️ Troubleshooting

- **CORS or Proxy Issues**: Vite is configured to proxy all `/api` requests to `http://localhost:8000`. Ensure the backend server is running.
- **Port Conflicts**: Change `SEEKLY_PORT` in `backend/.env` or Vite port in `frontend/vite.config.ts`.
- **Search Latency**: Live web searches normally respond within 800ms–1500ms depending on internet connection speed. If offline, Seekly transitions to the curated demo mode.

---

## 📜 License & Integrity
Built for curious minds. No telemetry, no ad tracking, and complete source transparency.
