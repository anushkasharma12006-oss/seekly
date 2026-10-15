import React, { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { SearchSource } from '../../types';

interface SourceCardProps {
  source: SearchSource;
  isSelected?: boolean;
  onInspect?: (source: SearchSource) => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, isSelected = false, onInspect }) => {
  const [faviconError, setFaviconError] = useState(false);

  return (
    <div
      id={`source-card-${source.id}`}
      className={`group relative p-4 rounded-xl bg-[var(--bg-surface)] border transition-all duration-200 flex flex-col justify-between gap-2.5 ${
        isSelected
          ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-md'
          : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-xs'
      }`}
    >
      {/* Top row: ID and Domain */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 w-5 h-5 rounded-md bg-[var(--accent-light)] text-[var(--accent-primary)] text-[11px] font-bold flex items-center justify-center">
            {source.id}
          </span>

          <div className="flex items-center gap-1.5 min-w-0">
            {source.favicon && !faviconError ? (
              <img
                src={source.favicon}
                alt=""
                className="w-3.5 h-3.5 shrink-0 rounded-xs"
                onError={() => setFaviconError(true)}
              />
            ) : (
              <Globe className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
            )}
            <span className="text-[11px] font-medium text-[var(--text-muted)] truncate">
              {source.domain}
            </span>
          </div>
        </div>

        {/* Direct External Link */}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          title={`Visit ${source.domain}`}
          aria-label={`Open external link to ${source.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Title */}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] line-clamp-2 leading-snug transition-colors"
      >
        {source.title}
      </a>

      {/* Snippet preview */}
      {source.snippet && (
        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {source.snippet}
        </p>
      )}

      {/* Bottom Inspect Action */}
      <div className="pt-1 flex items-center justify-between border-t border-[var(--border-subtle)]/60 text-[10px]">
        <button
          type="button"
          onClick={() => onInspect?.(source)}
          className="text-[var(--accent-primary)] hover:underline font-medium cursor-pointer"
        >
          Inspect snippet
        </button>
        {source.score && (
          <span className="text-[var(--text-muted)]">
            Score: {Math.round(source.score * 100)}%
          </span>
        )}
      </div>
    </div>
  );
};
