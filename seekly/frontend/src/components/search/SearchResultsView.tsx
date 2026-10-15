import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { SearchBar } from './SearchBar';
import { SearchLoadingState } from './SearchLoadingState';
import { AnswerCard } from './AnswerCard';
import { SourcesSection } from './SourcesSection';
import { RelatedQuestions } from './RelatedQuestions';
import { SearchSidePanel } from './SearchSidePanel';
import { SourceModal } from './SourceModal';
import { SearchSource } from '../../types';
import { AlertCircle, RefreshCw, Database } from 'lucide-react';

export const SearchResultsView: React.FC = () => {
  const {
    query,
    status,
    results,
    error,
    executeSearch,
    setSearchEngine,
    history,
    selectedSourceId,
    setSelectedSourceId,
  } = useSearch();

  const [inspectedSource, setInspectedSource] = useState<SearchSource | null>(null);

  const isLoading = status === 'searching' || status === 'reading' || status === 'synthesizing';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8 animate-in fade-in duration-200">
      {/* Top Search Refinement Bar */}
      <div className="w-full flex justify-center pb-2 border-b border-[var(--border-subtle)]/70">
        <SearchBar compact />
      </div>

      {/* Loading State */}
      {isLoading && <SearchLoadingState />}

      {/* Error State */}
      {error && !isLoading && (
        <div className="max-w-2xl mx-auto w-full p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <h3 className="font-semibold text-base">Search Encountered an Issue</h3>
          </div>
          <p className="text-xs leading-relaxed opacity-90">{error}</p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => executeSearch()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-medium hover:bg-[var(--accent-primary-hover)] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Search</span>
            </button>

            <button
              onClick={() => {
                setSearchEngine('demo');
                executeSearch();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--bg-muted)] transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span>Try Archival Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Populated Results View */}
      {results && !isLoading && (
        <div className="flex flex-col gap-6">
          {/* Query Header */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
              Search Inquiry
            </span>
            <h1 className="font-serif-headline text-2xl sm:text-3xl text-[var(--text-primary)] font-medium leading-tight">
              “{results.query}”
            </h1>
          </div>

          {/* Fallback Note Banner if applicable */}
          {results.provider_info.fallback_note && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
              <Database className="w-4 h-4 shrink-0 text-amber-500" />
              <span>{results.provider_info.fallback_note}</span>
            </div>
          )}

          {/* Main Layout Grid: Editorial Answer + Sources + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Content Area (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Grounded AI Answer */}
              <AnswerCard
                answer={results.answer}
                sources={results.sources}
                providerInfo={results.provider_info}
                query={results.query}
                onSelectSource={(id) => setSelectedSourceId(id)}
              />

              {/* Verified Sources Grid */}
              <SourcesSection
                sources={results.sources}
                selectedSourceId={selectedSourceId}
                onInspectSource={(source) => setInspectedSource(source)}
              />

              {/* Related Questions */}
              {results.related_questions && results.related_questions.length > 0 && (
                <RelatedQuestions questions={results.related_questions} />
              )}
            </div>

            {/* Restrained Side Panel (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <SearchSidePanel
                quickFacts={results.quick_facts}
                history={history}
              />
            </div>
          </div>
        </div>
      )}

      {/* Source Detail Modal */}
      <SourceModal
        source={inspectedSource}
        onClose={() => setInspectedSource(null)}
      />
    </div>
  );
};
