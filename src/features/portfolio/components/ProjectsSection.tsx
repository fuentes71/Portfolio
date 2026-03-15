import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import React, { useState } from 'react';
import { usePortfolioStore } from '../../../core/store/usePortfolioStore';
import { portfolioData } from '../../../data/portfolioData';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import { ProjectCarousel3D } from './ProjectCarousel3D';

export const ProjectsSection: React.FC = () => {
  const { lang } = usePortfolioStore();
  const t = portfolioData[lang].ui.projects;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selectedProject = selectedIdx !== null ? t.items[selectedIdx] : null;

  return (
    <section id="projects" className="projects-section">
      <div className="container-lg">
        <SectionHeader title={t.title} />
        
        <ProjectCarousel3D 
          projects={t.items} 
          onProjectClick={(idx) => setSelectedIdx(idx)} 
        />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div 
              className="project-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedIdx(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
                <div className="modal-info">
                  <div className="project-tags">
                    {selectedProject.tech.map((tech, j) => (
                      <span key={j} className="project-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-desc">{selectedProject.desc}</p>
                  
                  <div className="modal-footer">
                    <button className="project-btn">{t.btn}</button>
                    <a href="#" className="modal-link">
                      <ExternalLink size={20} />
                      <span>Live Preview</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
