import React, { lazy, Suspense } from 'react';
import { usePage } from '../../../context/PageContext';
import { HERO_IMAGE, HOME_BACKGROUND_IMAGE } from '../../../constants/media';
import RemoteImage from '../../ui/RemoteImage';
import useEnableWebGL from '../../../hooks/useEnableWebGL';
import './HeroSection.css';

const HeroBlobScene = lazy(() => import('../../three/HeroBlobScene'));
const HeroMiniBlobScene = lazy(() => import('../../three/HeroMiniBlobScene'));

export default function HeroSection() {
  const { navigateTo } = usePage();
  const webgl = useEnableWebGL(900);

  return (
    <section className="hero">
      <div className="hero-photo-bg-layer" aria-hidden>
        <img
          src={HOME_BACKGROUND_IMAGE}
          alt=""
          className="hero-photo-bg-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="hero-photo-bg-gradient"></div>
        <div className="hero-photo-bg-vignette"></div>
      </div>
      <div className="hero-canvas-layer" aria-hidden>
        {webgl && (
          <Suspense fallback={null}>
            <HeroBlobScene />
          </Suspense>
        )}
      </div>
      <div className="hero-bg"></div>
      <div className="hero-gridlines" aria-hidden></div>
      <div className="hero-mini-canvas-wrap" aria-hidden>
        {webgl && (
          <Suspense fallback={null}>
            <HeroMiniBlobScene />
          </Suspense>
        )}
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Empowering<br /><em>Change,</em><br />Together.
          </h1>
          <p className="hero-desc">
            Youth United is a student-driven NGO at Thapar Institute dedicated to creating
            meaningful impact through education, community service, and social innovation.
          </p>
          <div className="hero-actions">
            <a href="/join" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigateTo('joinus'); }}>
              <i className="fa-solid fa-arrow-right"></i> Join Us
            </a>
            <a href="/events" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigateTo('events'); }}>
              <i className="fa-regular fa-calendar"></i> Explore Events
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-frame">
            <div className="hero-frame-corner tl"></div>
            <div className="hero-frame-corner tr"></div>
            <div className="hero-frame-corner bl"></div>
            <div className="hero-frame-corner br"></div>
            <div className="hero-img-wrap">
              <RemoteImage
                className="hero-photo"
                src={HERO_IMAGE}
                alt="Students collaborating on a community project"
                width={640}
                height={800}
                fallbackSeed="yu-hero"
              />
            </div>
          </div>
          <div className="hero-float-card">
            <div className="icon"><i className="fa-solid fa-users"></i></div>
            <div className="text"><strong>500+</strong><span>Active Volunteers</span></div>
          </div>
          <div className="hero-float-card2">
            <strong>10+</strong><br /><span>Years of Impact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
