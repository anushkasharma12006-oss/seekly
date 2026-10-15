import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { MagneticButton } from '../common/MagneticButton';

interface SearchBarProps {
  compact?: boolean;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ compact = false, autoFocus = false }) => {
  const {
    query,
    setQuery,
    executeSearch,
    status,
    searchMode,
    setSearchMode,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = status === 'searching' || status === 'reading' || status === 'synthesizing';

  // Bind shortcut ⌘K or / to focus search input
  useKeyboardShortcut('k', () => inputRef.current?.focus());
  useKeyboardShortcut('/', () => inputRef.current?.focus());
  useKeyboardShortcut('Escape', () => {
    if (document.activeElement === inputRef.current) {
      inputRef.current?.blur();
    }
  });

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    executeSearch();
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const modes: { id: 'all' | 'deep' | 'fast' | 'academic'; label: string }[] = [
    { id: 'all', label: 'All Sources' },
    { id: 'deep', label: 'Deep Synthesis' },
    { id: 'academic', label: 'Scholarly' },
    { id: 'fast', label: 'Quick Fact' },
  ];

  return (
    <div className={`w-full ${compact ? 'max-w-4xl' : 'max-w-2xl mx-auto'}`}>
      <form
        onSubmit={handleSubmit}
        className={`seekly-input-container rounded-2xl relative flex items-center transition-all ${
          compact ? 'p-1.5 sm:p-2' : 'p-2 sm:p-3 shadow-lg'
        }`}
      >
        {/* Leading Search Icon */}
        <div className="pl-3 pr-2 text-[var(--text-muted)] shrink-0 flex items-center">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-[var(--accent-primary)] animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-[var(--accent-primary)]" />
          )}
        </div>

        {/* Input element */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything…"
          disabled={isLoading}
          className="w-full bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base sm:text-lg py-1 px-1 font-sans-ui disabled:opacity-60"
          aria-label="Search query"
        />

        {/* Clear Button */}
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors mr-1 cursor-pointer"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Keyboard shortcut indicator */}
        {!query && !compact && (
          <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-0.5 rounded-md bg-[var(--bg-muted)] text-[var(--text-muted)] text-[11px] font-mono select-none border border-[var(--border-subtle)]">
            <span>⌘K</span>
          </div>
        )}

        {/* Magnetic Submit Button */}
        <MagneticButton
          type="submit"
          disabled={!query.trim() || isLoading}
          variant="primary"
          size={compact ? 'sm' : 'md'}
          className="shrink-0"
          aria-label="Submit search"
        >
          {compact ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <span className="flex items-center gap-1.5">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
        </MagneticButton>
      </form>

      {/* Mode Filter Selector Chips */}
      {!compact && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSearchMode(m.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                searchMode === m.id
                  ? 'bg-[var(--accent-primary)] text-white shadow-2xs font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
