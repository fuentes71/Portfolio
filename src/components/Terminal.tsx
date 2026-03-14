import React, { useState, useRef } from 'react';
import { Folder } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { TerminalLine as TerminalLineComponent } from './TerminalLine';
import { portfolioData } from '../data/portfolioData';
import { usePortfolioStore } from '../core/store/usePortfolioStore';
import { InteractiveBackground } from './InteractiveBackground';
import { FloatingLangToggle } from '../shared/components/LayoutElements';

// Modular imports
import type { TerminalLine } from './terminal/terminalTypes';
import { useTerminalLogic } from './terminal/useTerminalLogic';
import { useTerminalCommands } from './terminal/useTerminalCommands';
import { TerminalPrompt } from './terminal/TerminalPrompt';
import { EasterEggWindow } from './terminal/EasterEggWindow';

interface TerminalProps {
  onComplete: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onComplete }) => {
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.terminal;

  // States
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);

  // Modular Hooks
  const {
    easterEggActive,
    easterEggLines,
    handleInteractiveSubmit,
    renderProgressBar,
  } = useTerminalCommands({
    lang,
    setLines,
    setUserInput,
    setIsInteractive,
    setIsLoading,
    showQuestion,
    setShowQuestion,
    t: {
      question: t.question,
      loading: t.loading,
      abort: t.abort,
      welcome: t.welcome,
    },
  });

  useTerminalLogic({
    lang,
    isBooting,
    bootIndex,
    setBootIndex,
    setIsBooting,
    setIsTyping,
    lines,
    setLines,
    currentCmdIndex,
    setCurrentCmdIndex,
    typedCommand,
    setTypedCommand,
    isInteractive,
    setIsInteractive,
    isLoading,
    loadingProgress,
    setLoadingProgress,
    onComplete,
    t: { boot: t.boot, welcome: t.welcome },
    bottomRef,
    userInput,
    setUserInput,
    hiddenInputRef,
    handleInteractiveSubmit,
    easterEggActive,
  });

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
            <h1 className="portfolio-title">Matheus F.</h1>
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
                  <a href="https://github.com/fuentes71" target="_blank" rel="noreferrer">
                    github.com/fuentes71
                  </a>
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
                    <TerminalLineComponent content={line.content} isCommand={line.isCommand} />
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
              <TerminalPrompt
                hiddenInputRef={hiddenInputRef}
                userInput={userInput}
                setUserInput={setUserInput}
                handleInteractiveSubmit={handleInteractiveSubmit}
                question={showQuestion ? t.question : ''}
                mobileTapHint={lang === 'pt' ? 'Toque aqui para digitar' : 'Tap here to type'}
              />
            )}

            {isLoading && (
              <div className="terminal-line" style={{ color: '#9ece6a', marginTop: '8px' }}>
                {renderProgressBar(loadingProgress)}
              </div>
            )}

            {!isTyping && !isInteractive && !isLoading && !easterEggActive && loadingProgress === 0 && lines.length > 0 && (
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

      <AnimatePresence>
        {easterEggActive && (
          <EasterEggWindow lines={easterEggLines} lang={lang} />
        )}
      </AnimatePresence>
    </div>
  );
};

