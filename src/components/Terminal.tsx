import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Folder } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { TerminalLine } from './TerminalLine';
import { portfolioData } from '../data/portfolioData';
import { usePortfolioStore } from '../core/store/usePortfolioStore';
import { InteractiveBackground } from './InteractiveBackground';
import { FloatingLangToggle } from '../shared/components/LayoutElements';

type Line = {
  id: string;
  content: React.ReactNode;
  isCommand?: boolean;
};

interface TerminalProps {
  onComplete: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onComplete }) => {
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.terminal;

  const commands = [
    { cmd: 'whoami', output: portfolioData.name },
    { cmd: 'cat profile.txt', output: portfolioData[lang].profile },
  ];

  const [lines, setLines] = useState<Line[]>([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);

  // Interactive Phase States
  const [isInteractive, setIsInteractive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Sync lines when language changes
  useEffect(() => {
    setLines(prev => prev.map(line => {
      // Re-translate boot lines
      if (line.id.startsWith('boot-')) {
        const index = parseInt(line.id.split('-')[1]);
        if (!isNaN(index) && t.boot[index]) {
          const percentage = Math.floor(((index + 1) / t.boot.length) * 100);
          return { ...line, content: `[${percentage}%] ${t.boot[index]}` };
        }
      }
      // Re-translate command outputs
      if (line.id === 'init') return { ...line, content: t.welcome };
      if (line.id === 'prompt-response') return { ...line, content: t.question };
      if (line.id === 'loading-start') return { ...line, content: t.loading };
      if (line.id === 'abort') return { ...line, content: t.abort };
      
      // Re-translate specific command results
      if (line.id.startsWith('out-0')) return { ...line, content: portfolioData.name };
      if (line.id.startsWith('out-1')) return { ...line, content: portfolioData[lang].profile };
      
      return line;
    }));
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, typedCommand, userInput, loadingProgress]);

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;

    if (bootIndex < t.boot.length) {
      const timeout = setTimeout(() => {
        const percentage = Math.floor(((bootIndex + 1) / t.boot.length) * 100);
        setLines(prev => [...prev, { id: `boot-${bootIndex}-${lang}`, content: `[${percentage}%] ${t.boot[bootIndex]}` }]);
        setBootIndex(prev => prev + 1);
      }, Math.random() * 200 + 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsBooting(false);
        setLines([]); // Clear screen
        setIsTyping(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isBooting, bootIndex, lang, t.boot]);

  // Auto-typing commands sequence
  useEffect(() => {
    if (isBooting) return;
    if (lines.length === 0 && currentCmdIndex === 0 && !isBooting) {
      const initTimeout = setTimeout(() => {
        setLines([{ id: 'init', content: t.welcome }]);
      }, 500);
      return () => clearTimeout(initTimeout);
    }

    if (lines.length === 0) return; // wait for init
    if (isInteractive || isLoading) return;

    if (currentCmdIndex >= commands.length) {
      setIsTyping(false);
      const timeout = setTimeout(() => {
        setIsInteractive(true);
      }, 100);
      return () => clearTimeout(timeout);
    }

    const currentCmd = commands[currentCmdIndex];

    if (typedCommand.length < currentCmd.cmd.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(currentCmd.cmd.slice(0, typedCommand.length + 1));
      }, Math.random() * 50 + 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [
          ...prev,
          { id: `cmd-${currentCmdIndex}-${lang}`, content: currentCmd.cmd, isCommand: true },
          { id: `out-${currentCmdIndex}-${lang}`, content: currentCmd.output }
        ]);
        setTypedCommand('');
        setCurrentCmdIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [typedCommand, currentCmdIndex, isInteractive, isLoading, lines.length, lang, isBooting, t.welcome]);

  // Focus hidden input on mobile when interactive phase starts
  useEffect(() => {
    if (isInteractive && !isLoading) {
      // Small delay to ensure element is rendered
      setTimeout(() => hiddenInputRef.current?.focus(), 100);
    }
  }, [isInteractive, isLoading]);

  const handleInteractiveSubmit = useCallback((input: string) => {
    if (input.toLowerCase() === 'y') {
      setIsInteractive(false);
      setIsLoading(true);
      setUserInput('');
      setLines(prev => [
        ...prev,
        { id: 'prompt-response', content: t.question, isCommand: false },
        { id: 'prompt-inputted', content: input, isCommand: true },
        { id: 'loading-start', content: t.loading }
      ]);
    } else if (input.toLowerCase() === 'n' || input === '') {
      setIsInteractive(false);
      setUserInput('');
      setLines(prev => [
        ...prev,
        { id: 'prompt-response', content: t.question, isCommand: false },
        { id: 'prompt-inputted', content: input || 'N', isCommand: true },
        { id: 'abort', content: t.abort }
      ]);
      setTimeout(() => {
        setIsInteractive(true);
      }, 1000);
    }
  }, [t.question, t.loading, t.abort]);

  // Keyboard Event Listener for interactive prompt (desktop)
  useEffect(() => {
    if (!isInteractive || isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If the hidden input is focused, let its onChange handle it
      if (document.activeElement === hiddenInputRef.current) return;

      if (e.key === 'Enter') {
        handleInteractiveSubmit(userInput);
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setUserInput(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInteractive, isLoading, userInput, handleInteractiveSubmit]);

  // Loading animation logic
  useEffect(() => {
    if (!isLoading) return;

    if (loadingProgress < 100) {
      const timeout = setTimeout(() => {
        setLoadingProgress(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
      }, Math.random() * 150 + 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, loadingProgress, onComplete]);

  const renderProgressBar = () => {
    const totalBars = 30;
    const filledBars = Math.floor((loadingProgress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'#'.repeat(filledBars)}${'-'.repeat(emptyBars)}] ${loadingProgress}%`;
  };

  return (
    <div className="terminal-wrapper" ref={constraintsRef}>
      <InteractiveBackground />
      
      <FloatingLangToggle />

      <motion.div
        className="terminal-window"
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        whileHover={{ scale: 1.005, boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="terminal-header"
          onPointerDown={(e) => dragControls.start(e)}
          style={{ cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing', scale: 0.995 }}
        >
          <div className="macos-buttons">
            <div className="macos-btn close"></div>
            <div className="macos-btn min"></div>
            <div className="macos-btn max"></div>
          </div>

          <div className="terminal-title">
            <Folder size={14} className="folder-icon" />
            <span>{t.labels.title}</span>
          </div>
        </motion.div>

        <div className="terminal-content">
          {!isBooting && (
            <h1 className="portfolio-title">
              Matheus F.
            </h1>
          )}

          {!isBooting && (
            <div className="contact-box">
              <div className="contact-row">
                <span className="contact-label">{t.labels.email}</span>
                <span className="contact-value">
                   <a href={`mailto:${portfolioData.contact.email}`}>
                    {portfolioData.contact.email}
                   </a>
                </span>
              </div>
              <div className="contact-row">
                <span className="contact-label">{t.labels.phone}</span>
                <span className="contact-value">{portfolioData.contact.phone}</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">{t.labels.github}</span>
                <span className="contact-value">
                  <a href="https://github.com/fuentes71" target="_blank" rel="noreferrer">github.com/fuentes71</a>
                </span>
              </div>
            </div>
          )}

          {!isBooting && (
            <div className="separator">
              <span className="separator-line"></span>
            </div>
          )}

          <div className="interactive-area">
            <AnimatePresence mode="popLayout">
              {isBooting ? (
                lines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="terminal-line boot-text"
                  >
                    <span className="boot-prompt">»</span> {line.content}
                  </motion.div>
                ))
              ) : (
                lines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TerminalLine content={line.content} isCommand={line.isCommand} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {isTyping && !isInteractive && !isLoading && lines.length > 0 && !isBooting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cmd-prompt"
              >
                <span className="cmd-user">matheus@portfolio:~$</span>
                <span className="cmd-text">{typedCommand}</span>
                <span className="cursor-blink"></span>
              </motion.div>
            )}

            {isInteractive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="interactive-prompt-container"
                onClick={() => hiddenInputRef.current?.focus()}
              >
                {/* Hidden native input for mobile keyboard */}
                <input
                  ref={hiddenInputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={userInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Only allow single char (y or n)
                    const last = val.slice(-1);
                    setUserInput(last);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleInteractiveSubmit(userInput);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                    pointerEvents: 'none',
                  }}
                />
                <div className="cmd-prompt">
                  <span className="cmd-user">matheus@portfolio:~$</span>
                  <span className="cmd-question">{t.question}</span>
                  <span className="cmd-text">{userInput}</span>
                  <span className="cursor-blink gray"></span>
                </div>
                <div className="mobile-tap-hint">
                  📱 {lang === 'pt' ? 'Toque aqui para digitar' : 'Tap here to type'}
                </div>
              </motion.div>
            )}

            {isLoading && (
              <div className="terminal-line" style={{ color: '#9ece6a', marginTop: '8px' }}>
                {renderProgressBar()}
              </div>
            )}

            {!isTyping && !isInteractive && !isLoading && loadingProgress === 0 && lines.length > 0 && (
              <div className="cmd-prompt">
                <span className="cmd-user">matheus@portfolio:~$</span>
                <span className="cursor-blink"></span>
              </div>
            )}

            <div ref={bottomRef} style={{ paddingBottom: '32px' }} />
          </div>
        </div>

        <div className="footer-hotkeys">
          <span>Tab: {t.footer.tab}</span>
          <span>Ctrl+Click: {t.footer.click}</span>
          <span>ESC: {t.footer.esc}</span>
        </div>
      </motion.div>
    </div>
  );
};
