import React from 'react';
import navLinks from '../../../data/navigation';
import { usePage } from '../../../context/PageContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { navigateTo } = usePage();

  const handleNav = (id) => {
    navigateTo(id);
    onClose();
  };

  return (
    <>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} id="hamburger" onClick={onClose}>
        <span></span><span></span><span></span>
      </div>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} id="mobileMenu">
        {navLinks.map(link => (
          <a key={link.id} href="/" onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
            {link.label}{link.cta ? ' →' : ''}
          </a>
        ))}
      </div>
    </>
  );
}
