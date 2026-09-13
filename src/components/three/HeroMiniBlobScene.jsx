import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

/** Compact orb styled to match the right hero orb while preserving its smaller size. */
function MiniDistortOrb() {
  const ref = useRef();

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.11;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.24} floatIntensity={0.32}>
      <Sphere ref={ref} args={[1, 80, 80]} scale={0.9}>
        <MeshDistortMaterial
          color="#841d2d"
          emissive="#380810"
          emissiveIntensity={0.42}
          roughness={0.28}
          metalness={0.78}
          distort={0.32}
          speed={1.9}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroMiniBlobScene() {
  return (
    <Canvas
      className="hero-mini-webgl-canvas"
      camera={{ position: [0, 0, 4.85], fov: 38 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[12, 10, 8]} intensity={1} color="#faf5ef" />
        <pointLight position={[-5, -3, 4]} intensity={0.75} color="#d88b99" />
        <MiniDistortOrb />
      </Suspense>
    </Canvas>
  );
}
