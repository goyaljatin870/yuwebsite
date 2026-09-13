import React from 'react';

const perks = [
  {
    icon: 'fa-solid fa-network-wired',
    title: 'Real-World Network',
    desc: 'Connect with changemakers, NGO professionals, and alumni who are shaping industries and communities across India.',
  },
  {
    icon: 'fa-solid fa-certificate',
    title: 'Recognised Credentials',
    desc: 'Official certificates, recommendation letters, and a portfolio of impact — valued by top recruiters and grad schools.',
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Leadership Opportunities',
    desc: 'Take ownership of projects, lead teams, manage budgets, and develop skills that textbooks simply cannot teach.',
  },
];

export default function PerksSection() {
  return (
    <section className="perks-section">
      <div className="perks-inner">
        <div className="section-label reveal">Why Join?</div>
        <h2 className="section-title reveal delay-1">What You'll <em>Gain</em></h2>
        <div className="perks-grid">
          {perks.map((p, i) => (
            <div key={p.title} className={`perk-card reveal delay-${i + 1}`}>
              <div className="perk-icon"><i className={p.icon}></i></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
