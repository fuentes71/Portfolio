import { motion } from 'framer-motion';
import React from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { ConstellationBackground } from '../../../components/ConstellationBackground';

export const HeroSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const content = portfolioData[lang];

  const t = portfolioData[lang].ui.hero;

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
          {t.im} <span>{content.titles[0]}</span>
        </h1>
      </motion.div>
    </section>
  );
};
