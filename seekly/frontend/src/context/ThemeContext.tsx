import React, { createContext, useContext, useEffect, useState } from 'react';
import { Preferences } from '../types';
import { fetchPreferences, savePreferences } from '../services/api';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  accent: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint';
  motion: 'full' | 'reduced' | 'minimal';
  setTheme: (t: 'light' | 'dark' | 'system') => void;
  setAccent: (a: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint') => void;
  setMotion: (m: 'full' | 'reduced' | 'minimal') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('light');
  const [accent, setAccentState] = useState<'lilac' | 'rose' | 'peach' | 'sky' | 'mint'>('lilac');
  const [motion, setMotionState] = useState<'full' | 'reduced' | 'minimal'>('full');
  const [systemIsDark, setSystemIsDark] = useState<boolean>(false);

  // Read preferences initially
  useEffect(() => {
    fetchPreferences().then((prefs) => {
      if (prefs.theme) setThemeState(prefs.theme);
      if (prefs.accent) setAccentState(prefs.accent);
      if (prefs.motion) setMotionState(prefs.motion);
    });

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mql.matches);
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const resolvedTheme = theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  // Apply theme, accent, and motion to document root
  useEffect(() => {
    const root = document.documentElement;

    // Apply dark class
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply dataset attributes for design tokens
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-motion', motion);
  }, [resolvedTheme, accent, motion]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    fetchPreferences().then(prefs => savePreferences({ ...prefs, theme: newTheme }));
  };

  const setAccent = (newAccent: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint') => {
    setAccentState(newAccent);
    fetchPreferences().then(prefs => savePreferences({ ...prefs, accent: newAccent }));
  };

  const setMotion = (newMotion: 'full' | 'reduced' | 'minimal') => {
    setMotionState(newMotion);
    fetchPreferences().then(prefs => savePreferences({ ...prefs, motion: newMotion }));
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        accent,
        motion,
        setTheme,
        setAccent,
        setMotion,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
