import { useEffect } from 'react';
import { triggerReveal } from '../utils/reveal';

export function useReveal(deps = []) {
  useEffect(() => {
    const t = setTimeout(triggerReveal, 100);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
