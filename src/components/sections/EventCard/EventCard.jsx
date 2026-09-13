import React from 'react';
import RemoteImage from '../../ui/RemoteImage';
import { usePage } from '../../../context/PageContext';
import './EventCard.css';

export default function EventCard({ event, className = '' }) {
  const { navigateTo } = usePage();
  const hasPhoto = Boolean(event.image);

  return (
    <div
      className={`event-card ${className}`.trim()}
      onClick={() => navigateTo('event-detail', event.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="event-card-img">
        {hasPhoto ? (
          <RemoteImage
            className={`event-card-photo ${event.imageFit === 'contain' ? 'event-card-photo--contain' : ''} ${event.imagePosition === 'lower-middle' ? 'event-card-photo--lower-middle' : ''}`.trim()}
            src={event.image}
            alt={event.title}
            width={800}
            height={440}
            loading="lazy"
          />
        ) : (
          <div className="event-card-img-ph">
            <i className={event.icon}></i>
            <span>{event.category}</span>
          </div>
        )}
      </div>
      <div className="event-card-body">
        <div className="event-category">{event.category}</div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <span><i className="fa-solid fa-location-dot"></i> {event.location}</span>
          <span>
            <i className="fa-solid fa-users"></i>{' '}
            {event.attendeesNote != null && String(event.attendeesNote).trim() !== ''
              ? event.attendeesNote
              : `${event.attendees ?? 0}+ attended`}
          </span>
        </div>
      </div>
    </div>
  );
}
