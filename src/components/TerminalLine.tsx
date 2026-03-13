import React from 'react';

interface TerminalLineProps {
  content: React.ReactNode;
  isCommand?: boolean;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ content, isCommand }) => {
  if (isCommand) {
    return (
      <div className="cmd-prompt">
        <span className="cmd-user">User@portfolio:~$</span>
        <span className="cmd-text">{content}</span>
      </div>
    );
  }

  return <div className="terminal-line">{content}</div>;
};
