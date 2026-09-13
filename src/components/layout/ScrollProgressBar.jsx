import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      id="scroll-progress"
      style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--green-deep), var(--green-mid), var(--accent-warm))',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0',
      }}
    />
  );
}
