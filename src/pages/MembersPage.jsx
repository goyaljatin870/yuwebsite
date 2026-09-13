import React, { useEffect, useState } from 'react';
import members, { facultyMembers } from '../data/members';
import MemberCard from '../components/sections/MemberCard/MemberCard';
import { triggerReveal } from '../utils/reveal';
import '../components/sections/MemberCard/MemberCard.css';
import '../components/sections/EventCard/EventCard.css';
import '../components/sections/About/About.css';
import './MembersPage.css';

/** Order: All → Faculty → hierarchy (matches org structure). */
const ROLE_TABS = [
  { key: 'All', label: 'All' },
  { key: 'Faculty', label: 'Faculty' },
  { key: 'executive-board', label: 'Executive Board' },
];

export default function MembersPage() {
  const [active, setActive] = useState('All');

  useEffect(() => { setTimeout(triggerReveal, 100); }, [active]);

  const showFaculty = active === 'All' || active === 'Faculty';
  const showExecutiveBoard = active === 'All' || active === 'executive-board';

  const row1Members = members.filter(m => m.row === 1);
  const row2Members = members.filter(m => m.row === 2);
  const row3Members = members.filter(m => m.row === 3);

  return (
    <main>
      <div className="about-hero" style={{ minHeight: '320px' }}>
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <span className="page-label">Our Members</span>
          <h1>The <em style={{ fontStyle:'italic', color:'var(--green-soft)' }}>People</em> Behind the Work</h1>
          <p>500+ students from every corner of Thapar, united by the belief that they can make a real difference.</p>
        </div>
      </div>

      <section className="members-page-section">
        <div className="members-page-inner">
          <div className="events-filter-tabs members-role-tabs">
            {ROLE_TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`filter-tab ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>
          {showFaculty && (
            <div className="team-block team-block--faculty" style={{ marginTop: 32 }}>
              <h3 className="team-block-title">Faculty Mentors</h3>
              <div className="faculty-grid">
                {facultyMembers.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>
          )}
          {showExecutiveBoard && (
            <div className="team-block team-block--students" style={{ marginTop: showFaculty ? 48 : 32 }}>
              <h3 className="team-block-title">Executive Board</h3>
              <div className="members-row-container">
                {/* Row 1 (2 cards): Jatin Goyal & Bhoomi Garg */}
                <div className="members-grid-row-1">
                  {row1Members.map(m => <MemberCard key={m.id} member={m} />)}
                </div>

                {/* Row 2 (3 cards): Parth Setia, Ruhani Singla & Shaffy Singla */}
                <div className="members-grid-row-2">
                  {row2Members.map(m => <MemberCard key={m.id} member={m} />)}
                </div>

                {/* Row 3 (6 columns): Domain Heads */}
                <div className="members-grid-row-3">
                  {row3Members.map(m => <MemberCard key={m.id} member={m} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
