import React, { useState } from 'react';
import { SearchSource } from '../../types';
import { SourceCard } from './SourceCard';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface SourcesSectionProps {
  sources: SearchSource[];
  selectedSourceId: number | null;
  onInspectSource: (source: SearchSource) => void;
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({
  sources,
  selectedSourceId,
  onInspectSource,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!sources || sources.length === 0) return null;

  // Show first 4 sources by default, or all if expanded
  const displaySources = expanded ? sources : sources.slice(0, 4);

  return (
    <section className="w-full flex flex-col gap-3" aria-labelledby="sources-heading">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
          <h3 id="sources-heading" className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
            Verified Sources ({sources.length})
          </h3>
        </div>

        {sources.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] hover:underline cursor-pointer"
          >
            <span>{expanded ? 'Show fewer' : `View all ${sources.length}`}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displaySources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            isSelected={selectedSourceId === source.id}
            onInspect={onInspectSource}
          />
        ))}
      </div>
    </section>
  );
};
