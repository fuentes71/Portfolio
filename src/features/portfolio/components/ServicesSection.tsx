import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layers } from 'lucide-react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { SectionHeader } from '../../../shared/components/SectionHeader';

export const ServicesSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.services;

  const renderIcon = (serviceTitle: string) => {
    if (serviceTitle.includes("Development") || serviceTitle.includes("Desenvolvimento")) return <Code2 size={40} />;
    if (serviceTitle.includes("Optimization") || serviceTitle.includes("Otimização")) return <Cpu size={40} />;
    if (serviceTitle.includes("Deployment") || serviceTitle.includes("Deploy")) return <Layers size={40} />;
    return <Code2 size={40} />;
  };

  return (
    <section id="services" className="services-section">
      <div className="container-lg">
        <SectionHeader title={t.title} subtitle={t.sub} />
        
        <div className="services-grid">
          {t.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="service-card"
            >
              <div className="service-icon-box">
                {renderIcon(service.title)}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
