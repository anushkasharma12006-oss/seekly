import { useRef, useState, useCallback, MouseEvent } from 'react';
import { useTheme } from '../context/ThemeContext';

export function useMagnetic(strength: number = 0.25) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { motion } = useTheme();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (motion === 'reduced' || motion === 'minimal' || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Limit magnetic offset to subtle bounds (max 12px)
      const clampedX = Math.max(-12, Math.min(12, deltaX));
      const clampedY = Math.max(-12, Math.min(12, deltaY));

      setPosition({ x: clampedX, y: clampedY });
    },
    [strength, motion]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    position,
    handleMouseMove,
    handleMouseLeave,
  };
}
