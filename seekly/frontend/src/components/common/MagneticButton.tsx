import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 font-medium',
  };

  const variantClasses = {
    primary:
      'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white shadow-sm hover:shadow-md border border-white/10 active:scale-[0.98]',
    secondary:
      'bg-[var(--bg-surface)] hover:bg-[var(--bg-muted)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-[0.98]',
    pill:
      'bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] rounded-full text-xs py-1.5 px-3.5 shadow-2xs active:scale-[0.98]',
  };

  return (
    <motion.button
      ref={ref as any}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
