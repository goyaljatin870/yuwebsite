import React, { useEffect } from 'react';
import HeroSection from '../components/sections/Hero/HeroSection';
import HomeAboutSection from '../components/sections/HomeAbout/HomeAboutSection';
import EventsPreviewSection from '../components/sections/EventsPreview/EventsPreviewSection';
import TestimonialsSection from '../components/sections/Testimonials/TestimonialsSection';
import { HOME_BACKGROUND_IMAGE } from '../constants/media';
import { triggerReveal } from '../utils/reveal';
import './HomePage.css';

export default function HomePage() {
  useEffect(() => { setTimeout(triggerReveal, 100); }, []);
  return (
    <main className="home-page-shell">
      <div className="home-page-bg-layer" aria-hidden="true">
        <img
          src={HOME_BACKGROUND_IMAGE}
          alt=""
          className="home-page-bg-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
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
