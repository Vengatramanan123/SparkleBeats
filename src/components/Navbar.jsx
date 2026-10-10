import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/site';
import Button from './Button';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change & unlock body scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    if (nextState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navLinks = [
    { name: 'About', path: '/' },
    { name: 'Releases', path: '/releases' },
    { name: 'Artists', path: '/artists' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        {/* Brand Logo */}
        <Link to="/" className="site-logo" aria-label={`${siteConfig.brandName} Home`}>
          <span className="site-logo__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="5" stroke="var(--color-accent-lime)" strokeWidth="2" />
              <circle cx="12" cy="12" r="2" fill="var(--color-accent-lime)" />
            </svg>
          </span>
          <span className="site-logo__text">
            {siteConfig.shortName} <span className="site-logo__highlight">SOUND</span>
          </span>
          <span className="sticker-badge sticker-lime site-logo__badge">COLLECTIVE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="desktop-nav__list">
            {navLinks.map((link) => (
              <li key={link.path} className="desktop-nav__item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `desktop-nav__link ${isActive ? 'desktop-nav__link--active' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right Action CTA */}
        <div className="site-header__actions">
          <Button
            to="/contact"
            variant="lime"
            size="sm"
            className="site-header__book-btn"
          >
            Book Us
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? 'hamburger-btn--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile navigation menu'}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer Menu */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu__backdrop" onClick={toggleMobileMenu}></div>
        <div className="mobile-menu__content">
          <div className="mobile-menu__header">
            <span className="site-logo__text">
              {siteConfig.shortName} <span className="site-logo__highlight">SOUND</span>
            </span>
            <button
              type="button"
              className="mobile-menu__close-btn"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav__list">
              {navLinks.map((link) => (
                <li key={link.path} className="mobile-nav__item">
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
                    }
                    onClick={toggleMobileMenu}
                  >
                    <span>{link.name}</span>
                    <span className="mobile-nav__arrow">→</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__footer">
            <Button
              to="/contact"
              variant="lime"
              size="lg"
              className="mobile-menu__cta"
              onClick={toggleMobileMenu}
              arrow
            >
              Book Collective / Artists
            </Button>

            <p className="mobile-menu__tagline">{siteConfig.tagline}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
