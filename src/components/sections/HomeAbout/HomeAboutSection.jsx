import React from 'react';
import SectionHeader from '../../ui/SectionHeader';
import { usePage } from '../../../context/PageContext';
import { HOME_ABOUT_MAIN_IMAGE } from '../../../constants/media';
import RemoteImage from '../../ui/RemoteImage';
import './HomeAboutSection.css';

const values = [
  { icon: 'fa-solid fa-seedling', label: 'Community First' },
  { icon: 'fa-solid fa-hand-holding-heart', label: 'Compassion' },
  { icon: 'fa-solid fa-bolt', label: 'Youth Power' },
  { icon: 'fa-solid fa-earth-asia', label: 'Sustainability' },
];

export default function HomeAboutSection() {
  const { navigateTo } = usePage();

  return (
    <div className="home-about">
      <div className="home-about-inner">
        <div className="about-img-stack reveal-left">
          <div className="about-main-img">
            <RemoteImage
              className="about-main-photo"
              src={HOME_ABOUT_MAIN_IMAGE}
              alt="Youth United members collaborating at a planning session"
              width={600}
              height={600}
              loading="lazy"
            />
          </div>
        </div>
        <div className="about-text">
          <SectionHeader
            label="Who We Are"
            title='A <em>Student-Led</em> Force for Change'
            subtitle="Founded in 2017, Youth United bridges the gap between campus life and community need — turning student energy into lasting social impact."
          />
          <p className="reveal delay-2" style={{ fontSize:'0.95rem', color:'var(--grey-400)', lineHeight:1.8, margin:'20px 0 28px' }}>
            We believe the most powerful change-makers are those closest to the challenges.
            Our members are engineers, scientists, and innovators who dedicate their time,
            skills, and hearts to building a better Punjab — one project at a time.
          </p>
          <div className="about-values reveal delay-3">
            {values.map(v => (
              <div key={v.label} className="value-chip">
                <i className={v.icon} style={{ fontSize: '0.85rem' }}></i>
                {v.label}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }} className="reveal delay-4">
            <a href="/about" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>
              Our Story <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
