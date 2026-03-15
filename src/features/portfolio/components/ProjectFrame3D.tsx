import * as THREE from 'three';
import { Image, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef, useState } from 'react';
import './util';

interface ProjectFrame3DProps {
  url: string;
  index: number;
  onClick: () => void;
  radius: number;
  count: number;
  [key: string]: any;
}

export const ProjectFrame3D: React.FC<ProjectFrame3DProps> = ({
  url,
  index,
  onClick,
  radius,
  count,
  ...props
}) => {
  const imageRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const phi = (index / count) * Math.PI * 2;
  const x = Math.sin(phi) * radius;
  const z = Math.cos(phi) * radius;

  useFrame((_state, delta) => {
    if (!imageRef.current) return;

    easing.damp3(imageRef.current.scale, hovered ? [5, 5, 1] : [3, 3, 0.5], 0.1, delta);
    easing.damp(imageRef.current.material, 'radius', 0.5, 0.2, delta);
    easing.damp(imageRef.current.material, 'zoom', hovered ? 1 : 1.2, 0.2, delta);
  });

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, phi, 0]}
      {...props}
    >
      <Image
        ref={imageRef}
        url={url}
        transparent
        side={THREE.DoubleSide}
        scale={[5, 5]}
        radius={0.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <bentPlaneGeometry args={[radius, 1, 1, 20, 50]} />
      </Image>
    </group>
  );
};
