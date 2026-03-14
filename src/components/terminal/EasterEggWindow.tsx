import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

interface EasterEggWindowProps {
  lines: string[];
  lang: 'pt' | 'en';
}

export const EasterEggWindow: React.FC<EasterEggWindowProps> = ({ lines, lang }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 25, stiffness: 900 }}
      className="easter-egg-window"
    >
      <div className="terminal-header">
        <div className="macos-buttons">
          <div className="macos-btn close"></div>
          <div className="macos-btn min"></div>
          <div className="macos-btn max"></div>
        </div>
        <div className="terminal-title">
          <Folder size={12} className="folder-icon" />
          <span>{lang === 'pt' ? 'Segredo Descoberto' : 'Secret Found'}</span>
        </div>
      </div>

      <div className="terminal-content easter-egg-content">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="easter-egg-line"
          >
            {line || <br />}
          </motion.div>
        ))}
        <div className="auto-close-hint">
          {lang === 'pt' ? 'Fechando em 5 segundos...' : 'Closing in 5 seconds...'}
        </div>
      </div>
    </motion.div>
  );
};
