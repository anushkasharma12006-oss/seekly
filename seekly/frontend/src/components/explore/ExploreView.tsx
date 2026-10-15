import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, ArrowRight, BookOpen, Layers, Cpu, Globe } from 'lucide-react';
import { ExploreCategory } from '../../types';
import { fetchExploreCategories } from '../../services/api';
import { useSearch } from '../../context/SearchContext';
import { MagneticButton } from '../common/MagneticButton';

export const ExploreView: React.FC = () => {
  const [categories, setCategories] = useState<ExploreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { executeSearch, setQuery } = useSearch();

  useEffect(() => {
    fetchExploreCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const handleQueryClick = (q: string) => {
    setQuery(q);
    executeSearch(q);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-violet-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-pink-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Curated Discovery Archive</span>
        </div>
        <h1 className="font-serif-headline text-3xl sm:text-4xl text-[var(--text-primary)] font-medium tracking-tight">
          Explore Ideas & Breakthroughs
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Thoughtfully curated subject areas across frontier technology, astrophysics, cognitive science, and editorial design.
        </p>
      </div>

      {/* Featured Subject Hero Card */}
      <div className="seekly-card p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-surface)] via-[var(--accent-light)]/40 to-[var(--bg-surface)] border border-[var(--border-subtle)] relative overflow-hidden">
        <div className="max-w-xl flex flex-col gap-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-700 dark:text-violet-300 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Horizon</span>
          </span>

          <h2 className="font-serif-headline text-2xl sm:text-3xl text-[var(--text-primary)] font-semibold">
            James Webb Space Telescope & Early Cosmic Dawn
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            How infrared spectroscopy at L2 revealed massive galaxies formed mere hundreds of millions of years following the Big Bang.
          </p>

          <MagneticButton
            onClick={() => handleQueryClick('James Webb Space Telescope earliest galaxy discoveries')}
            variant="primary"
            size="md"
            className="mt-2 w-fit"
            icon={<ArrowRight className="w-3.5 h-3.5 order-last" />}
          >
            Explore Discovery Brief
          </MagneticButton>
        </div>
      </div>

      {/* Topic Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="seekly-card p-6 rounded-2xl flex flex-col gap-4 border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h3 className="font-semibold text-base text-[var(--text-primary)]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Queries list */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-subtle)]/70">
              {cat.queries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQueryClick(q)}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--accent-light)] text-left text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all cursor-pointer"
                >
                  <span className="truncate pr-2">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[var(--accent-primary)]" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
