import React from 'react';
import { Globe, Database, Sparkles, Clock } from 'lucide-react';
import { ProviderInfo } from '../../types';

interface StatusBadgeProps {
  providerInfo?: ProviderInfo;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ providerInfo }) => {
  if (!providerInfo) return null;

  const isDemo = providerInfo.is_demo;

  return (
    <div className="inline-flex items-center gap-2 flex-wrap text-xs">
      {/* Live Search vs Demo Pill */}
      {isDemo ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium">
          <Database className="w-3.5 h-3.5 text-amber-500" />
          <span>Demo Mode (Archival Snapshot)</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <Globe className="w-3.5 h-3.5 text-emerald-500" />
          <span className="capitalize">{providerInfo.search_provider} Live Web</span>
        </span>
      )}

      {/* AI Synthesis Mode Pill */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
        <Sparkles className="w-3 h-3 text-[var(--accent-primary)]" />
        <span className="capitalize">{providerInfo.ai_provider}</span>
      </span>

      {/* Latency Pill */}
      {providerInfo.latency_ms > 0 && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--bg-muted)] text-[var(--text-muted)] text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{providerInfo.latency_ms}ms</span>
        </span>
      )}
    </div>
  );
};
