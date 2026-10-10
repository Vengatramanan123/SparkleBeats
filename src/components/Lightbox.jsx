import React, { useEffect } from 'react';
import PhotoGraphic from './PhotoGraphic';
import './Lightbox.css';

export default function Lightbox({
  items = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrev
}) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    // Lock body scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  if (!currentItem) return null;

  return (
    <div 
      className="lightbox-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label={`Photo viewer: ${currentItem.title}`}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="lightbox-header">
          <div className="lightbox-counter">
            <span className="lightbox-counter__current">0{currentIndex + 1}</span>
            <span className="lightbox-counter__divider">/</span>
            <span className="lightbox-counter__total">0{items.length}</span>
          </div>

          {currentItem.category !== 'Instagram' && (
            <span className={`sticker-badge sticker-${currentItem.category === 'Live' ? 'lime' : currentItem.category === 'Studio' ? 'purple' : 'dark'}`}>
              {currentItem.category}
            </span>
          )}

          <button 
            type="button" 
            className="lightbox-btn lightbox-btn--close" 
            onClick={onClose}
            aria-label="Close image viewer (Press Escape)"
          >
            ✕
          </button>
        </div>

        {/* Central Display Area with Arrow Controls */}
        <div className="lightbox-stage">
          <button 
            type="button" 
            className="lightbox-nav-btn lightbox-nav-btn--prev" 
            onClick={onPrev}
            aria-label="Previous photo (Left arrow)"
          >
            ‹
          </button>

          <div className="lightbox-image-container">
            {currentItem.embedUrl ? (
              <div className="lightbox-embed-wrapper">
                <iframe
                  src={currentItem.embedUrl}
                  title={currentItem.title || "Instagram post"}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : currentItem.imageUrl ? (
              <img
                src={currentItem.imageUrl}
                alt={currentItem.caption || currentItem.title}
                className="lightbox-image"
              />
            ) : (
              <PhotoGraphic 
                type={currentItem.type} 
                title={currentItem.title} 
                accent={currentItem.accent} 
                aspectRatio="16/9"
                className="lightbox-graphic"
              />
            )}
          </div>

          <button 
            type="button" 
            className="lightbox-nav-btn lightbox-nav-btn--next" 
            onClick={onNext}
            aria-label="Next photo (Right arrow)"
          >
            ›
          </button>
        </div>

        {/* Bottom Metadata & Caption Bar */}
        <div className="lightbox-footer">
          <div className="lightbox-footer__meta">
            <h3 className="lightbox-footer__title">{currentItem.title}</h3>
            <span className="lightbox-footer__location">
              {currentItem.location} • {currentItem.date}
            </span>
          </div>
          <p className="lightbox-footer__caption">{currentItem.caption}</p>
        </div>
      </div>
    </div>
  );
}
