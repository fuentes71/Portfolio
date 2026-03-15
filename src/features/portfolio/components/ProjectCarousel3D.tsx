import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import { ProjectFrame3D } from './ProjectFrame3D';
import { Rig, Banner } from './CarouselComponents';

interface ProjectCarousel3DProps {
  projects: any[];
  onProjectClick: (index: number) => void;
}

const CarouselItems = React.memo(({ projects, onProjectClick }: { projects: any[], onProjectClick: (idx: number) => void }) => {
  // Dynamic radius based on project count to fill the view proportionally
  const radius = Math.max(projects.length * 2.2, 18);
  return (
    <Rig>
      {projects.map((project, i) => (
        <ProjectFrame3D
          key={project.id || i}
          index={i}
          count={projects.length}
          radius={radius}
          url={project.image}
          title={project.title}
          type={project.type}
          tech={project.tech}
          onClick={() => onProjectClick(i)}
        />
      ))}
      <Banner position={[0, -5, 0]} />
    </Rig>
  );
});

export const ProjectCarousel3D: React.FC<ProjectCarousel3DProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="project-carousel-3d-container" style={{ width: '100%', height: '100vh', background: 'transparent' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 15 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <fog attach="fog" args={["#06070a", 8.5, 12]} />
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal={true}
            damping={0.1}
            pages={4}
            distance={1}
          >
            <CarouselItems projects={projects} onProjectClick={onProjectClick} />
          </ScrollControls>
        </Suspense>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 50]} intensity={15} />
      </Canvas>
      <div className="carousel-3d-hint" style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.5,
        color: 'white',
        fontSize: '0.8rem',
        fontFamily: 'monospace'
      }}>
        <p>scroll left/right ...</p>
      </div>
    </div>
  );
};
