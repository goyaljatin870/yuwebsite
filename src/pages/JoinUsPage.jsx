import React, { lazy, Suspense, useEffect } from 'react';
import ApplicationForm from '../components/sections/JoinUs/ApplicationForm';
import PerksSection from '../components/sections/JoinUs/PerksSection';
import { triggerReveal } from '../utils/reveal';
import useEnableWebGL from '../hooks/useEnableWebGL';
import '../components/sections/JoinUs/JoinUs.css';

const JoinOrbitScene = lazy(() => import('../components/three/JoinOrbitScene'));

export default function JoinUsPage() {
  const webgl = useEnableWebGL(720);

  useEffect(() => { setTimeout(triggerReveal, 100); }, []);

  return (
    <main>
      <div className="joinus-hero">
        {webgl && (
          <div className="joinus-hero-orbit" aria-hidden>
            <Suspense fallback={null}>
              <JoinOrbitScene />
            </Suspense>
          </div>
        )}
        <div className="joinus-hero-bg"></div>
        <div className="joinus-hero-content">
          <span className="page-label">Join Us</span>
          <h1>Become a <em style={{ fontStyle: 'italic', color: 'var(--green-soft)' }}>Changemaker</em></h1>
          <p>Apply to join Youth United and be part of a community that turns compassion into action.</p>
        </div>
      </div>

      <div className="joinus-body">
        <div className="joinus-info reveal-left">
          <h2>Why Join Youth United?</h2>
          <p>
            We are more than a society — we are a launchpad. Whether you want to teach children,
            plant trees, run health camps, or build digital tools for social good, there&apos;s a place for you here.
          </p>
          <div className="joinus-bullets">
            {[
              { icon: 'fa-solid fa-check-circle', text: 'Open to all Thapar students, any department or year' },
              { icon: 'fa-solid fa-check-circle', text: 'No prior experience required — just passion' },
              { icon: 'fa-solid fa-check-circle', text: 'Flexible commitment — work around your academics' },
              { icon: 'fa-solid fa-check-circle', text: 'Official certificates and recommendation letters' },
              { icon: 'fa-solid fa-check-circle', text: 'Real leadership roles within your first semester' },
            ].map(b => (
              <div key={b.text} className="joinus-bullet">
                <i className={b.icon}></i>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-right">
          <ApplicationForm />
        </div>
      </div>

      <PerksSection />
    </main>
  );
}
