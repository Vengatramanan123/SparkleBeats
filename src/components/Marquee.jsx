import React from 'react';
import './Marquee.css';

export default function Marquee({
  items = [],
  speed = 'normal', // 'slow' | 'normal' | 'fast'
  reverse = false,
  pauseOnHover = true,
  className = '',
  bgColor = 'var(--color-bg-tertiary)',
  textColor = 'var(--color-text-primary)'
}) {
  // Duplicate items twice to ensure unbroken loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div 
      className={`marquee-strip marquee-strip--${speed} ${reverse ? 'marquee-strip--reverse' : ''} ${pauseOnHover ? 'marquee-strip--hover-pause' : ''} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
      role="region"
      aria-label="Announcement ticker"
    >
      <div className="marquee-strip__track">
        {displayItems.map((item, index) => (
          <div key={index} className="marquee-strip__item">
            <span className="marquee-strip__text">{item}</span>
            <span className="marquee-strip__separator" aria-hidden="true">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
