// src/components/MoonTerrain.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import displacementMap from '../assets/moon-displacement.jpg';  // Path to the heightmap

function MoonTerrain() {
  const displacement = useLoader(TextureLoader, displacementMap);

  return (
    <mesh>
      <planeGeometry args={[5, 5, 256, 256]} />
      <meshStandardMaterial displacementMap={displacement} />
    </mesh>
  );
}

export default MoonTerrain;
