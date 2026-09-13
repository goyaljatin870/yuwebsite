import React from 'react';
import { usePage } from '../context/PageContext';
import { eventDetails } from '../data/eventDetails';
import events from '../data/events';
import { getAssetUrl } from '../utils/assetUrl';
import '../components/sections/About/About.css';
import '../components/sections/EventCard/EventCard.css';
import './EventDetailPage.css';

const LA_FIESTA_DETAIL_BACKGROUND_IMAGE = '/images/events/img-9409.jpg';
const LA_FIESTA_5_DETAIL_BACKGROUND_IMAGE = '/images/events/LA_FIESTA_image_11.png';

export default function EventDetailPage() {
  const { activeEventId, navigateTo } = usePage();
  const eventDetail = eventDetails[activeEventId];
  const eventBase = events.find(e => e.id === activeEventId);
  const detailBackgroundImage = getAssetUrl(
    activeEventId === 9
      ? LA_FIESTA_5_DETAIL_BACKGROUND_IMAGE
      : activeEventId === 1
      ? LA_FIESTA_DETAIL_BACKGROUND_IMAGE
      : eventBase?.image || LA_FIESTA_DETAIL_BACKGROUND_IMAGE
  );

  if (!eventDetail || !eventBase) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2>Event not found</h2>
        <button className="nav-cta" onClick={() => navigateTo('events')} style={{ marginTop: '20px' }}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <main
      className="event-detail-page"
      style={{ '--event-detail-bg': `url("${detailBackgroundImage}")` }}
    >
      {/* Hero Section */}
      <div className="about-hero" style={{ minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
        <div className="about-hero-content" style={{ zIndex: 1, textAlign: 'left', maxWidth: '1000px', padding: '0 40px' }}>
          <button 
            onClick={() => navigateTo('events')}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              color: '#fff', 
              padding: '8px 16px', 
              borderRadius: '30px', 
              marginBottom: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Events
          </button>
          <span className="page-label" style={{ color: 'var(--green-soft)', fontWeight: '600' }}>
            {eventBase.category} • {eventBase.date}
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1', marginBottom: '16px' }}>{eventDetail.title}</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px' }}>{eventDetail.subtitle}</p>
        </div>
      </div>

      {/* Content Section */}
      <section style={{ padding: '80px 0', background: 'transparent' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px', padding: '0 20px' }}>
          
          <div className="event-main-content">
            <div className="content-card event-detail-surface" style={{ padding: '40px', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: '#fff' }}>About the Event</h2>
              <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                {eventDetail.about}
              </div>

              {eventDetail.highlights && eventDetail.highlights.map((highlight, idx) => (
                <div key={idx} style={{ marginTop: '48px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--green-soft)' }}>{highlight.title}</h3>
                  <p style={{ color: '#ccc', lineHeight: '1.8' }}>{highlight.content}</p>
                </div>
              ))}

              {eventDetail.purpose && (
                <div style={{ marginTop: '48px', padding: '32px', background: 'rgba(8, 18, 14, 0.6)', borderRadius: '16px', borderLeft: '4px solid var(--green-soft)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#fff' }}>Deeper Purpose</h3>
                  <p style={{ color: '#ccc', lineHeight: '1.8', fontStyle: 'italic' }}>{eventDetail.purpose}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '60px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '32px', color: '#fff' }}>Impact & Outcome</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {eventDetail.impact.map((item, idx) => (
                  <div key={idx} className="event-detail-surface" style={{ padding: '24px', borderRadius: '16px', display: 'flex', gap: '16px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: 'var(--green-soft)', marginTop: '4px' }}></i>
                    <p style={{ color: '#ccc', fontSize: '0.95rem' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="event-sidebar">
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="event-detail-surface" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Quick Details</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {Object.entries(eventDetail.details).map(([key, value]) => (
                    <li key={key} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', letterSpacing: '1px', marginBottom: '4px' }}>{key}</span>
                      <span style={{ color: '#fff', fontWeight: '500' }}>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="event-detail-surface" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
                <i className="fa-solid fa-heart-pulse" style={{ fontSize: '2.5rem', color: 'var(--green-soft)', marginBottom: '16px' }}></i>
                <h4 style={{ marginBottom: '12px' }}>Want to be part of this?</h4>
                <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '24px' }}>Join our community and help us make a difference in the next event.</p>
                <button 
                  className="nav-cta" 
                  onClick={() => navigateTo('joinus')}
                  style={{ width: '100%', padding: '14px' }}
                >
                  Join Youth United
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

    </main>
  );
}
