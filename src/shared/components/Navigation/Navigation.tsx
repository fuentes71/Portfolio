import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.nav;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <nav className="main-nav">
      <div className="nav-glass">
        <div className="nav-links">
          {t.map((item, index) => (
            <a key={index} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Open Menu">
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="overlay-header">
              <button className="close-menu-btn" onClick={closeMenu} aria-label="Close Menu">
                <X size={32} />
              </button>
            </div>
            
            <div className="mobile-nav-list">
              {t.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
