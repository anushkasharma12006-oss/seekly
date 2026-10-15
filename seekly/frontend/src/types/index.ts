export interface SearchSource {
  id: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  score?: number;
  published_date?: string;
  favicon?: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface ProviderInfo {
  search_provider: string;
  ai_provider: string;
  is_demo: boolean;
  latency_ms: number;
  sources_count: number;
  fallback_note?: string | null;
}

export interface SearchResponse {
  query: string;
  answer: string;
  sources: SearchSource[];
  related_questions: string[];
  quick_facts: QuickFact[];
  provider_info: ProviderInfo;
  created_at: string;
}

export interface SearchRequest {
  query: string;
  mode?: 'all' | 'deep' | 'fast' | 'academic';
  max_results?: number;
  search_provider?: string;
  ai_provider?: string;
  user_api_key?: string;
}

export interface HistoryItem {
  id: string;
  query: string;
  answer_snippet: string;
  sources_count: number;
  created_at: string;
  tags?: string[];
}

export interface Preferences {
  theme: 'light' | 'dark' | 'system';
  accent: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint';
  motion: 'full' | 'reduced' | 'minimal';
  search_engine: 'duckduckgo' | 'tavily' | 'demo';
  ai_engine: 'auto' | 'gemini' | 'local';
  safe_search: 'strict' | 'moderate' | 'off';
  max_sources: number;
  save_history: boolean;
  custom_gemini_key?: string;
}

export interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent_color: string;
  queries: string[];
}

export type ActiveView = 'home' | 'results' | 'explore' | 'history' | 'settings';

export type SearchStatus = 'idle' | 'searching' | 'reading' | 'synthesizing' | 'completed' | 'error';
