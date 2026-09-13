import React, { useEffect, useState } from 'react';
import events from '../data/events';
import EventCard from '../components/sections/EventCard/EventCard';
import { triggerReveal } from '../utils/reveal';
import '../components/sections/EventCard/EventCard.css';
import '../components/sections/About/About.css';

const CATEGORIES = [
  'All',
  'Inclusion',
  'STEM',
  'Outreach',
  'Community',
  'Environment',
  'Social Impact',
  'Unity',
  'Youth',
  'Children',
];

const CARD_SIZE_CLASS = {
  small: 'event-card--small',
  medium: 'event-card--medium',
  large: 'event-card--large',
};

const MONTH_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function getEventStartDate(dateLabel) {
  if (!dateLabel) return 0;
  const str = String(dateLabel).trim();
  const monthMatch = str.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/i);
  const dayMatch = str.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  const yearMatch = str.match(/\b(20\d\d)\b/);

  if (!monthMatch || !yearMatch) return 0;

  const month = MONTH_INDEX[monthMatch[1].toLowerCase()];
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
  const year = parseInt(yearMatch[1], 10);

  return new Date(year, month, day).getTime();
}

export default function EventsPage() {
  const [active, setActive] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => { setTimeout(triggerReveal, 100); }, [active, sortOrder]);

  const filtered = [...(active === 'All'
    ? events
    : events.filter((event) => event.category === active))]
    .sort((a, b) => {
      const timeA = getEventStartDate(a.date);
      const timeB = getEventStartDate(b.date);
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

  return (
    <main>
      {/* Page hero */}
      <div className="about-hero" style={{ minHeight: '320px' }}>
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <span className="page-label">Our Events</span>
          <h1>Where <em style={{ fontStyle:'italic', color:'var(--green-soft)' }}>Action</em> Happens</h1>
          <p>Browse every initiative, drive, and programme we have organised — from campus to community.</p>
        </div>
      </div>

      <section>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Controls Bar */}
          <div className="events-controls-bar">
            {/* Filter tabs */}
            <div className="events-filter-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${active === cat ? 'active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="events-sort-toggle">
              <span className="events-sort-label">Sort:</span>
              <button
                type="button"
                className={`sort-tab ${sortOrder === 'desc' ? 'active' : ''}`}
                onClick={() => setSortOrder('desc')}
                title="Sort by newest date first"
              >
                <i className="fa-solid fa-arrow-down-wide-short"></i> Newest First
              </button>
              <button
                type="button"
                className={`sort-tab ${sortOrder === 'asc' ? 'active' : ''}`}
                onClick={() => setSortOrder('asc')}
                title="Sort chronologically (oldest date first)"
              >
                <i className="fa-solid fa-arrow-up-short-wide"></i> Oldest First
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className={`events-grid ${active === 'All' ? 'events-grid--all-layout' : ''}`} style={{ marginTop: '40px' }}>
            {filtered.map((ev, i) => (
              <EventCard
                key={ev.id}
                event={ev}
                delay={i % 3 + 1}
                className={active === 'All' ? (CARD_SIZE_CLASS[ev.cardSize] || CARD_SIZE_CLASS.small) : ''}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--grey-400)', textAlign: 'center', padding: '48px 0' }}>
              No events in this category yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
