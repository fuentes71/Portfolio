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

    // Smooth camera movement towards pointer
    state.events.update?.(); // Raycasts every frame for better responsiveness
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, 1, 100], // Restricted Y to 1 (horizontal only)
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref}>{children}</group>;
};

export const Banner = (props: any) => {
  const ref = useRef<any>(null);
  const scroll = useScroll();

  useFrame((_state, _delta) => {
    if (!ref.current) return;
    // Rotate banner
    ref.current.rotation.y = scroll.offset * (Math.PI * 2);

    // Animate material if it's SineMaterial
    if (ref.current.material.time) {
      ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[20, 20, 1, 128, 16, true]} />
      <meshSineMaterial side={THREE.DoubleSide} transparent opacity={0.5} color="#ff4d05" />
    </mesh>
  );
};
