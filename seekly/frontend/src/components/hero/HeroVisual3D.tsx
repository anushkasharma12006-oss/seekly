import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const HeroVisual3D: React.FC = () => {
  const { motion: motionScale } = useTheme();
  const isReduced = motionScale === 'reduced' || motionScale === 'minimal';

  return (
    <div
      className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto select-none pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Soft atmospheric radial glow using signature pastel palette */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFE8D6]/60 via-[#E6D8FF]/50 to-[#D8ECFF]/60 blur-3xl opacity-75 dark:opacity-30 transform scale-110" />

      {/* Layer 1: Ambient Outer Orbital Ring */}
      <motion.div
        animate={isReduced ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-[#9D85FF]/30 dark:border-violet-500/20"
      />

      {/* Layer 2: 3D Tilted Lens Oval */}
      <motion.div
        animate={isReduced ? {} : { rotateX: [25, 35, 25], rotateY: [-20, 20, -20], rotateZ: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#FFD6E7]/80 dark:border-pink-500/30 shadow-[0_0_30px_rgba(255,214,231,0.3)] backdrop-blur-3xs"
      />

      {/* Layer 3: Secondary Counter-Rotating Ring */}
      <motion.div
        animate={isReduced ? {} : { rotateX: [-30, -15, -30], rotateZ: [360, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dotted border-[#D8ECFF]/90 dark:border-sky-400/30"
      />

      {/* Central Core: Radiant Crystal Spark */}
      <motion.div
        animate={isReduced ? {} : { scale: [1, 1.06, 1], y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FFF9F3] via-[#FFE8D6] to-[#E6D8FF] dark:from-[#252243] dark:via-[#191B2D] dark:to-[#382B48] border border-white/60 dark:border-white/10 shadow-xl flex items-center justify-center p-3"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--accent-primary)] drop-shadow-[0_2px_10px_rgba(112,72,232,0.35)]"
        >
          <path
            d="M20 3 C20 12 26 20 37 20 C26 20 20 28 20 37 C20 28 14 20 3 20 C14 20 20 12 20 3 Z"
            fill="currentColor"
          />
          <circle cx="20" cy="20" r="3" fill="#FFF9F3" />
        </svg>
      </motion.div>

      {/* Satellite Floating Pearls */}
      <motion.div
        animate={isReduced ? {} : { y: [-6, 6, -6], x: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-8 w-3 h-3 rounded-full bg-[#FFE8D6] dark:bg-amber-400/80 shadow-md border border-white/40"
      />
      <motion.div
        animate={isReduced ? {} : { y: [6, -6, 6], x: [-3, 3, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-8 w-2.5 h-2.5 rounded-full bg-[#D8ECFF] dark:bg-sky-400/80 shadow-md border border-white/40"
      />
    </div>
  );
};
