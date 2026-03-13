import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`section-header-container text-${align}`}
    >
      <h2 className={`section-head justify-${align === 'center' ? 'center' : 'start'}`}>
        {title}
      </h2>
      {subtitle && <p className={`section-subtitle ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>}
      <div className={`section-line ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};
