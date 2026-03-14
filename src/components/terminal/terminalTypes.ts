import React from 'react';

export type TerminalLine = {
  id: string;
  content: React.ReactNode;
  isCommand?: boolean;
};

export interface TerminalProps {
  onComplete: () => void;
}
