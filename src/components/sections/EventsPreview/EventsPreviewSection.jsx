import React from 'react';
import { usePage } from '../../../context/PageContext';
import RemoteImage from '../../ui/RemoteImage';
import { getAssetUrl } from '../../../utils/assetUrl';
import './EventsPreviewSection.css';

const PREVIEW_EVENT = {
  id: 13,
  category: 'UPCOMING CELEBRATION',
  dateBadge: 'Expected: First Week of November 2026',
  title: 'DAAN UTSAV',
  description:
    'A nationwide festival of giving celebrated by Youth United through community donation drives, volunteer action, and spreading kindness to underprivileged families across Patiala.',
};

const PREVIEW_BANNER_PATH = '/images/events/utsav-e-solace-preview.png';

export default function EventsPreviewSection() {
  const { navigateTo } = usePage();
  const isVideoBanner = /\.(mp4|webm|ogg)$/i.test(PREVIEW_BANNER_PATH);

  return (
    <div className="events-section">
      <div className="events-inner">
        <div className="events-header">
          <div>
            <div className="section-label reveal">Our Mission</div>
            <h2 className="section-title reveal delay-1">Upcoming Celebrations</h2>
          </div>
        </div>
        <div
          className="event-banner reveal delay-3"
          onClick={() => navigateTo('event-detail', 13)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              navigateTo('event-detail', 13);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="event-banner-image-container">
            {PREVIEW_BANNER_PATH ? (
              isVideoBanner ? (
                <video
                  className="event-banner-video"
                  src={getAssetUrl(PREVIEW_BANNER_PATH)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <RemoteImage
                  src={PREVIEW_BANNER_PATH}
                  alt="Daan Utsav — Festival of Giving"
                  className="event-banner-photo"
                  width={1200}
                  height={600}
                />
              )
            ) : (
              <div className="event-banner-img-ph">
                <i className="fa-solid fa-gift"></i>
                <span>{PREVIEW_EVENT.category}</span>
              </div>
            )}
          </div>
          <div className="event-banner-overlay"></div>
          <div className="event-banner-layout">
            <div className="event-banner-body">
              <div className="event-text-box">
                <div className="event-category">
                  {PREVIEW_EVENT.category} • {PREVIEW_EVENT.dateBadge}
                </div>
                <h3>{PREVIEW_EVENT.title}</h3>
                <p>{PREVIEW_EVENT.description}</p>
              </div>
              <button
                className="event-banner-cta"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('event-detail', 13);
                }}
              >
                Learn More
              </button>
            </div>
            <div className="event-sidebar-anchor" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
