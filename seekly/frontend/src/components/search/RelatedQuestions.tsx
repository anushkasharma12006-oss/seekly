import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

interface RelatedQuestionsProps {
  questions: string[];
}

export const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({ questions }) => {
  const { executeSearch, setQuery } = useSearch();

  if (!questions || questions.length === 0) return null;

  const handleClick = (q: string) => {
    setQuery(q);
    executeSearch(q);
  };

  return (
    <div className="seekly-card p-5 sm:p-6 rounded-2xl flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-[var(--accent-primary)]" />
        <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
          Related Questions
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(q)}
            className="group flex items-center justify-between p-3 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--accent-light)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all text-left cursor-pointer"
          >
            <span className="line-clamp-2 leading-relaxed">{q}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--accent-primary)] ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
