import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { ConstellationBackground } from '../../../components/ConstellationBackground';

const useTypewriter = (texts: string[], typingSpeed = 60, deletingSpeed = 35, pauseMs = 2000) => {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = texts[textIndex];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pauseMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 200);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(prev => prev.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setTextIndex(prev => (prev + 1) % texts.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseMs]);

  return { displayed, isTyping: phase === 'typing' };
};

export const HeroSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const content = portfolioData[lang];
  const t = portfolioData[lang].ui.hero;

  const { displayed, isTyping } = useTypewriter(content.titles);

  return (
    <section id="home" className="hero-section">
      <ConstellationBackground />

      <div className="hero-creative-bg">
        <div className="hero-circle circle-1" />
        <div className="hero-circle circle-2" />
        <div className="hero-grid-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-content"
      >
        <h1 className="hero-title">
          <span className="hero-title-typed">
            {displayed}
            <motion.span
              className="typewriter-cursor"
              animate={{ opacity: isTyping ? [1, 0] : 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              |
            </motion.span>
          </span>
        </h1>
      </motion.div>
    </section>
  );
};
