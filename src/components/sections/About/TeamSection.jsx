import React from 'react';
import members, { facultyMembers } from '../../../data/members';
import MemberCard from '../MemberCard/MemberCard';

export default function TeamSection() {
  return (
    <section className="team-section">
      <div className="team-inner">
        <div className="section-label reveal">The People</div>
        <h2 className="section-title reveal delay-1">Meet Our <em>Team</em></h2>
        <p className="section-subtitle reveal delay-2">
          Driven students from across every department, united by a shared belief that they can make a real difference.
        </p>

        <div className="team-block team-block--faculty reveal delay-2">
          <h3 className="team-block-title">Faculty Mentors</h3>
          <div className="faculty-grid">
            {facultyMembers.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
        </div>

        <div className="team-block team-block--students reveal delay-3">
          <h3 className="team-block-title">Student Team</h3>
          <div className="members-row-container">
            <div className="members-grid-row-1">
              {members.filter(m => m.row === 1).map(m => <MemberCard key={m.id} member={m} />)}
            </div>
            <div className="members-grid-row-2" style={{ marginTop: '28px' }}>
              {members.filter(m => m.row === 2).map(m => <MemberCard key={m.id} member={m} />)}
            </div>
            <div className="members-grid-row-3" style={{ marginTop: '28px' }}>
              {members.filter(m => m.row === 3).map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
