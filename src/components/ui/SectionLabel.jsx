import React from 'react';

export default function SectionLabel({ children, light = false }) {
  return (
    <div className="section-label" style={light ? { color: 'var(--green-soft)' } : {}}>
      {children}
    </div>
  );
}
