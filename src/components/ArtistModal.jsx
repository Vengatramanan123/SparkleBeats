import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoGraphic from './PhotoGraphic';
import Button from './Button';
import './ArtistModal.css';

export default function ArtistModal({ artist, onClose, isPlaying, onTogglePlay }) {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!artist) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard listener for Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Focus close button on mount for a11y
    const timer = setTimeout(() => {
      const closeBtn = dialogRef.current?.querySelector('.artist-modal__close');
      closeBtn?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [artist, onClose]);

  if (!artist) return null;

  const { id, name, role, badge, badgeType, genres, fullBio, topTracks, upcomingDates, socials } = artist;

  const handleBookClick = () => {
    onClose();
    navigate(`/contact?artist=${encodeURIComponent(name)}`);
  };

  return (
    <div 
      className="artist-modal-backdrop" 
      onClick={onClose}
      role="presentation"
    >
      <div 
        ref={dialogRef}
        className="artist-modal" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="artist-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="artist-modal__close" 
          onClick={onClose}
          aria-label="Close artist profile dialog"
        >
          ✕
        </button>

        {/* Modal Header Grid */}
        <div className="artist-modal__grid">
          {/* Left Column: Media + Quick Stats */}
          <div className="artist-modal__media-col">
             <div className="artist-modal__image-wrapper">
               {artist.imageUrl ? (
                 <img
                   src={artist.imageUrl}
                   alt={artist.name}
                   className="artist-modal__image"
                 />
               ) : (
                 <PhotoGraphic 
                   type={`artist-${id}`} 
                   title={name} 
                   accent={badgeType === 'lime' ? 'var(--color-accent-lime)' : 'var(--color-accent-purple)'} 
                   aspectRatio="1/1" 
                 />
               )}
              {badge && (
                <span className={`sticker-badge sticker-${badgeType || 'lime'} artist-modal__badge`}>
                  {badge}
                </span>
              )}
            </div>

            <div className="artist-modal__actions">
              <Button 
                variant="lime" 
                size="md" 
                onClick={handleBookClick}
                className="artist-modal__book-cta"
                arrow
              >
                Book {name}
              </Button>
            </div>

            {/* Social Links */}
            <div className="artist-modal__socials">
              <span className="artist-modal__socials-label">Socials:</span>
              {socials?.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              )}
              {socials?.soundcloud && (
                <a href={socials.soundcloud} target="_blank" rel="noopener noreferrer">SoundCloud</a>
              )}
              {socials?.spotify && (
                <a href={socials.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
              )}
              {socials?.residentAdvisor && (
                <a href={socials.residentAdvisor} target="_blank" rel="noopener noreferrer">RA Profile</a>
              )}
            </div>
          </div>

          {/* Right Column: Bio, Top Tracks, Tour Dates */}
          <div className="artist-modal__content-col">
            <div className="artist-modal__meta">
              <span className="artist-modal__role">// {role}</span>
              <div className="artist-modal__genres">
                {genres.map((g, idx) => (
                  <span key={idx} className="genre-pill">{g}</span>
                ))}
              </div>
            </div>

            <h2 id="artist-modal-title" className="artist-modal__name">{name}</h2>

            <div className="artist-modal__bio">
              <p>{fullBio}</p>
            </div>

            {/* Top Tracks */}
            {topTracks && topTracks.length > 0 && (
              <div className="artist-modal__section">
                <h4 className="artist-modal__section-heading">
                  <span>★</span> Top Releases & Dubplates
                </h4>
                <div className="artist-modal__tracks-list">
                  {topTracks.map((track, idx) => (
                    <div key={idx} className="artist-track-item">
                      <div className="artist-track-item__info">
                        <span className="artist-track-item__index">0{idx + 1}</span>
                        <div>
                          <p className="artist-track-item__title">{track.title}</p>
                          <span className="artist-track-item__plays">{track.plays} streams • {track.year}</span>
                        </div>
                      </div>
                      <span className="artist-track-item__dur">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Dates */}
            {upcomingDates && upcomingDates.length > 0 && (
              <div className="artist-modal__section">
                <h4 className="artist-modal__section-heading">
                  <span>⚡</span> Upcoming Tour Dates
                </h4>
                <div className="artist-modal__dates-list">
                  {upcomingDates.map((gig, idx) => (
                    <div key={idx} className="artist-tour-item">
                      <div className="artist-tour-item__date">{gig.date}</div>
                      <div className="artist-tour-item__venue">
                        <strong>{gig.venue}</strong>
                        <span>{gig.city}, {gig.country}</span>
                      </div>
                      <span className="sticker-badge sticker-dark" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                        CONFIRMED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
