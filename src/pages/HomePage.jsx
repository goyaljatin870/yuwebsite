import React, { useEffect, useState } from 'react';
import HeroSection from '../components/sections/Hero/HeroSection';
import HomeAboutSection from '../components/sections/HomeAbout/HomeAboutSection';
import EventsPreviewSection from '../components/sections/EventsPreview/EventsPreviewSection';
import TestimonialsSection from '../components/sections/Testimonials/TestimonialsSection';
import { HOME_BACKGROUND_IMAGE } from '../constants/media';
import { getRawGithubUrl } from '../utils/assetUrl';
import { triggerReveal } from '../utils/reveal';
import './HomePage.css';

export default function HomePage() {
  const [bgSrc, setBgSrc] = useState(HOME_BACKGROUND_IMAGE);
  useEffect(() => { setTimeout(triggerReveal, 100); }, []);
  return (
    <main className="home-page-shell">
      <div className="home-page-bg-layer" aria-hidden="true">
        <img
          src={bgSrc}
          alt=""
          className="home-page-bg-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={() => setBgSrc(getRawGithubUrl('/images/home/home-group-bg.jpg'))}
        />
        <div className="home-page-bg-gradient" />
        <div className="home-page-bg-vignette" />
      </div>

      <div className="home-page-content">
        <HeroSection />
        <EventsPreviewSection />
        <HomeAboutSection />
        <TestimonialsSection />
      </div>
    </main>
  );
}
