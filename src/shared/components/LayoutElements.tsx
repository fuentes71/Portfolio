import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { usePortfolioStore } from '../../core/store/usePortfolioStore';
import { portfolioData } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.footer;

  return (
    <footer className="main-footer">
      <div className="footer-logo">Matheus Fuentes</div>

      <div className="social-links">
        <a href="https://github.com/fuentes71" target="_blank" rel="noreferrer"><Github size={24} /></a>
        <a href="https://linkedin.com/in/matheus-fuentes-full-stack-nodejs-angular/" target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
        <a href={`mailto:${portfolioData.contact.email}`}><Mail size={24} /></a>
      </div>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} {t.copyright}
      </p>
    </footer>
  );
};

export const FloatingLangToggle: React.FC = () => {
  const { lang, setLang } = usePortfolioStore();

  return (
    <button
      className="floating-lang-toggle"
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
    >
      {lang.toUpperCase()}
    </button>
  );
};
