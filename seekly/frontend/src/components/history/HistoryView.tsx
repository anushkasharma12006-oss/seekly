import React, { useState } from 'react';
import { Clock, Search, Trash2, ArrowRight, AlertTriangle, Download, Sparkles } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { deleteHistoryItem, clearAllHistory } from '../../services/api';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';

export const HistoryView: React.FC = () => {
  const { history, refreshHistory, executeSearch, setQuery } = useSearch();
  const [filterText, setFilterText] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const { showToast } = useToast();

  const filteredHistory = history.filter((item) =>
    item.query.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleDeleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteHistoryItem(id);
    await refreshHistory();
    showToast('Removed search from history', 'info');
  };

  const handleClearAll = async () => {
    await clearAllHistory();
    await refreshHistory();
    setShowClearModal(false);
    showToast('Search history cleared', 'success');
  };

  const handleReopen = (q: string) => {
    setQuery(q);
    executeSearch(q);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'seekly-search-history.json');
    downloadAnchor.click();
    showToast('Exported history as JSON', 'success');
  };

  const formatTimestamp = (isoDate: string) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Search Timeline</span>
          </div>
          <h1 className="font-serif-headline text-3xl sm:text-4xl text-[var(--text-primary)] font-medium">
            Search History
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Persisted securely on your device. Stored locally without third-party tracking.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter past queries…"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
      )}

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleReopen(item.query)}
              className="group seekly-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer hover:border-[var(--accent-primary)]/40 transition-all"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                    {item.query}
                  </h3>
                  <span className="shrink-0 text-[11px] text-[var(--text-muted)] font-mono">
                    {formatTimestamp(item.created_at)}
                  </span>
                </div>

                {item.answer_snippet && (
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                    {item.answer_snippet}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleDeleteItem(e, item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all"
                  title="Remove this query"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="p-2 rounded-lg text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="seekly-card p-12 rounded-3xl flex flex-col items-center text-center gap-4 border-dashed">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-muted)] text-[var(--text-muted)] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-headline text-lg text-[var(--text-primary)] font-semibold">
              {filterText ? 'No matching searches found' : 'No search history yet'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mt-1 leading-relaxed">
              {filterText
                ? `No queries matched "${filterText}". Try a different keyword.`
                : 'Searches you perform will be saved here so you can revisit findings anytime.'}
            </p>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Search History?"
        description="This will permanently delete all previously saved queries and search summaries from this device. This action cannot be undone."
      >
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setShowClearModal(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
          >
            Yes, Clear History
          </button>
        </div>
      </Modal>
    </div>
  );
};
