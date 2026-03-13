import { motion } from 'framer-motion';
import React from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { SectionHeader } from '../../../shared/components/SectionHeader';

export const ExperienceSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const content = portfolioData[lang];

  const t = portfolioData[lang].ui.experience;

  return (
    <section id="experience" className="experience-section">
      <div className="container-lg">
        <SectionHeader title={t.title} />

        <div className="timeline-container">
          {/* Dynamic Progress Line */}
          <motion.div
            className="timeline-progress-line"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '100%', opacity: 1 }}
            viewport={{ once: false, amount: 0.1, margin: "1000px 0px 0px 0px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {content.experience.map((exp, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <motion.div 
                className="timeline-dot"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1, margin: "1000px 0px 0px 0px" }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1, margin: "1000px 0px 0px 0px" }}
                transition={{ duration: 0.6 }}
                className="timeline-card"
              >
                <span className="exp-date">{exp.period}</span>
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-company">{exp.company}</div>
                <ul className="exp-list">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
