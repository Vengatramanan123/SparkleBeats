import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';
import SocialLinks from './SocialLinks';
import Button from './Button';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Newsletter & Dispatch Section */}
        <div className="site-footer__newsletter-block">
          <div className="site-footer__newsletter-text">
            <span className="sticker-badge sticker-lime">DUBPLATE DISPATCH</span>
            <h3>Stay on the Secret Wire</h3>
            <p>
              Exclusive white-label announcements, unannounced London & Berlin basement sets, and VIP download links before public drop.
            </p>
          </div>

          <div className="site-footer__newsletter-form-wrapper">
            {subscribed ? (
              <div className="newsletter-success">
                <span className="sticker-badge sticker-lime">CONNECTED</span>
                <p>You're on the list. Keep your eyes on your inbox for upcoming guestlist codes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form" noValidate>
                <div className="newsletter-form__field">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className={`newsletter-input ${error ? 'newsletter-input--error' : ''}`}
                    aria-label="Email address for newsletter dispatch"
                    required
                  />
                  <Button type="submit" variant="lime" size="md">
                    Join
                  </Button>
                </div>
                {error && <span className="newsletter-error">{error}</span>}
              </form>
            )}
          </div>
        </div>

        {/* Middle Links Grid */}
        <div className="site-footer__main">
          {/* Brand Info */}
          <div className="site-footer__col-brand">
            <div className="site-footer__logo">
              {siteConfig.shortName} <span className="site-logo__highlight">SOUND</span>
            </div>
            <p className="site-footer__tagline">{siteConfig.tagline}</p>
            <p className="site-footer__loc">{siteConfig.location}</p>
            <div className="site-footer__socials">
              <SocialLinks links={siteConfig.socials} iconSize={20} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="site-footer__col-nav">
            <h4 className="site-footer__col-title">Navigation</h4>
            <ul className="site-footer__links">
              <li><Link to="/">About & Story</Link></li>
              <li><Link to="/releases">Discography & Releases</Link></li>
              <li><Link to="/artists">Artist Roster</Link></li>
              <li><Link to="/gallery">Visual Archives</Link></li>
              <li><Link to="/contact">Booking & Contact</Link></li>
            </ul>
          </div>

          {/* Fast Booking & Direct Contact */}
          <div className="site-footer__col-contact">
            <h4 className="site-footer__col-title">Direct Inquiries</h4>
            <ul className="site-footer__links">
              <li>
                <span className="footer-label">Bookings:</span>{' '}
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </li>
              <li>
                <span className="footer-label">Management:</span>{' '}
                <a href={`mailto:${siteConfig.mgmtEmail}`}>{siteConfig.mgmtEmail}</a>
              </li>
              <li>
                <span className="footer-label">WhatsApp:</span>{' '}
                <a 
                  href={`https://wa.me/${siteConfig.whatsAppDigitsOnly}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-whatsapp-link"
                >
                  {siteConfig.whatsAppNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © {currentYear} {siteConfig.brandName}. All Rights Reserved. Built for high displacement audio.
          </p>
          <div className="site-footer__badges">
            <span className="sticker-badge sticker-dark">EST. {siteConfig.yearEstablished}</span>
            <span className="sticker-badge sticker-dark">ANALOG & DIGITAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
