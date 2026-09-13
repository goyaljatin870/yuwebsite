import React, { useState } from 'react';
import NavLogo from './NavLogo';
import MobileMenu from './MobileMenu';
import navLinks from '../../../data/navigation';
import { usePage } from '../../../context/PageContext';
import { useNavbarScroll } from '../../../hooks/useNavbarScroll';
import './Navbar.css';

export default function Navbar() {
  const { currentPage, navigateTo, goBack, canGoBack } = usePage();
  const scrolled = useNavbarScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    navigateTo(id);
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {canGoBack && (
            <button 
              onClick={goBack}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                transition: 'all 0.2s ease',
              }}
              title="Go Back"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          )}
          <NavLogo onClick={() => handleNav('home')} />
        </div>
        <div className="nav-links">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.path}
              className={`${currentPage === link.id ? 'active' : ''} ${link.cta ? 'nav-cta' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
            >
              {link.cta ? <><i className="fa-solid fa-arrow-right"></i> {link.label}</> : link.label}
            </a>
          ))}
        </div>
        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(v => !v)} />
      </nav>
    </>
  );
}
