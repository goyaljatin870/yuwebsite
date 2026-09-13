import React, { useState, useEffect } from 'react';
import { LOGO_ALT, LOGO_SRC } from '../../constants/branding';
import './Loader.css';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-brand">
        <img className="loader-logo-img" src={LOGO_SRC} alt={LOGO_ALT} width={64} height={64} decoding="async" />
        <div className="loader-logo">Youth United</div>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar"></div>
      </div>
    </div>
  );
}
