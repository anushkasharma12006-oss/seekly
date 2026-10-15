import { useEffect } from 'react';

export function useKeyboardShortcut(
  keyCombo: string,
  callback: (e: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is already typing in an input or textarea (unless Escape)
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (keyCombo === 'Escape' && e.key === 'Escape') {
        callback(e);
        return;
      }

      if (keyCombo === 'k' && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        callback(e);
        return;
      }

      if (keyCombo === '/' && e.key === '/' && !isInput) {
        e.preventDefault();
        callback(e);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback, enabled]);
}
