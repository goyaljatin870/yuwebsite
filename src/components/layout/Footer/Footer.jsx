import React from 'react';
import FooterBrand from './FooterBrand';
import navLinks from '../../../data/navigation';
import { techMembers } from '../../../data/members';
import { usePage } from '../../../context/PageContext';
import './Footer.css';

export default function Footer() {
  const { navigateTo } = usePage();
  const handleNav = (id) => {
    navigateTo(id);
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <FooterBrand />
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={link.path} onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:Yu@thapar.edu">Yu@thapar.edu</a></li>
              <li><a href="tel:+917082169225">+91 70821 69225</a></li>
              <li>
                <a
                  href="https://maps.app.goo.gl/iZbCEhnj5tNZjbNb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open location on Google Maps"
                >
                  Thapar Institute of Engineering and Technology, Patiala, Punjab, 147004
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-developers">
          <h4>Website Developer</h4>
          <div className="footer-developers-list">
            {techMembers.map(dev => (
              <div key={dev.id} className="footer-developer">
                <div>
                  <p className="footer-developer-name">{dev.name}</p>
                  <p className="footer-developer-role">{dev.role}</p>
                </div>
                <div className="footer-developer-socials">
                  {dev.socials?.linkedin && dev.socials.linkedin !== '#' && (
                    <a href={dev.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  )}
                  {dev.socials?.instagram && dev.socials.instagram !== '#' && (
                    <a href={dev.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>2026 <span>Youth United Patiala Chapter</span>. All rights reserved.</div>
          <div>Made with <span>♥</span> at Thapar Institute</div>
        </div>
      </div>
    </footer>
  );
}
