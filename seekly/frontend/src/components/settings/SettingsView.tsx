import React, { useState, useEffect } from 'react';
import {
  Settings,
  Palette,
  Sliders,
  Shield,
  Key,
  Trash2,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Sparkles,
  Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext';
import { fetchPreferences, savePreferences, getDefaultPreferences } from '../../services/api';
import { Preferences } from '../../types';
import { useToast } from '../../context/ToastContext';
import { MagneticButton } from '../common/MagneticButton';

export const SettingsView: React.FC = () => {
  const { theme, setTheme, accent, setAccent, motion, setMotion } = useTheme();
  const { searchEngine, setSearchEngine, refreshHistory } = useSearch();
  const { showToast } = useToast();

  const [prefs, setPrefs] = useState<Preferences>(getDefaultPreferences());
  const [apiKey, setApiKey] = useState('');
  const [savedKeyMsg, setSavedKeyMsg] = useState(false);

  useEffect(() => {
    fetchPreferences().then((p) => {
      setPrefs(p);
      if (p.custom_gemini_key) setApiKey(p.custom_gemini_key);
    });
  }, []);

  const handleAccentChange = (newAccent: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint') => {
    setAccent(newAccent);
    const updated = { ...prefs, accent: newAccent };
    setPrefs(updated);
    savePreferences(updated);
    showToast(`Accent palette updated to ${newAccent}`, 'info');
  };

  const handleMotionChange = (newMotion: 'full' | 'reduced' | 'minimal') => {
    setMotion(newMotion);
    const updated = { ...prefs, motion: newMotion };
    setPrefs(updated);
    savePreferences(updated);
    showToast(`Motion preference set to ${newMotion}`, 'info');
  };

  const handleEngineChange = (engine: 'duckduckgo' | 'tavily' | 'demo') => {
    setSearchEngine(engine);
    const updated = { ...prefs, search_engine: engine };
    setPrefs(updated);
    savePreferences(updated);
    showToast(`Search engine set to ${engine}`, 'info');
  };

  const handleSafeSearchChange = (val: 'strict' | 'moderate' | 'off') => {
    const updated = { ...prefs, safe_search: val };
    setPrefs(updated);
    savePreferences(updated);
    showToast(`SafeSearch updated to ${val}`, 'info');
  };

  const handleMaxSourcesChange = (num: number) => {
    const updated = { ...prefs, max_sources: num };
    setPrefs(updated);
    savePreferences(updated);
  };

  const handleSaveApiKey = () => {
    const updated = { ...prefs, custom_gemini_key: apiKey.trim() };
    setPrefs(updated);
    savePreferences(updated);
    setSavedKeyMsg(true);
    showToast('Gemini API key saved to local session', 'success');
    setTimeout(() => setSavedKeyMsg(false), 2500);
  };

  const handleResetDefaults = () => {
    const defaults = getDefaultPreferences();
    setPrefs(defaults);
    setTheme(defaults.theme);
    setAccent(defaults.accent);
    setMotion(defaults.motion);
    setSearchEngine(defaults.search_engine);
    savePreferences(defaults);
    showToast('Reset all preferences to default', 'info');
  };

  const accents: { id: 'lilac' | 'rose' | 'peach' | 'sky' | 'mint'; label: string; bg: string }[] = [
    { id: 'lilac', label: 'Warm Lilac', bg: 'bg-[#9D85FF]' },
    { id: 'rose', label: 'Rose Blush', bg: 'bg-[#FB7185]' },
    { id: 'peach', label: 'Peach Dawn', bg: 'bg-[#FB923C]' },
    { id: 'sky', label: 'Sky Blue', bg: 'bg-[#38BDF8]' },
    { id: 'mint', label: 'Forest Mint', bg: 'bg-[#34D399]' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Preferences & Customization</span>
          </div>
          <h1 className="font-serif-headline text-3xl sm:text-4xl text-[var(--text-primary)] font-medium">
            Settings
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Configure appearance, search engine providers, motion dynamics, and privacy.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] text-xs font-medium transition-colors w-fit cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* 1. Appearance Section */}
      <section className="seekly-card p-6 sm:p-7 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)]">
          <Palette className="w-4 h-4 text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider">
            Appearance & Visual Identity
          </h2>
        </div>

        {/* Theme mode selection */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-medium text-[var(--text-primary)]">
            Interface Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light Ivory', icon: Sun },
              { id: 'dark', label: 'Navy Plum Dark', icon: Moon },
              { id: 'system', label: 'System Automatic', icon: Monitor },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-light)] border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold shadow-xs'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Palette Selection */}
        <div className="flex flex-col gap-2.5 pt-2">
          <label className="text-xs font-medium text-[var(--text-primary)]">
            Accent Color Palette
          </label>
          <div className="flex flex-wrap gap-3">
            {accents.map((acc) => {
              const isSelected = accent === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => handleAccentChange(acc.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-light)] text-[var(--text-primary)] font-semibold'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${acc.bg} shadow-2xs`} />
                  <span>{acc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motion Preference */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--text-primary)]">
              Motion Dynamics & Animations
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">Respects accessibility</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'full', label: 'Full Motion (Fluid)', desc: 'Magnetic pulls & spring physics' },
              { id: 'reduced', label: 'Reduced Motion', desc: 'Minimal soft fades' },
              { id: 'minimal', label: 'Minimal (Static)', desc: 'Near zero animation' },
            ].map((m) => {
              const isSelected = motion === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMotionChange(m.id as any)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-light)] border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span className="font-semibold block">{m.label}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-normal">{m.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Search Engine Preferences */}
      <section className="seekly-card p-6 sm:p-7 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)]">
          <Sliders className="w-4 h-4 text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider">
            Search & Grounding Preferences
          </h2>
        </div>

        {/* Web Search Provider */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-medium text-[var(--text-primary)]">
            Default Web Search Engine
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'duckduckgo', name: 'DuckDuckGo Live', badge: 'Free / Live', desc: 'No API key required' },
              { id: 'tavily', name: 'Tavily Search API', badge: 'Advanced API', desc: 'Requires TAVILY_API_KEY' },
              { id: 'demo', name: 'Curated Archival Demo', badge: 'Offline Mock', desc: 'Verified static dataset' },
            ].map((engine) => {
              const isSelected = searchEngine === engine.id;
              return (
                <button
                  key={engine.id}
                  onClick={() => handleEngineChange(engine.id as any)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-light)] border-[var(--accent-primary)] text-[var(--text-primary)] shadow-xs'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[var(--text-primary)]">{engine.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--bg-muted)] text-[var(--text-muted)]">
                      {engine.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">{engine.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SafeSearch and Sources Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[var(--text-primary)]">
              SafeSearch Content Filtering
            </label>
            <select
              value={prefs.safe_search}
              onChange={(e) => handleSafeSearchChange(e.target.value as any)}
              className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
            >
              <option value="strict">Strict (Family Safe)</option>
              <option value="moderate">Moderate (Standard)</option>
              <option value="off">Off (Unfiltered)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[var(--text-primary)]">
              Maximum Sources per Query ({prefs.max_sources || 6})
            </label>
            <input
              type="range"
              min={3}
              max={12}
              value={prefs.max_sources || 6}
              onChange={(e) => handleMaxSourcesChange(Number(e.target.value))}
              className="mt-2 accent-[var(--accent-primary)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
              <span>3 (Faster)</span>
              <span>6 (Balanced)</span>
              <span>12 (Comprehensive)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. External API Credentials (Optional) */}
      <section className="seekly-card p-6 sm:p-7 rounded-2xl flex flex-col gap-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)]">
          <Key className="w-4 h-4 text-[var(--accent-primary)]" />
          <h2 className="font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider">
            Optional External AI Keys
          </h2>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Seekly functions completely out-of-the-box with live web search and local grounded synthesis.
          If you wish to test Google Gemini 2.5 Flash for LLM answer synthesis, you may enter your key here:
        </p>

        <div className="flex items-center gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy... (Gemini API Key)"
            className="flex-1 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)]"
          />
          <MagneticButton
            onClick={handleSaveApiKey}
            variant="primary"
            size="md"
            className="shrink-0"
          >
            {savedKeyMsg ? 'Saved!' : 'Save Key'}
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Keys are stored strictly in your browser local session. Never committed or logged.</span>
        </div>
      </section>
    </div>
  );
};
