import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', spark: 'w-4 h-4', text: 'text-lg' },
    md: { box: 'w-9 h-9', spark: 'w-5 h-5', text: 'text-xl' },
    lg: { box: 'w-12 h-12', spark: 'w-7 h-7', text: 'text-2xl' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Radiant Discovery Spark Icon */}
      <div
        className={`${current.box} rounded-xl bg-gradient-to-br from-violet-600 via-indigo-700 to-pink-500 p-[1px] shadow-sm transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="w-full h-full rounded-[11px] bg-[#17172B] dark:bg-[#121324] flex items-center justify-center relative overflow-hidden">
          {/* Subtle inner radial glow */}
          <div className="absolute inset-0 bg-radial from-violet-400/20 via-transparent to-transparent opacity-80" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${current.spark} text-[#FFF9F3] drop-shadow-[0_1px_4px_rgba(255,214,231,0.5)] transition-transform duration-500 group-hover:rotate-45`}
          >
            <path
              d="M16 3 C16 11 21 16 29 16 C21 16 16 21 16 29 C16 21 11 16 3 16 C11 16 16 11 16 3 Z"
              fill="url(#sparkGradLogo)"
            />
            <circle cx="16" cy="16" r="2.2" fill="#FFF9F3" />
            <defs>
              <linearGradient id="sparkGradLogo" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D8ECFF" />
                <stop offset="0.5" stopColor="#E6D8FF" />
                <stop offset="1" stopColor="#FFD6E7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <span className={`font-serif-headline ${current.text} font-semibold tracking-tight text-[var(--text-primary)] transition-colors`}>
            Seekly
          </span>
        </div>
      )}
    </div>
  );
};
