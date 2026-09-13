import React from 'react';
import testimonials from '../../../data/testimonials';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <div className="testimonials-section">
      <div className="testimonials-inner">
        <div className="section-label reveal" style={{ color: 'var(--green-soft)' }}>Voices</div>
        <h2 className="section-title reveal delay-1" style={{ color: '#fff' }}>
          What Our <em style={{ color: 'var(--green-soft)' }}>Members</em> Say
        </h2>
        <p className="section-subtitle reveal delay-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Real stories from students who have grown through service.
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`testimonial-card reveal delay-${i+1}`}>
              <div className="star-row">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <i key={j} className="fa-solid fa-star"></i>
                ))}
              </div>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
