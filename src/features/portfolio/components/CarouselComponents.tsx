import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { easing } from 'maath';

export const Rig = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Drag state
  const isDragging = useRef(false);
  const dragX = useRef(0);
  const targetManualRotation = useRef(0);
  const currentManualRotation = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Smoothly interpolate the manual drag rotation
    easing.damp(
      currentManualRotation,
      "current",
      targetManualRotation.current,
      0.2,
      delta
    );

    // Total rotation = scroll rotation + manual drag rotation
    // Note: currentManualRotation is used as a ref-value proxy handled by maath
    const scrollRotation = -scroll.offset * (Math.PI * 2);
    ref.current.rotation.y = scrollRotation + currentManualRotation.current;

    const t = state.clock.getElapsedTime();
    // Subtle organic sway (oscillation)
    ref.current.position.y = Math.sin(t / 2) * 0.2;
    ref.current.rotation.x = Math.cos(t / 4) * 0.06;
    ref.current.rotation.z = Math.sin(t / 4) * 0.06;

    // Smooth camera movement towards pointer
    state.events.update?.();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, 1, 40], // Brought camera closer
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group
      ref={ref}
      onPointerDown={(e) => {
        (e.target as any).setPointerCapture(e.pointerId);
        isDragging.current = true;
        dragX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        (e.target as any).releasePointerCapture(e.pointerId);
        isDragging.current = false;
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - dragX.current;
        dragX.current = e.clientX;
        // Sensitivity factor for drag
        targetManualRotation.current += deltaX * 0.005;
      }}
    >
      {children}
    </group>
  );
};


