import React from 'react';

export default function ArtworkGraphic({ release, className = '', size = 'medium' }) {
  const { catalogNumber, title, artist, year, coverArt } = release;
  const accent = coverArt?.accentColor || '#c6ff3d';
  const bg = coverArt?.bgGradient || 'linear-gradient(135deg, #1b0d3a 0%, #0d0b12 100%)';

  return (
    <div 
      className={`artwork-container ${className}`}
      style={{
        background: bg,
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem',
        userSelect: 'none'
      }}
      aria-hidden="true"
    >
      {/* Top Header metadata */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          letterSpacing: '0.1em',
          color: accent 
        }}>
          {catalogNumber}
        </span>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: 600, 
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.05em' 
        }}>
          [ {year} ]
        </span>
      </div>

      {/* Center abstract generative vector composition */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
      }}>
        <svg width="78%" height="78%" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="92" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="76" stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="54" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="100" cy="100" r="32" stroke={accent} strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="14" fill="#0d0b12" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <circle cx="100" cy="100" r="4" fill={accent} />
          
          {/* Dynamic sound wave lines across center */}
          <path d="M 20 100 Q 50 65, 80 100 T 140 100 T 180 100" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M 25 100 Q 60 135, 100 100 T 160 100" stroke="#8b5cf6" strokeWidth="1.5" fill="none" opacity="0.6" />
          <line x1="100" y1="8" x2="100" y2="28" stroke={accent} strokeWidth="2" />
          <line x1="100" y1="172" x2="100" y2="192" stroke={accent} strokeWidth="2" />
          <line x1="8" y1="100" x2="28" y2="100" stroke={accent} strokeWidth="2" />
          <line x1="172" y1="100" x2="192" y2="100" stroke={accent} strokeWidth="2" />
        </svg>
      </div>

      {/* Bottom Typography */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
        <p style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: size === 'large' ? '1.5rem' : '1.1rem', 
          fontWeight: 800, 
          lineHeight: 1.1,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          {title}
        </p>
        <p style={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: 'rgba(255, 255, 255, 0.7)',
          marginTop: '0.2rem',
          letterSpacing: '0.04em'
        }}>
          {artist}
        </p>
      </div>
    </div>
  );
}
