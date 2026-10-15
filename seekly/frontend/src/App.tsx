import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider, useSearch } from './context/SearchContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { SearchResultsView } from './components/search/SearchResultsView';
import { ExploreView } from './components/explore/ExploreView';
import { HistoryView } from './components/history/HistoryView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent: React.FC = () => {
  const { activeView } = useSearch();

  return (
    <main className="flex-1 w-full flex flex-col justify-start">
      {activeView === 'home' && <HeroSection />}
      {activeView === 'results' && <SearchResultsView />}
      {activeView === 'explore' && <ExploreView />}
      {activeView === 'history' && <HistoryView />}
      {activeView === 'settings' && <SettingsView />}
    </main>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SearchProvider>
          <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
            <Navbar />
            <MainContent />
            <Footer />
          </div>
        </SearchProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
