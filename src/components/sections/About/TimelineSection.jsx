import React from 'react';

const milestones = [
  { year: '2017', title: 'Founded', desc: 'Youth United established at Thapar Institute with 20 founding members and a single classroom teaching programme.' },
  { year: '2018', title: 'Expanding Operations', desc: 'Formalized internal structures, expanded the core team, and initiated environmental awareness campaigns.' },
  { year: '2019', title: 'First Health Camp', desc: 'Partnered with local doctors to conduct free health screenings for 300+ residents in nearby villages.' },
  { year: '2020', title: 'Digital Pivot', desc: 'Moved outreach online during COVID-19 — digital literacy sessions reached 1,200+ people across Punjab.' },
  { year: '2021', title: '100 Members', desc: 'Crossed the milestone of 100 active volunteers and launched the formal domain-based structure.' },
  { year: '2022', title: 'State Recognition', desc: 'Received the Punjab Youth Excellence Award for outstanding community service by a student organisation.' },
  { year: '2023', title: '10,000 Lives', desc: 'Cumulatively impacted over 10,000 lives across education, health, and environmental programmes.' },
  { year: '2024', title: '500 Members', desc: 'Became one of Thapar\'s largest student societies with 500+ active volunteers across all departments.' },
  { year: '2025', title: 'Pan-Punjab Outreach', desc: 'Formed alliances with student societies at partner institutions to run joint health, education, and environment drives across the region.' },
  { year: '2026', title: 'Ten Years United', desc: 'Marked ten years of impact with expanded mentorship, rural digital inclusion, and a renewed focus on climate action.' },
];

export default function TimelineSection() {
  return (
    <section className="timeline-section">
      <div className="timeline-inner">
        <div className="section-label reveal">Our Journey</div>
        <h2 className="section-title reveal delay-1">From <em>Idea</em> to Impact</h2>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${(i % 5) + 1}`}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
