import React from 'react';
import ArtworkGraphic from './ArtworkGraphic';
import './ReleaseCard.css';

export default function ReleaseCard({
  release,
  isPlaying = false,
  onTogglePlay,
  tilt = 'none' // 'left' | 'right' | 'none'
}) {
  const { id, title, artist, year, genre, bpm, badge, badgeType, links, catalogNumber } = release;

  return (
    <article className={`release-card ${tilt === 'left' ? 'tilt-card-left' : tilt === 'right' ? 'tilt-card-right' : ''}`}>
      {/* Artwork with Badge & Overlay Play Button */}
      <div className="release-card__media">
        <ArtworkGraphic release={release} />

        {/* Sticker Badge */}
        {badge && (
          <span className={`sticker-badge sticker-${badgeType || 'lime'} release-card__badge`}>
            {badge}
          </span>
        )}

        {/* Play/Pause Button overlay */}
        <button
          type="button"
          className={`release-card__play-trigger ${isPlaying ? 'release-card__play-trigger--active' : ''}`}
          onClick={() => onTogglePlay && onTogglePlay(id)}
          aria-label={isPlaying ? `Pause preview for ${title}` : `Play preview for ${title}`}
          title={isPlaying ? "Pause track" : "Listen to preview"}
        >
          {isPlaying ? (
            <div className="eq-bars">
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>

      {/* Release Details */}
      <div className="release-card__content">
        <div className="release-card__meta">
          <span className="release-card__cat">{catalogNumber}</span>
          <span className="release-card__year">{year}</span>
          {bpm && <span className="release-card__bpm">{bpm}</span>}
        </div>

        <h3 className="release-card__title">{title}</h3>
        <p className="release-card__artist">{artist}</p>
        
        <p className="release-card__genre-tag">
          <span>{genre}</span>
        </p>

        {/* Streaming Platform Outbound Links */}
        <div className="release-card__links" aria-label={`Listen to ${title} on streaming platforms`}>
          {links?.spotify && (
            <a 
              href={links.spotify} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="release-pill-link"
              title="Open on Spotify"
            >
              Spotify
            </a>
          )}
          {links?.soundcloud && (
            <a 
              href={links.soundcloud} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="release-pill-link"
              title="Open on SoundCloud"
            >
              SoundCloud
            </a>
          )}
          {links?.appleMusic && (
            <a 
              href={links.appleMusic} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="release-pill-link"
              title="Open on Apple Music"
            >
              Apple
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
