import React, { useState } from 'react';
import { SearchSource } from '../../types';
import { ExternalLink } from 'lucide-react';

interface CitationBadgeProps {
  id: number;
  sources: SearchSource[];
  onSelectSource?: (id: number) => void;
}

export const CitationBadge: React.FC<CitationBadgeProps> = ({ id, sources, onSelectSource }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const source = sources.find((s) => s.id === id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectSource) {
      onSelectSource(id);
    }
    const elem = document.getElementById(`source-card-${id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      elem.classList.add('ring-2', 'ring-[var(--accent-primary)]');
      setTimeout(() => elem.classList.remove('ring-2', 'ring-[var(--accent-primary)]'), 2000);
    }
  };

  return (
    <span className="relative inline-block mx-0.5 align-baseline">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={`View citation [${id}]: ${source?.title || 'Source'}`}
        className="inline-flex items-center justify-center min-w-[1.25rem] h-4.5 px-1.5 text-[11px] font-semibold text-[var(--accent-primary)] bg-[var(--accent-light)] hover:bg-[var(--accent-primary)] hover:text-white rounded-md transition-colors cursor-pointer border border-[var(--accent-primary)]/20"
      >
        {id}
      </button>

      {/* Tooltip on hover */}
      {showTooltip && source && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] shadow-xl text-xs z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-150"
          role="tooltip"
        >
          <span className="flex items-center gap-1.5 text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            <span>Citation [{id}] • {source.domain}</span>
          </span>
          <span className="block font-medium text-[var(--text-primary)] line-clamp-2 leading-tight">
            {source.title}
          </span>
          <span className="flex items-center gap-1 text-[var(--accent-primary)] text-[10px] mt-1.5 font-medium">
            <span>Click to inspect source</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </span>
      )}
    </span>
  );
};
