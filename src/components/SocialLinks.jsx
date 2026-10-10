import React from 'react';

export default function SocialLinks({ className = '', iconSize = 20, links = null }) {
  const defaultLinks = {
    spotify: "https://open.spotify.com",
    soundcloud: "https://soundcloud.com",
    instagram: "https://instagram.com",
    residentAdvisor: "https://ra.co",
    youtube: "https://youtube.com"
  };

  const activeLinks = links || defaultLinks;

  return (
    <div 
      className={`social-links-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}
    >
      {activeLinks.spotify && (
        <a 
          href={activeLinks.spotify} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-link"
          aria-label="Spotify Profile"
          title="Spotify"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </a>
      )}

      {activeLinks.soundcloud && (
        <a 
          href={activeLinks.soundcloud} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-link"
          aria-label="SoundCloud Profile"
          title="SoundCloud"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.175 12.225c-.049 0-.088.042-.093.093l-.364 2.457.364 2.417c.005.05.044.088.093.088.051 0 .093-.038.098-.088l.405-2.417-.405-2.457c-.005-.051-.047-.093-.098-.093zm1.188-.415c-.062 0-.112.05-.118.112l-.37 2.872.37 2.825c.006.062.056.11.118.11.065 0 .117-.048.123-.11l.426-2.825-.426-2.872c-.006-.062-.058-.112-.123-.112zm1.265-.674c-.078 0-.14.062-.147.14l-.34 3.546.34 3.489c.007.078.069.138.147.138.08 0 .144-.06.151-.138l.43-3.489-.43-3.546c-.007-.078-.071-.14-.151-.14zm1.314-.177c-.092 0-.166.074-.173.166l-.316 3.723.316 3.664c.007.092.081.163.173.163.095 0 .17-.071.177-.163l.426-3.664-.426-3.723c-.007-.092-.082-.166-.177-.166zm1.353-.293c-.106 0-.191.085-.198.191l-.29 4.016.29 3.955c.007.106.092.188.198.188.109 0 .195-.082.202-.188l.417-3.955-.417-4.016c-.007-.106-.093-.191-.202-.191zm1.396-.134c-.12 0-.217.096-.225.216l-.261 4.15.261 4.089c.008.12.105.212.225.212.123 0 .22-.092.228-.212l.407-4.089-.407-4.15c-.008-.12-.105-.216-.228-.216zm1.439.117c-.135 0-.243.108-.251.243l-.228 4.033.228 3.974c.008.135.116.24.251.24.138 0 .248-.105.255-.24l.394-3.974-.394-4.033c-.007-.135-.117-.243-.255-.243zm3.792-3.424c-.161 0-.309.056-.429.149-.074.057-.132.132-.17.218-.118-.328-.394-.572-.735-.615-.126-.016-.254-.002-.375.041-.059.021-.115.051-.166.089-.089.065-.157.155-.199.257-.042-.741-.655-1.328-1.408-1.328-.154 0-.303.025-.444.072-.059.02-.116.046-.17.079-.115.069-.209.167-.272.285-.028-.016-.057-.03-.087-.043v8.536c.203.03.411.047.623.047 1.488 0 2.721-.997 3.093-2.369.309.163.66.257 1.033.257.439 0 .847-.132 1.188-.36.326.852 1.144 1.458 2.107 1.458 1.258 0 2.278-1.02 2.278-2.278 0-1.258-1.02-2.279-2.278-2.279-.19 0-.374.024-.549.068-.217-.98-1.085-1.716-2.127-1.716-.143 0-.282.015-.417.042-.321-1.25-1.458-2.174-2.812-2.174z" />
          </svg>
        </a>
      )}

      {activeLinks.instagram && (
        <a 
          href={activeLinks.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-link"
          aria-label="Instagram Profile"
          title="Instagram"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      )}

      {activeLinks.residentAdvisor && (
        <a 
          href={activeLinks.residentAdvisor} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-link"
          aria-label="Resident Advisor Roster"
          title="Resident Advisor"
        >
          <span style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 900, 
            fontSize: '0.8rem',
            letterSpacing: '-0.05em' 
          }}>
            [RA]
          </span>
        </a>
      )}

      {activeLinks.youtube && (
        <a 
          href={activeLinks.youtube} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon-link"
          aria-label="YouTube Channel"
          title="YouTube"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      )}

      <style>{`
        .social-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--border-radius-pill);
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all var(--transition-fast);
        }
        .social-icon-link:hover {
          color: var(--color-bg-primary);
          background: var(--color-accent-lime);
          border-color: var(--color-accent-lime);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(198, 255, 61, 0.25);
        }
      `}</style>
    </div>
  );
}
