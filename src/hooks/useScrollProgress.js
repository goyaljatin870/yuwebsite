import { useState, useEffect } from 'react';
import { updateScrollProgress } from '../utils/scroll';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => setProgress(updateScrollProgress());
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}
