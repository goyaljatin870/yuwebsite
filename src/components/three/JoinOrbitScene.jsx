import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Rings() {
  const g = useRef();
  useFrame((_, delta) => {
    if (g.current) {
      g.current.rotation.y += delta * 0.35;
      g.current.rotation.x += delta * 0.08;
    }
  });
  return (
    <group ref={g}>
      <mesh rotation={[1.15, 0.2, 0.35]}>
        <torusGeometry args={[1.05, 0.035, 14, 72]} />
        <meshBasicMaterial color="#841d2d" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[1.35, 0.9, 0.6]}>
        <torusGeometry args={[1.42, 0.018, 10, 56]} />
        <meshBasicMaterial color="#c99f52" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function JoinOrbitScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={0.6} />
      <Rings />
    </Canvas>
  );
}
