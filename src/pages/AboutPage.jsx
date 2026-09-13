import React, { useEffect } from 'react';
import MVVSection from '../components/sections/About/MVVSection';

import TimelineSection from '../components/sections/About/TimelineSection';
import { triggerReveal } from '../utils/reveal';
import '../components/sections/About/About.css';

export default function AboutPage() {
  useEffect(() => { setTimeout(triggerReveal, 100); }, []);
  return (
    <main>
      <div className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <span className="page-label">About Us</span>
          <h1>Who We <em style={{ fontStyle:'italic', color:'var(--green-soft)' }}>Are</em></h1>
          <p>A passionate community of Thapar students committed to bridging the gap between education and meaningful social action since 2017.</p>
        </div>
      </div>
      <MVVSection />

      <TimelineSection />
    </main>
  );
}
