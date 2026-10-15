import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SearchResponse, HistoryItem, ActiveView, SearchStatus } from '../types';
import { search, fetchHistory, fetchPreferences } from '../services/api';
import { useToast } from './ToastContext';

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  status: SearchStatus;
  statusMessage: string;
  results: SearchResponse | null;
  error: string | null;
  searchMode: 'all' | 'deep' | 'fast' | 'academic';
  setSearchMode: (mode: 'all' | 'deep' | 'fast' | 'academic') => void;
  searchEngine: 'duckduckgo' | 'tavily' | 'demo';
  setSearchEngine: (engine: 'duckduckgo' | 'tavily' | 'demo') => void;
  history: HistoryItem[];
  executeSearch: (targetQuery?: string) => Promise<void>;
  clearResults: () => void;
  refreshHistory: () => Promise<void>;
  selectedSourceId: number | null;
  setSelectedSourceId: (id: number | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'all' | 'deep' | 'fast' | 'academic'>('all');
  const [searchEngine, setSearchEngine] = useState<'duckduckgo' | 'tavily' | 'demo'>('duckduckgo');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);

  const { showToast } = useToast();

  const refreshHistory = useCallback(async () => {
    const items = await fetchHistory();
    setHistory(items);
  }, []);

  useEffect(() => {
    refreshHistory();
    fetchPreferences().then((p) => {
      if (p.search_engine) setSearchEngine(p.search_engine);
    });
  }, [refreshHistory]);

  const executeSearch = useCallback(async (targetQuery?: string) => {
    const q = (targetQuery !== undefined ? targetQuery : query).trim();
    if (!q) return;

    setQuery(q);
    setError(null);
    setStatus('searching');
    setStatusMessage('Querying live web index...');
    setActiveView('results');

    // Simulate multi-stage visual transition for polish
    const t1 = setTimeout(() => {
      setStatus('reading');
      setStatusMessage('Reading and ranking sources...');
    }, 450);

    const t2 = setTimeout(() => {
      setStatus('synthesizing');
      setStatusMessage('Synthesizing grounded editorial insights...');
    }, 900);

    try {
      const response = await search({
        query: q,
        mode: searchMode,
        search_provider: searchEngine,
      });

      clearTimeout(t1);
      clearTimeout(t2);

      setResults(response);
      setStatus('completed');
      setStatusMessage('');
      refreshHistory();

      // Show toast if demo fallback occurred
      if (response.provider_info.is_demo) {
        showToast('Viewing verified archival snapshot [Demo Mode]', 'info');
      }
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      console.error('[Search Error]', err);
      setError(err.message || 'An unexpected error occurred during search.');
      setStatus('error');
      setStatusMessage('');
      showToast(err.message || 'Search failed', 'error');
    }
  }, [query, searchMode, searchEngine, refreshHistory, showToast]);

  const clearResults = () => {
    setQuery('');
    setResults(null);
    setStatus('idle');
    setError(null);
    setActiveView('home');
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        activeView,
        setActiveView,
        status,
        statusMessage,
        results,
        error,
        searchMode,
        setSearchMode,
        searchEngine,
        setSearchEngine,
        history,
        executeSearch,
        clearResults,
        refreshHistory,
        selectedSourceId,
        setSelectedSourceId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};
