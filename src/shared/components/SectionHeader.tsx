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
      className="section-header-container"
      data-align={align}
    >
      <h2 className="section-head">
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-line" />
    </motion.div>
  );
};
