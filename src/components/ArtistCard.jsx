import React from 'react';
import PhotoGraphic from './PhotoGraphic';
import Button from './Button';
import './ArtistCard.css';

export default function ArtistCard({
  artist,
  onBookArtist,
  tilt = 'none'
}) {
  const { id, name, role, badge, badgeType, genres, shortBio, socials, imageUrl } = artist;

  return (
    <article 
      className={`artist-card ${tilt === 'left' ? 'tilt-card-left' : tilt === 'right' ? 'tilt-card-right' : ''}`}
    >
      {/* Media Photo Container */}
      <div className="artist-card__media">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="artist-card__image"
          />
        ) : (
          <PhotoGraphic 
            type={`artist-${id}`} 
            title={name} 
            accent={badgeType === 'lime' ? 'var(--color-accent-lime)' : 'var(--color-accent-purple)'} 
            aspectRatio="4/5" 
          />
        )}

        {/* Badge */}
        {badge && (
          <span className={`sticker-badge sticker-${badgeType || 'lime'} artist-card__badge`}>
            {badge}
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="artist-card__hover-overlay">
          <Button 
            variant="lime" 
            size="sm"
            onClick={() => {
              if (onBookArtist) {
                onBookArtist(artist);
              }
            }}
          >
            Book {name}
          </Button>
          <span className="artist-card__details-hint">
            Get in touch to book
          </span>
        </div>
      </div>

      {/* Artist Info */}
      <div className="artist-card__content">
        <div className="artist-card__role">// {role}</div>
        <h3 className="artist-card__name">{name}</h3>
        
        {/* Genre Tags */}
        <div className="artist-card__genres">
          {genres.map((genre, idx) => (
            <span key={idx} className="genre-pill">{genre}</span>
          ))}
        </div>

        <p className="artist-card__bio">{shortBio}</p>

        {/* Card Footer with Socials */}
        <div className="artist-card__footer">
          <div className="artist-card__socials">
            {socials?.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name} Instagram`}>
                IG
              </a>
            )}
            {socials?.soundcloud && (
              <a href={socials.soundcloud} target="_blank" rel="noopener noreferrer" aria-label={`${name} SoundCloud`}>
                SC
              </a>
            )}
            {socials?.residentAdvisor && (
              <a href={socials.residentAdvisor} target="_blank" rel="noopener noreferrer" aria-label={`${name} Resident Advisor`}>
                RA
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
