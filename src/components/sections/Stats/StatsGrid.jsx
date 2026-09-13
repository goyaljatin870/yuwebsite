import React from 'react';
import stats from '../../../data/stats';
import { useCounterAnimation } from '../../../hooks/useCounterAnimation';
import './StatsGrid.css';

function StatItem({ value, label }) {
  const ref = useCounterAnimation(value);
  return (
    <div className="stat-item">
      <div className="stat-number" ref={ref} data-target={value}>0+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsGrid() {
  return (
    <div className="stats-section">
      <div className="stats-grid">
        {stats.map(s => <StatItem key={s.id} value={s.value} label={s.label} />)}
      </div>
    </div>
  );
}
