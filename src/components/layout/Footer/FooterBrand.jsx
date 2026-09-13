import React from 'react';
import { LOGO_ALT, LOGO_SRC } from '../../../constants/branding';

const INSTAGRAM_URL =
  'https://www.instagram.com/yu.tiet?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const LINKEDIN_URL = 'https://www.linkedin.com/company/youth-united-patiala-chapter/';

export default function FooterBrand() {
  return (
    <div className="footer-brand">
      <div className="footer-logo-row">
        <img className="footer-logo-img" src={LOGO_SRC} alt={LOGO_ALT} width={52} height={52} decoding="async" />
        <div className="footer-logo-text">Youth United</div>
      </div>
      <p>Empowering students at Thapar Institute to create meaningful change through community service, education, and social innovation since 2017.</p>
      <div className="footer-socials">
        <a
          className="footer-social footer-social--instagram"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram (opens in a new tab)"
        >
          <i className="fa-brands fa-instagram" aria-hidden="true"></i>
        </a>
        <a className="footer-social footer-social--linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
          <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}
