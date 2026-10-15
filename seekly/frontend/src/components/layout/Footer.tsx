import React from 'react';
import { Logo } from '../common/Logo';
import { ShieldCheck, Command, Compass, ArrowUpRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export const Footer: React.FC = () => {
  const { setActiveView, clearResults } = useSearch();

  return (
    <footer className="w-full mt-auto border-t border-[var(--border-subtle)] bg-[var(--bg-muted)]/40 transition-colors py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand narrative */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div onClick={() => clearResults()} className="cursor-pointer">
            <Logo size="sm" />
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Curiosity finds better answers. Seekly brings editorial clarity and grounded source citations to modern web exploration.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>No user tracking • No sponsored bias • 100% Grounded</span>
          </div>
        </div>

        {/* Shortcuts & Navigation */}
        <div className="flex flex-wrap gap-8 text-xs">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[10px]">
              Explore
            </span>
            <button
              onClick={() => setActiveView('explore')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-left transition-colors"
            >
              Curated Topics
            </button>
            <button
              onClick={() => setActiveView('history')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-left transition-colors"
            >
              Search Timeline
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-left transition-colors"
            >
              Engine Preferences
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[10px]">
              Keyboard Power
            </span>
            <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[10px] font-mono">
                ⌘K
              </kbd>
              <span>Focus search bar</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[10px] font-mono">
                /
              </kbd>
              <span>Quick jump to query</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[10px] font-mono">
                Esc
              </kbd>
              <span>Clear / dismiss</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)]">
        <span>© {new Date().getFullYear()} Seekly Search Engine. Crafted for curious minds.</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span>Powered by DuckDuckGo & Gemini Grounding</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
