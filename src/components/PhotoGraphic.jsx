import React from 'react';

export default function PhotoGraphic({ 
  type = 'dj', 
  title = '', 
  accent = '#c6ff3d', 
  aspectRatio = '1 / 1', 
  className = '',
  overlayLabel = null 
}) {
  return (
    <div 
      className={`photo-graphic-container ${className}`}
      style={{
        width: '100%',
        aspectRatio: aspectRatio,
        position: 'relative',
        overflow: 'hidden',
        background: '#120e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'inherit'
      }}
    >
      {/* Background Graphic SVG based on scene type */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400" 
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id={`glow-${type}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0d0b12" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1430" />
            <stop offset="100%" stopColor="#0d0b12" />
          </linearGradient>
        </defs>

        {/* Base Background */}
        <rect width="400" height="400" fill={`url(#grad-${type})`} />
        <rect width="400" height="400" fill={`url(#glow-${type})`} />

        {/* Laser / Strobe / Crowd Patterns */}
        {type.includes('laser') || type.includes('strobe') ? (
          <g opacity="0.85">
            <line x1="200" y1="0" x2="40" y2="400" stroke={accent} strokeWidth="2.5" opacity="0.6" />
            <line x1="200" y1="0" x2="100" y2="400" stroke="#8b5cf6" strokeWidth="2" opacity="0.7" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="#ffffff" strokeWidth="3" opacity="0.5" />
            <line x1="200" y1="0" x2="300" y2="400" stroke="#8b5cf6" strokeWidth="2" opacity="0.7" />
            <line x1="200" y1="0" x2="360" y2="400" stroke={accent} strokeWidth="2.5" opacity="0.6" />
            {/* Crowd silhouette dots at bottom */}
            <path d="M 0 350 Q 50 320, 100 350 T 200 340 T 300 355 T 400 340 L 400 400 L 0 400 Z" fill="#08070d" />
            <circle cx="90" cy="330" r="14" fill="#08070d" />
            <circle cx="170" cy="320" r="16" fill="#08070d" />
            <circle cx="230" cy="325" r="15" fill="#08070d" />
            <circle cx="310" cy="335" r="14" fill="#08070d" />
          </g>
        ) : type.includes('synth') || type.includes('drummachine') || type.includes('mixingdesk') ? (
          <g opacity="0.75">
            {/* Eurorack cables and knobs */}
            <rect x="50" y="60" width="300" height="280" rx="8" fill="#161222" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(255,255,255,0.08)" />
            <line x1="50" y1="240" x2="350" y2="240" stroke="rgba(255,255,255,0.08)" />
            {/* Jack sockets & LEDs */}
            <circle cx="90" cy="100" r="8" fill="#241b36" stroke={accent} strokeWidth="1.5" />
            <circle cx="140" cy="100" r="8" fill="#241b36" stroke="#8b5cf6" strokeWidth="1.5" />
            <circle cx="190" cy="100" r="8" fill="#241b36" stroke={accent} strokeWidth="1.5" />
            <circle cx="240" cy="100" r="8" fill="#241b36" stroke="#ffffff" strokeWidth="1" />
            <circle cx="290" cy="100" r="8" fill="#241b36" stroke={accent} strokeWidth="1.5" />
            
            <circle cx="90" cy="190" r="8" fill="#241b36" stroke="#8b5cf6" strokeWidth="1.5" />
            <circle cx="140" cy="190" r="8" fill="#241b36" stroke={accent} strokeWidth="1.5" />
            <circle cx="190" cy="190" r="8" fill="#241b36" stroke="#ffffff" strokeWidth="1" />
            <circle cx="240" cy="190" r="8" fill="#241b36" stroke={accent} strokeWidth="1.5" />
            <circle cx="290" cy="190" r="8" fill="#241b36" stroke="#8b5cf6" strokeWidth="1.5" />
            
            {/* Patch Cables draped */}
            <path d="M 90 100 C 90 160, 240 130, 240 190" stroke={accent} strokeWidth="3" fill="none" opacity="0.85" />
            <path d="M 190 100 C 190 220, 140 140, 140 190" stroke="#8b5cf6" strokeWidth="3" fill="none" opacity="0.85" />
            <path d="M 290 100 C 330 220, 120 260, 90 280" stroke="#f5f4f8" strokeWidth="2.5" fill="none" opacity="0.6" />
          </g>
        ) : type.includes('vinyl') || type.includes('tape') ? (
          <g opacity="0.8">
            {/* Turntable platter or reel */}
            <circle cx="200" cy="200" r="140" fill="#151120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <circle cx="200" cy="200" r="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="200" cy="200" r="95" stroke={accent} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
            <circle cx="200" cy="200" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="200" cy="200" r="48" fill={accent} opacity="0.9" />
            <circle cx="200" cy="200" r="8" fill="#0d0b12" />
            {/* Tonearm silhouette */}
            <line x1="330" y1="50" x2="250" y2="180" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
            <circle cx="330" cy="50" r="14" fill="#2d2244" stroke="#8b5cf6" strokeWidth="2" />
          </g>
        ) : (
          /* Default DJ Booth / Artist Silhouette */
          <g opacity="0.8">
            {/* Grid ceiling / lighting rig */}
            <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.08)" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" />
            <circle cx="100" cy="50" r="5" fill={accent} />
            <circle cx="200" cy="50" r="5" fill="#8b5cf6" />
            <circle cx="300" cy="50" r="5" fill={accent} />
            {/* Central DJ silhouette */}
            <ellipse cx="200" cy="210" rx="42" ry="48" fill="#0a0810" />
            {/* Headphones */}
            <path d="M 152 200 A 48 48 0 0 1 248 200" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="152" cy="205" rx="9" ry="15" fill={accent} />
            <ellipse cx="248" cy="205" rx="9" ry="15" fill={accent} />
            {/* Torso & mixer */}
            <path d="M 140 250 L 110 370 L 290 370 L 260 250 Z" fill="#0a0810" />
            <rect x="80" y="340" width="240" height="60" rx="4" fill="#1b152b" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            {/* Mixer LEDs */}
            <line x1="185" y1="355" x2="185" y2="385" stroke={accent} strokeWidth="2.5" />
            <line x1="215" y1="355" x2="215" y2="385" stroke="#8b5cf6" strokeWidth="2.5" />
          </g>
        )}
      </svg>

      {/* Atmospheric gradient overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(13, 11, 18, 0.85) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      {/* Optional Overlay Stamp / Label */}
      {overlayLabel && (
        <span 
          className="sticker-badge sticker-lime"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 2
          }}
        >
          {overlayLabel}
        </span>
      )}
    </div>
  );
}
