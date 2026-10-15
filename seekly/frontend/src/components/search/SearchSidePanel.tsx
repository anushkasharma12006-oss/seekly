import React from 'react';
import { QuickFact, HistoryItem } from '../../types';
import { Sparkles, Clock, ArrowRight, BarChart3 } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

interface SearchSidePanelProps {
  quickFacts: QuickFact[];
  history: HistoryItem[];
}

export const SearchSidePanel: React.FC<SearchSidePanelProps> = ({ quickFacts, history }) => {
  const { executeSearch, setQuery } = useSearch();

  const handleHistoryClick = (q: string) => {
    setQuery(q);
    executeSearch(q);
  };

  return (
    <aside className="flex flex-col gap-5 w-full">
      {/* Quick Facts Card */}
      {quickFacts && quickFacts.length > 0 && (
        <div className="seekly-card p-5 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[var(--accent-primary)]" />
            <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Quick Facts
            </h3>
          </div>

          <div className="divide-y divide-[var(--border-subtle)] text-xs">
            {quickFacts.map((fact, idx) => (
              <div key={idx} className="py-2.5 flex items-start justify-between gap-2 first:pt-0 last:pb-0">
                <span className="text-[var(--text-muted)] font-medium">{fact.label}</span>
                <span className="text-[var(--text-primary)] font-semibold text-right">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Queries / Mini History */}
      {history && history.length > 0 && (
        <div className="seekly-card p-5 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
            <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Recent Queries
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            {history.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => handleHistoryClick(item.query)}
                className="group flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-muted)] text-left text-xs transition-colors cursor-pointer"
              >
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate font-medium">
                  {item.query}
                </span>
                <ArrowRight className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
