import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'lime' | 'secondary' | 'outline' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon = null,
  arrow = false,
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  ariaLabel
}) {
  const classes = `funky-btn funky-btn--${variant} funky-btn--${size} ${className}`;

  const content = (
    <>
      {icon && <span className="funky-btn__icon" aria-hidden="true">{icon}</span>}
      <span className="funky-btn__text">{children}</span>
      {arrow && (
        <span className="funky-btn__arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href} 
        className={classes} 
        target={target} 
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
