import { useState, useEffect } from 'react';

/** Enable Three.js scenes on capable viewports, respect reduced motion. */
export default function useEnableWebGL(minWidth = 880) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = () => {
      const wide = window.matchMedia(`(min-width: ${minWidth}px)`).matches;
      const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setOk(wide && motionOk);
    };
    run();
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', run);
    mqMotion.addEventListener('change', run);
    return () => {
      mq.removeEventListener('change', run);
      mqMotion.removeEventListener('change', run);
    };
  }, [minWidth]);

  return ok;
}
