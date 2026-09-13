import React from 'react';

export default function ValueChip({ icon, label }) {
  return (
    <div className="value-chip">
      <i className={icon} style={{ fontSize: '0.85rem' }}></i>
      {label}
    </div>
  );
}
