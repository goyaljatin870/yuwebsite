import React from 'react';
import { LOGO_SRC } from '../../../constants/branding';

export default function NavLogo({ onClick }) {
  return (
    <div className="nav-logo" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="nav-logo-mark">
        <img src={LOGO_SRC} alt="" width={40} height={40} decoding="async" />
      </div>
      <div className="nav-logo-text">
        Youth United
      </div>
    </div>
  );
}
