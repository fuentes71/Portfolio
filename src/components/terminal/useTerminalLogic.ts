import { useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import type { TerminalLine } from './terminalTypes';

interface UseTerminalLogicOptions {
  lang: 'pt' | 'en';
  isBooting: boolean;
  bootIndex: number;
  setBootIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsBooting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  lines: TerminalLine[];
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
  currentCmdIndex: number;
  setCurrentCmdIndex: React.Dispatch<React.SetStateAction<number>>;
  typedCommand: string;
  setTypedCommand: React.Dispatch<React.SetStateAction<string>>;
  isInteractive: boolean;
  setIsInteractive: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  loadingProgress: number;
  setLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
  onComplete: () => void;
  t: { boot: string[]; welcome: string };
  bottomRef: React.RefObject<HTMLDivElement | null>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  handleInteractiveSubmit: (input: string) => void;
  easterEggActive: boolean;
}

export const useTerminalLogic = ({
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
  t,
  bottomRef,
  userInput,
  setUserInput,
  hiddenInputRef,
  handleInteractiveSubmit,
  easterEggActive,
}: UseTerminalLogicOptions) => {
  const commands = [
    { cmd: 'whoami', output: portfolioData.name },
    { cmd: 'cat profile.txt', output: portfolioData[lang].profile },
  ];

  // Persist lang preference
  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, typedCommand, userInput, loadingProgress, bottomRef]);

  // Focus hidden input for mobile when interactive phase starts
  useEffect(() => {
    if (isInteractive && !isLoading) {
      setTimeout(() => hiddenInputRef.current?.focus(), 100);
    }
  }, [isInteractive, isLoading, hiddenInputRef]);

  // Keyboard Event Listener for interactive prompt (desktop)
  useEffect(() => {
    if ((!isInteractive && !easterEggActive) || isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If the hidden input is focused, let its onKeyDown/onChange handle it
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
  }, [isInteractive, isLoading, userInput, handleInteractiveSubmit, easterEggActive, setUserInput, hiddenInputRef]);

  // Sync translated lines when language changes
  useEffect(() => {
    setLines(prev =>
      prev.map(line => {
        if (line.id.startsWith('boot-')) {
          const index = parseInt(line.id.split('-')[1]);
          if (!isNaN(index) && t.boot[index]) {
            const pct = Math.floor(((index + 1) / t.boot.length) * 100);
            return { ...line, content: `[${pct}%] ${t.boot[index]}` };
          }
        }
        if (line.id === 'init') return { ...line, content: t.welcome };
        if (line.id.startsWith('out-0')) return { ...line, content: portfolioData.name };
        if (line.id.startsWith('out-1')) return { ...line, content: portfolioData[lang].profile };
        return line;
      })
    );
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;

    if (bootIndex < t.boot.length) {
      const pct = Math.floor(((bootIndex + 1) / t.boot.length) * 100);
      const timeout = setTimeout(() => {
        setLines(prev => [
          ...prev,
          { id: `boot-${bootIndex}-${lang}`, content: `[${pct}%] ${t.boot[bootIndex]}` },
        ]);
        setBootIndex(prev => prev + 1);
      }, Math.random() * 200 + 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsBooting(false);
        setLines([]);
        setIsTyping(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isBooting, bootIndex, lang, t.boot]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-typing commands sequence
  useEffect(() => {
    if (isBooting) return;

    if (lines.length === 0 && currentCmdIndex === 0) {
      const timeout = setTimeout(() => {
        setLines([{ id: 'init', content: t.welcome }]);
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (lines.length === 0 || isInteractive || isLoading) return;

    if (currentCmdIndex >= commands.length) {
      setIsTyping(false);
      const timeout = setTimeout(() => setIsInteractive(true), 100);
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
          { id: `out-${currentCmdIndex}-${lang}`, content: currentCmd.output },
        ]);
        setTypedCommand('');
        setCurrentCmdIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [typedCommand, currentCmdIndex, isInteractive, isLoading, lines.length, lang, isBooting, t.welcome]); // eslint-disable-line react-hooks/exhaustive-deps

  // Loading progress animation
  useEffect(() => {
    if (!isLoading) return;

    if (loadingProgress < 100) {
      const timeout = setTimeout(() => {
        setLoadingProgress(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
      }, Math.random() * 150 + 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => onComplete(), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, loadingProgress, onComplete]); // eslint-disable-line react-hooks/exhaustive-deps
};
