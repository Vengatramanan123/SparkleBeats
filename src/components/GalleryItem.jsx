import React from 'react';
import PhotoGraphic from './PhotoGraphic';
import './GalleryItem.css';

export default function GalleryItem({ item, onClick }) {
  const { category, title, location, date, aspectRatio, caption, accent, type } = item;

  return (
    <div 
      className="gallery-card"
      onClick={() => onClick && onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(item);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View photo: ${title} (${category})`}
    >
      {/* Media Wrapper */}
      <div className="gallery-card__media-wrapper">
        {item.imageUrl ? (
          <>
            <img
              src={item.imageUrl}
              alt={item.caption || item.title}
              className="gallery-card__image"
            />
            {item.isReel && (
              <span className="gallery-card__reel-badge sticker-badge sticker-lime">
                REEL
              </span>
            )}
          </>
        ) : (
          <PhotoGraphic 
            type={type} 
            title={title} 
            accent={accent} 
            aspectRatio={aspectRatio} 
            className="gallery-card__graphic" 
          />
        )}

        {/* Category Sticker */}
        {category !== 'Instagram' && (
          <span className={`sticker-badge sticker-${category === 'Live' ? 'lime' : category === 'Studio' ? 'purple' : 'dark'} gallery-card__badge`}>
            {category}
          </span>
        )}

        {/* Hover Caption Overlay */}
        <div className="gallery-card__overlay">
          <div className="gallery-card__overlay-meta">
            <span>{location}</span>
            <span>{date}</span>
          </div>
          <h3 className="gallery-card__title">{title}</h3>
          <p className="gallery-card__caption">{caption}</p>
          <span className="gallery-card__expand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
