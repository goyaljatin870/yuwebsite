import React, { useState, useEffect, useCallback } from 'react';
import { getAssetUrl, getRawGithubUrl } from '../../../utils/assetUrl';
import './MemberCard.css';

export default function MemberCard({ member }) {
  const { name, role, department, year, initials, bio, faculty, photo, photoPosition, socials } = member;
  const [photoSrc, setPhotoSrc] = useState(() => getAssetUrl(photo));
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(photo) && !photoFailed;
  const resolvedPhotoPosition = photoPosition || 'center top';

  useEffect(() => {
    setPhotoSrc(getAssetUrl(photo));
    setPhotoFailed(false);
  }, [photo]);

  const handlePhotoError = useCallback(() => {
    const rawUrl = getRawGithubUrl(photo);
    if (photoSrc !== rawUrl && rawUrl) {
      setPhotoSrc(rawUrl);
    } else {
      setPhotoFailed(true);
    }
  }, [photo, photoSrc]);

  const isRealLink = (url) => typeof url === 'string' && url.trim() !== '' && url !== '#';
  const socialItems = [
    { key: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: socials?.linkedin },
    { key: 'instagram', label: 'Instagram', icon: 'fa-brands fa-instagram', url: socials?.instagram },
  ].filter(({ url }) => isRealLink(url));

  return (
    <div className={`member-card reveal${faculty ? ' member-card--faculty' : ''}`}>
      <div className="member-card-inner">
        <div className="member-card-face member-card-front">
          <div className={`member-avatar${showPhoto ? ' member-avatar--photo' : ''}`}>
            {showPhoto ? (
              <img
                src={photoSrc}
                alt={name}
                className="member-photo"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: resolvedPhotoPosition }}
                onError={handlePhotoError}
              />
            ) : (
              initials
            )}
          </div>

          <div className="member-info">
            <h3 className="member-name">{name}</h3>
            <p className="member-role">{role}</p>
            <div className="member-meta">
              {faculty ? (
                <>
                  <span><i className="fa-solid fa-building-columns"></i> {department}</span>
                  <span><i className="fa-solid fa-chalkboard-user"></i> Thapar Institute</span>
                </>
              ) : (
                <span><i className="fa-solid fa-graduation-cap"></i> {year}</span>
              )}
            </div>
            {bio && <p className="member-bio">{bio}</p>}
          </div>
        </div>

        <div className="member-card-face member-card-back" aria-label={`Social links for ${name}`}>
          <h4 className="member-back-name">{name}</h4>
          <p className="member-back-role">{role}</p>
          <div className="member-socials">
            {socialItems.length > 0 ? (
              socialItems.map(({ key, label, icon, url }) => (
                <a
                  key={key}
                  className="member-social-link"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${label}`}
                >
                  <i className={icon}></i>
                  <span>{label}</span>
                </a>
              ))
            ) : (
              <span className="member-social-link is-disabled" style={{ opacity: 0.75, borderStyle: 'dashed' }}>
                <i className="fa-solid fa-hand-holding-heart" style={{ color: 'var(--green-deep)' }}></i>
                <span>Youth United</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
