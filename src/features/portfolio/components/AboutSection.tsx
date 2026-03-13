import { motion } from 'framer-motion';
import React from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { SectionHeader } from '../../../shared/components/SectionHeader';

export const AboutSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const content = portfolioData[lang];

  const t = portfolioData[lang].ui.about;

  return (
    <motion.section
      id="about"
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-lg">
        <div className="about-grid">
          <div className="image-wrapper">
            <img
              src="/Portfolio/images/profile.png"
              alt="Profile"
            />
            <div className="accent-box" />
          </div>

          <div className="about-text-content">
            <SectionHeader title={t.title} align="left" />

            <h3>
              {t.hello} <span className="text-primary">Matheus Fuentes</span>
            </h3>

            <p>
              {t.expert} {content.profile}
            </p>

            <div className="personal-info-grid">
              <div className="info-item">
                <span className="info-label">{t.fields.name}</span>
                <span className="info-value">{portfolioData.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t.fields.age}</span>
                <span className="info-value">{t.ageValue}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t.fields.address}</span>
                <span className="info-value">{t.addressValue}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t.fields.email}</span>
                <span className="info-value">{portfolioData.contact.email}</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => window.open('/Portfolio/CV.pdf', '_blank')}>
              {t.download}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
