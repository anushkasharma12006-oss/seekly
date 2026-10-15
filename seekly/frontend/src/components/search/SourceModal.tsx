import React from 'react';
import { SearchSource } from '../../types';
import { Modal } from '../common/Modal';
import { ExternalLink, Globe, Calendar, ShieldCheck } from 'lucide-react';

interface SourceModalProps {
  source: SearchSource | null;
  onClose: () => void;
}

export const SourceModal: React.FC<SourceModalProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <Modal
      isOpen={Boolean(source)}
      onClose={onClose}
      title={`Source #${source.id} Inspection`}
      description={`Domain: ${source.domain}`}
    >
      <div className="flex flex-col gap-4 text-xs">
        {/* Source Title & Link */}
        <div className="p-3.5 rounded-xl bg-[var(--bg-muted)]/60 border border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block mb-1">
            Article Title
          </span>
          <h4 className="font-semibold text-sm text-[var(--text-primary)] leading-snug mb-2">
            {source.title}
          </h4>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] hover:underline font-medium break-all"
          >
            <span>{source.url}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>

        {/* Snippet / Extracted Text */}
        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block mb-1">
            Extracted Grounded Snippet
          </span>
          <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] leading-relaxed">
            {source.snippet || 'No snippet text available from search crawler.'}
          </div>
        </div>

        {/* Verification badges */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Direct index citation</span>
          </div>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors inline-flex items-center gap-1"
          >
            <span>Visit Webpage</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
