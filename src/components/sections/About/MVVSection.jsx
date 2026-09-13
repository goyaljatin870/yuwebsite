import React from 'react';
import './About.css';

const cards = [
  {
    icon: 'fa-solid fa-bullseye',
    label: 'Mission',
    title: 'Our Mission',
    desc: 'To empower Thapar students to become compassionate changemakers — bridging the gap between privileged education and underserved communities through sustained, student-led action.',
  },
  {
    icon: 'fa-solid fa-eye',
    label: 'Vision',
    title: 'Our Vision',
    desc: 'A campus culture where every student contributes at least one act of meaningful service — building a generation of professionals who lead with empathy as much as expertise.',
  },
  {
    icon: 'fa-solid fa-star',
    label: 'Values',
    title: 'Our Values',
    desc: 'Integrity, inclusivity, and impact drive everything we do. We believe in sustainable community development, transparent governance, and celebrating every small win along the way.',
  },
];

export default function MVVSection() {
  return (
    <section className="mvv-section">
      <div className="mvv-inner">
        <div className="section-label reveal">What Drives Us</div>
        <h2 className="section-title reveal delay-1">Mission, Vision &amp; <em>Values</em></h2>
        <div className="mvv-grid">
          {cards.map((c, i) => (
            <div key={c.label} className={`mvv-card reveal delay-${i + 1}`}>
              <div className="mvv-accent"></div>
              <div className="mvv-icon"><i className={c.icon}></i></div>
              <div className="mvv-label">{c.label}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
