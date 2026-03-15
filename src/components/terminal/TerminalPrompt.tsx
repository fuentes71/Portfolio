import React from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';

interface TerminalPromptProps {
  hiddenInputRef: RefObject<HTMLInputElement | null>;
  userInput: string;
  setUserInput: (val: string) => void;
  handleInteractiveSubmit: (val: string) => void;
  question: string;
  mobileTapHint: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  hiddenInputRef,
  userInput,
  setUserInput,
  handleInteractiveSubmit,
  question,
  mobileTapHint,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="interactive-prompt-container"
      onClick={() => hiddenInputRef.current?.focus()}
      onTouchStart={() => hiddenInputRef.current?.focus()}
    >
      <input
        ref={hiddenInputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleInteractiveSubmit(userInput);
          }
        }}
        style={{
          position: 'absolute',
          opacity: 0,
          left: '-9999px',
          width: '1px',
          height: '1px',
        }}
      />
      <div className="cmd-prompt">
        <span className="cmd-user">matheus@portfolio:~$</span>
        <span className="cmd-question">{question}</span>
        <span className="cmd-text">{userInput}</span>
        <span className="cursor-blink gray"></span>
      </div>
      <div className="mobile-tap-hint">
        📱 {mobileTapHint}
      </div>
    </motion.div>
  );
};
