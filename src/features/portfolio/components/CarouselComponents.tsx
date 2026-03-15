import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { easing } from 'maath';

export const Rig = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Rotate the carousel based on scroll offset
    // scroll.offset is 0 to 1
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);

    const t = state.clock.getElapsedTime();
    // Subtle organic sway (oscillation)
    ref.current.position.y = Math.sin(t / 2) * 0.2;
    ref.current.rotation.x = Math.cos(t / 4) * 0.06;
    ref.current.rotation.z = Math.sin(t / 4) * 0.06;

    // Smooth camera movement towards pointer
    state.events.update?.(); // Raycasts every frame for better responsiveness
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, 1, 40], // Brought camera closer
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref}>{children}</group>;
};


