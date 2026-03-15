import { useCallback, useState, useRef, useEffect } from 'react';
import type { TerminalLine } from './terminalTypes';
import { getEasterEggSequence, getHelpLines } from './easterEgg';

interface UseTerminalCommandsOptions {
  lang: 'pt' | 'en';
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setIsInteractive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showQuestion: boolean;
  setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  t: {
    question: string;
    loading: string;
    abort: string;
    welcome: string;
  };
}

export const useTerminalCommands = ({
  lang,
  setLines,
  setUserInput,
  setIsInteractive,
  setIsLoading,
  showQuestion,
  setShowQuestion,
  t,
}: UseTerminalCommandsOptions) => {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggLines, setEasterEggLines] = useState<string[]>([]);
  const timerRef = useRef<any>(null);

  const triggerEasterEgg = useCallback(() => {
    const sequence = getEasterEggSequence(lang);

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    setEasterEggActive(true);
    setEasterEggLines([]);
    setUserInput('');

    // Fill lines sequentially
    sequence.forEach((line, i) => {
      setTimeout(() => {
        setEasterEggLines(prev => [...prev, line]);
      }, i * 150);
    });

    // Auto-close after 10 seconds
    timerRef.current = setTimeout(() => {
      setEasterEggActive(false);
      setEasterEggLines([]);
    }, 10000);
  }, [lang, setUserInput]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleInteractiveSubmit = useCallback(
    (input: string) => {
      const cmd = input.trim().toLowerCase();
      // Prefix for history echo — includes the question if it's currently showing
      const historyContent = showQuestion ? `${t.question} ${input}` : input;

      if (cmd === 'easter egg') {
        setLines(prev => [
          ...prev,
          { id: `cmd-egg-${Date.now()}`, content: historyContent, isCommand: true },
        ]);
        setUserInput('');
        triggerEasterEgg();
        return;
      }

      if (cmd === 'help') {
        const helpLines = getHelpLines(lang);
        setLines(prev => [
          ...prev,
          { id: `cmd-help-${Date.now()}`, content: historyContent, isCommand: true },
          ...helpLines.map((l, i) => ({ id: `help-line-${i}-${Date.now()}`, content: l })),
        ]);
        setUserInput('');
        return;
      }

      if (cmd === 'more info') {
        setLines(prev => [
          ...prev,
          { id: `cmd-moreinfo-${Date.now()}`, content: historyContent, isCommand: true },
        ]);
        setShowQuestion(true);
        setUserInput('');
        return;
      }

      if (cmd === 'clear') {
        setLines([{ id: 'init', content: t.welcome }]);
        setUserInput('');
        return;
      }

      if (cmd === 'y') {
        setIsInteractive(false);
        setIsLoading(true);
        setUserInput('');
        setLines(prev => [
          ...prev,
          { id: 'prompt-response-mirrored', content: historyContent, isCommand: true },
          { id: 'loading-start', content: t.loading },
        ]);
        return;
      }

      if (cmd === 'n') {
        setLines(prev => [
          ...prev,
          { id: `cmd-n-mirrored-${Date.now()}`, content: historyContent, isCommand: true },
        ]);
        setShowQuestion(false);
        setUserInput('');
        return;
      }

      if (cmd === '') {
        setUserInput('');
        return;
      }

      // Unknown command
      const unknown =
        lang === 'pt'
          ? `comando não encontrado: ${input}. Digite 'help' para ajuda.`
          : `command not found: ${input}. Type 'help' for help.`;
      setLines(prev => [
        ...prev,
        { id: `cmd-unknown-${Date.now()}`, content: historyContent, isCommand: true },
        { id: `out-unknown-${Date.now()}`, content: unknown },
      ]);
      setUserInput('');
    },
    [t, lang, setLines, setUserInput, setIsInteractive, setIsLoading, triggerEasterEgg, showQuestion, setShowQuestion]
  );

  const renderProgressBar = (progress: number) => {
    const totalBars = 30;
    const filledBars = Math.floor((progress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'#'.repeat(filledBars)}${'-'.repeat(emptyBars)}] ${progress}%`;
  };

  return {
    easterEggActive,
    easterEggLines,
    handleInteractiveSubmit,
    renderProgressBar,
  };
};
