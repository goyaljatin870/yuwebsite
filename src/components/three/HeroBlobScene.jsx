import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';

/** Brand greens: #0d7a58 surface, #0a5c42 deep, #9ed4be soft highlight */
function DistortOrb() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.11;
  });
  return (
    <group position={[1.85, 0, 0]}>
    <Float speed={1.6} rotationIntensity={0.24} floatIntensity={0.32}>
      <Sphere ref={ref} args={[1, 80, 80]} scale={2.45}>
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
    </group>
  );
}

export default function HeroBlobScene() {
  return (
    <Canvas
      className="hero-webgl-canvas"
      camera={{ position: [0.9, 0, 7.85], fov: 36 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.75]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[12, 10, 8]} intensity={1} color="#faf5ef" />
        <pointLight position={[-5, -3, 4]} intensity={0.75} color="#d88b99" />
        <Stars radius={100} depth={52} count={2200} factor={3.2} saturation={0.15} fade speed={0.35} />
        <DistortOrb />
      </Suspense>
    </Canvas>
  );
}
