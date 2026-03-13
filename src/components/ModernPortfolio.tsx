import React from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { HeroSection } from '../features/portfolio/components/HeroSection';
import { AboutSection } from '../features/portfolio/components/AboutSection';
import { ServicesSection } from '../features/portfolio/components/ServicesSection';
import { ProjectsSection } from '../features/portfolio/components/ProjectsSection';
import { ExperienceSection } from '../features/portfolio/components/ExperienceSection';
import { Navigation, Footer, FloatingLangToggle } from '../shared/components/LayoutElements';

export const ModernPortfolio: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Fixed background color
  const FIXED_BG = '#06070a';

  // Accent Colors: Orange, White, Orange, White, Orange
  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#ff4d05', '#ffffff', '#ff4d05', '#ffffff', '#ff4d05']
  );

  // Apply motion values as CSS variables to the container
  React.useEffect(() => {
    document.documentElement.style.setProperty('--section-text', '#d1d5db');
  }, []);

  useMotionValueEvent(accentColor, "change", (latest) => {
    document.documentElement.style.setProperty('--accent-color', latest);
  });

  return (
    <motion.div
      className="modern-gui overflow-x-hidden selection:bg-[#ff4d05] selection:text-white"
      style={{ backgroundColor: FIXED_BG, color: "var(--section-text)" }}
    >
      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>

      <Footer />
      <FloatingLangToggle />
    </motion.div>
  );
};
