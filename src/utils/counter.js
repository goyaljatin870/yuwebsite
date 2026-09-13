export function animateCounter(el, target, duration = 1800) {
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + '+';
    if (current >= target) clearInterval(timer);
  }, 16);
}
