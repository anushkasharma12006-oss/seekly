import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (compact) {
    return (
      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center p-1 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] text-xs font-medium">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
          theme === 'light'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
          theme === 'dark'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-3.5 h-3.5 text-violet-400" />
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
          theme === 'system'
            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs font-semibold'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
        aria-label="System theme preference"
      >
        <Monitor className="w-3.5 h-3.5 text-slate-400" />
        <span className="hidden sm:inline">Auto</span>
      </button>
    </div>
  );
};
