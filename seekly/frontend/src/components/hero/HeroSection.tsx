import React from 'react';
import { motion } from 'framer-motion';
import { HeroVisual3D } from './HeroVisual3D';
import { SearchBar } from '../search/SearchBar';
import { DiscoveryChips } from './DiscoveryChips';
import { ShieldCheck, Compass, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center text-center">
      {/* 3D Abstract Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-8"
      >
        <HeroVisual3D />
      </motion.div>

      {/* Hero Editorial Headline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl flex flex-col items-center"
      >
        <h1 className="font-serif-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.12] mb-4">
          Curiosity finds <span className="italic font-normal text-[var(--accent-primary)]">better answers.</span>
        </h1>

        <p className="font-sans-ui text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed mb-8">
          Explore the web, understand what matters, and discover more with Seekly.
        </p>
      </motion.div>

      {/* Prominent Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex justify-center"
      >
        <SearchBar autoFocus />
      </motion.div>

      {/* Discovery Topics */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full"
      >
        <DiscoveryChips />
      </motion.div>

      {/* Three Editorial Pillars */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 max-w-3xl w-full text-left"
      >
        <div className="seekly-card p-5 rounded-2xl flex flex-col gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-[var(--accent-primary)] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Grounded Citations</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Every insight references genuine web documents. Zero fabricated citations or phantom URLs.
          </p>
        </div>

        <div className="seekly-card p-5 rounded-2xl flex flex-col gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Editorial Restraint</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Crafted with Apple-style whitespace and Linear precision. Calm typography that honors your attention.
          </p>
        </div>

        <div className="seekly-card p-5 rounded-2xl flex flex-col gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">Free & Unencumbered</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Live web search functions out-of-the-box without required logins or mandatory API paywalls.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
