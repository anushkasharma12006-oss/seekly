import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Volume2, VolumeX, Share2, Download, Sparkles } from 'lucide-react';
import { SearchSource, ProviderInfo } from '../../types';
import { CitationBadge } from '../common/CitationBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../../context/ToastContext';

interface AnswerCardProps {
  answer: string;
  sources: SearchSource[];
  providerInfo?: ProviderInfo;
  query: string;
  onSelectSource?: (id: number) => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  sources,
  providerInfo,
  query,
  onSelectSource,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { showToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    showToast('Answer copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/?q=${encodeURIComponent(query)}`;
    navigator.clipboard.writeText(url);
    showToast('Search link copied to clipboard', 'info');
  };

  const handleExportMarkdown = () => {
    const content = `# ${query}\n\n${answer}\n\n## Sources\n` +
      sources.map((s) => `[${s.id}] [${s.title}](${s.url}) — ${s.domain}`).join('\n');
    
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seekly-${query.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported markdown file', 'success');
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported by your browser', 'info');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      // Clean markdown tags for natural speech
      const cleanText = answer.replace(/[#*`_\[\]\(\)]/g, ' ').replace(/\s+/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      showToast('Reading answer aloud', 'info');
    }
  };

  // Custom text renderer to convert citations like [1] into CitationBadge
  const renderTextWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/^\[(\d+)\]$/);
      if (match) {
        const id = parseInt(match[1], 10);
        return (
          <CitationBadge
            key={`${id}-${index}`}
            id={id}
            sources={sources}
            onSelectSource={onSelectSource}
          />
        );
      }
      return part;
    });
  };

  return (
    <article className="seekly-card p-6 sm:p-8 rounded-2xl flex flex-col gap-6" aria-label="Grounded AI Answer">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-sm text-[var(--text-primary)]">
            Synthesized Answer
          </h2>
        </div>

        <StatusBadge providerInfo={providerInfo} />
      </div>

      {/* Main Editorial Text Content */}
      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-[var(--text-primary)] leading-relaxed">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h3 className="font-serif-headline text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mt-6 mb-3 tracking-tight">
                {children}
              </h3>
            ),
            h2: ({ children }) => (
              <h4 className="font-serif-headline text-lg sm:text-xl font-semibold text-[var(--text-primary)] mt-5 mb-2.5 tracking-tight">
                {children}
              </h4>
            ),
            h3: ({ children }) => (
              <h5 className="font-sans-ui text-sm sm:text-base font-bold text-[var(--text-primary)] mt-4 mb-2 tracking-normal">
                {children}
              </h5>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-[var(--text-primary)] text-sm sm:text-base leading-relaxed font-sans-ui">
                {typeof children === 'string' ? renderTextWithCitations(children) : children}
              </p>
            ),
            li: ({ children }) => (
              <li className="mb-1.5 text-[var(--text-primary)] text-sm sm:text-base">
                {typeof children === 'string' ? renderTextWithCitations(children) : children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-[var(--text-primary)]">
                {children}
              </strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[var(--accent-primary)] pl-4 italic text-[var(--text-secondary)] my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {answer}
        </ReactMarkdown>
      </div>

      {/* Action Toolbar */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer font-medium"
            title="Copy answer to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Listen Button */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
              isSpeaking
                ? 'bg-violet-600 text-white animate-pulse'
                : 'bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]'
            }`}
            title={isSpeaking ? 'Stop listening' : 'Listen to answer'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>

          {/* Export Markdown Button */}
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer font-medium"
            title="Export answer and citations to Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer font-medium"
            title="Copy share link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        <span className="text-[11px] text-[var(--text-muted)]">
          Grounded with inline citations
        </span>
      </div>
    </article>
  );
};
