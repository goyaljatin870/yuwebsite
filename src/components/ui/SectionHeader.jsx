import React from 'react';
import SectionLabel from './SectionLabel';

export default function SectionHeader({ label, title, subtitle, align = 'left', light = false, className = '' }) {
  return (
    <div className={className} style={{ textAlign: align }}>
      {label && <SectionLabel light={light}>{label}</SectionLabel>}
      <h2
        className="section-title reveal"
        style={light ? { color: '#fff' } : {}}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className="section-subtitle"
          style={light ? { color: 'rgba(255,255,255,0.6)', maxWidth: align === 'center' ? '560px' : undefined, margin: align === 'center' ? '12px auto 0' : undefined } : {}}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
