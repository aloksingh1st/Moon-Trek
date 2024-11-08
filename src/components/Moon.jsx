// src/components/Moon.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import moonTexture from '../assets/map1.jpg';  // Path to the Moon texture image

function Moon() {
  const texture = useLoader(TextureLoader, moonTexture);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Moon;
