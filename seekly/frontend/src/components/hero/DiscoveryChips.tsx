import React from 'react';
import { Sparkles, GraduationCap, Cpu, Zap, Plane, Atom, Palette, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

interface Topic {
  label: string;
  query: string;
  icon: React.ReactNode;
  category: string;
}

const TOPICS: Topic[] = [
  {
    label: 'Trending now',
    query: 'James Webb Space Telescope earliest galaxy discoveries',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    category: 'Featured'
  },
  {
    label: 'Technology',
    query: 'Quantum error correction below fault-tolerant thresholds',
    icon: <Cpu className="w-3.5 h-3.5 text-violet-500" />,
    category: 'Tech'
  },
  {
    label: 'Science',
    query: 'Tokamak magnetic confinement fusion net energy gains',
    icon: <Atom className="w-3.5 h-3.5 text-sky-500" />,
    category: 'Physics'
  },
  {
    label: 'Study tips',
    query: 'Cognitive load theory applications in interface hierarchy',
    icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />,
    category: 'Learning'
  },
  {
    label: 'Productivity',
    query: 'Neurobiology of ultradian rhythms and deep work cycles',
    icon: <Zap className="w-3.5 h-3.5 text-orange-500" />,
    category: 'Focus'
  },
  {
    label: 'Design Craft',
    query: 'Editorial design systems and digital typography principles',
    icon: <Palette className="w-3.5 h-3.5 text-pink-500" />,
    category: 'Design'
  },
  {
    label: 'Travel',
    query: 'Sustainable slow travel routes through Kyoto and Hokkaido',
    icon: <Plane className="w-3.5 h-3.5 text-teal-500" />,
    category: 'Exploration'
  },
];

export const DiscoveryChips: React.FC = () => {
  const { executeSearch, setQuery } = useSearch();

  const handleChipClick = (topic: Topic) => {
    setQuery(topic.query);
    executeSearch(topic.query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 flex flex-col items-center">
      <div className="text-xs text-[var(--text-muted)] font-medium mb-3 flex items-center gap-1.5 uppercase tracking-wider">
        <span>Suggested Explorations</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {TOPICS.map((t) => (
          <button
            key={t.label}
            onClick={() => handleChipClick(t)}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/40 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            title={`Search: "${t.query}"`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-[var(--accent-primary)]" />
          </button>
        ))}
      </div>
    </div>
  );
};
