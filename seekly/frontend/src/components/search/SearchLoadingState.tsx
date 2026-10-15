import React from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export const SearchLoadingState: React.FC = () => {
  const { status, statusMessage, query } = useSearch();

  const steps = [
    { id: 'searching', label: 'Querying live web index', icon: Globe },
    { id: 'reading', label: 'Analyzing retrieved sources', icon: FileText },
    { id: 'synthesizing', label: 'Synthesizing grounded answer', icon: Sparkles },
  ];

  const getStepIndex = () => {
    if (status === 'searching') return 0;
    if (status === 'reading') return 1;
    if (status === 'synthesizing') return 2;
    return 0;
  };

  const currentIndex = getStepIndex();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Query Header */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
          Exploring Query
        </span>
        <h2 className="font-serif-headline text-2xl sm:text-3xl text-[var(--text-primary)] font-medium">
          “{query}”
        </h2>
      </div>

      {/* Progress Steps Indicator */}
      <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[var(--text-primary)] block">
              {statusMessage || 'Processing inquiry…'}
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              Cross-verifying source fidelity
            </span>
          </div>
        </div>

        {/* Steps Pills */}
        <div className="flex items-center gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                  isCurrent
                    ? 'bg-[var(--accent-primary)] text-white font-medium'
                    : isDone
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium'
                    : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden md:inline">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial Content Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Answer Skeleton */}
        <div className="md:col-span-2 seekly-card p-6 sm:p-8 rounded-2xl flex flex-col gap-4">
          <div className="h-6 bg-[var(--bg-muted)] rounded-md w-1/3 animate-pulse" />
          <div className="space-y-3 pt-2">
            <div className="h-4 bg-[var(--bg-muted)] rounded-md w-full animate-pulse" />
            <div className="h-4 bg-[var(--bg-muted)] rounded-md w-11/12 animate-pulse" />
            <div className="h-4 bg-[var(--bg-muted)] rounded-md w-4/5 animate-pulse" />
          </div>

          <div className="space-y-2 pt-4">
            <div className="h-5 bg-[var(--bg-muted)] rounded-md w-1/4 animate-pulse" />
            <div className="h-4 bg-[var(--bg-muted)] rounded-md w-full animate-pulse" />
            <div className="h-4 bg-[var(--bg-muted)] rounded-md w-9/12 animate-pulse" />
          </div>
        </div>

        {/* Sources Grid Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="h-4 bg-[var(--bg-muted)] rounded-md w-1/2 animate-pulse mb-1" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--bg-muted)] animate-pulse" />
                <div className="h-3 bg-[var(--bg-muted)] rounded-md w-1/3 animate-pulse" />
              </div>
              <div className="h-4 bg-[var(--bg-muted)] rounded-md w-4/5 animate-pulse" />
              <div className="h-3 bg-[var(--bg-muted)] rounded-md w-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
