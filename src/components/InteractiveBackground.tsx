import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const InteractiveBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement - more aggressive/snappy
  const springConfig = { damping: 15, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -0.5 to 0.5
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  // Define blobs with different colors and base positions - highly vibrant and saturated
  const blobs = useMemo(() => [
    {
      color: 'rgba(255, 255, 0, 0.7)',  // Vibrant Yellow
      scale: 1.2,
      x: -20,
      y: -20,
      speed: 100,
    },
    {
       color: 'rgba(255, 0, 0, 0.7)',   // Vibrant Red
       scale: 1.5,
       x: 30,
       y: -10,
       speed: -80,
    },
    {
       color: 'rgba(147, 51, 234, 0.7)', // Vibrant Purple
       scale: 1.8,
       x: 0,
       y: 40,
       speed: 120,
    },
    {
       color: 'rgba(37, 99, 235, 0.7)',  // Vibrant Blue
       scale: 1.4,
       x: -40,
       y: 20,
       speed: -90,
    },
    {
       color: 'rgba(236, 72, 153, 0.7)', // Vibrant Pink
       scale: 1.6,
       x: 50,
       y: 50,
       speed: 110,
    }
  ], []);

  return (
    <div 
      className="interactive-bg-container"
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0c', // Dark base
        zIndex: 0,
      }}
    >
      {/* Background blobs */}
      {blobs.map((blob, i) => (
        <Blob 
          key={i} 
          smoothX={smoothX} 
          smoothY={smoothY} 
          {...blob} 
        />
      ))}

      {/* Subtle Noise / Grain Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

interface BlobProps {
  smoothX: any;
  smoothY: any;
  color: string;
  scale: number;
  x: number;
  y: number;
  speed: number;
}

const Blob: React.FC<BlobProps> = ({ smoothX, smoothY, color, scale, x, y, speed }) => {
  const translateX = useTransform(smoothX, (v: number) => v * speed + x + '%');
  const translateY = useTransform(smoothY, (v: number) => v * speed + y + '%');

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        x: translateX,
        y: translateY,
        scale,
      }}
      animate={{
        scale: [scale, scale * 1.1, scale],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
