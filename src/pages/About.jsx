import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/site';
import { releasesData } from '../data/releases';
import { audioPlayer } from '../utils/audioPlayer';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import SocialLinks from '../components/SocialLinks';
import './About.css';

export default function About() {
  const [activeMediaTab, setActiveMediaTab] = useState('visual'); // 'visual' | 'video'
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const featuredRelease = releasesData[0];

  useEffect(() => {
    const unsub = audioPlayer.subscribe((state) => {
      setIsPlayingFeatured(state.isPlaying && state.currentTrackId === featuredRelease.id);
    });
    return unsub;
  }, [featuredRelease.id]);

  const toggleFeaturedAudio = () => {
    audioPlayer.toggle(featuredRelease.id, 138);
  };

  return (
    <div className="page-about page-fade-slide">
      <SEO 
        title="Home & Collective Story"
        description="SUBROSA SOUND is an independent electronic collective, club residency, and record label crafting visceral sonic experiences from dark basements to festival arenas."
      />

      {/* 1. FULL SCREEN HERO SECTION */}
      <section className="hero-section" aria-label="Hero Showcase">
        {/* ==============================================================
            HERO BACKGROUND MEDIA SWAP SPOT
            To swap with your own high-res MP4 video or photo:
            Replace the visual placeholder below or insert:
            <video autoPlay loop muted playsInline className="hero-video">
              <source src="/your-video.mp4" type="video/mp4" />
            </video>
            ============================================================== */}
        <div className="hero-media-backdrop">
          {activeMediaTab === 'video' ? (
            <div className="hero-media-simulator">
              <div className="hero-media-scanlines"></div>
              <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0b38" />
                    <stop offset="50%" stopColor="#0d0b12" />
                    <stop offset="100%" stopColor="#250942" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="800" fill="url(#laserGrad)" />
                {/* Simulated club laser beams */}
                <line x1="600" y1="100" x2="50" y2="800" stroke="#c6ff3d" strokeWidth="3" opacity="0.4" />
                <line x1="600" y1="100" x2="350" y2="800" stroke="#8b5cf6" strokeWidth="4" opacity="0.5" />
                <line x1="600" y1="100" x2="850" y2="800" stroke="#8b5cf6" strokeWidth="4" opacity="0.5" />
                <line x1="600" y1="100" x2="1150" y2="800" stroke="#c6ff3d" strokeWidth="3" opacity="0.4" />
                {/* Central sound pulse circles */}
                <circle cx="600" cy="400" r="280" stroke="rgba(198, 255, 61, 0.15)" strokeWidth="2" strokeDasharray="12 12" />
                <circle cx="600" cy="400" r="180" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="2" />
                <circle cx="600" cy="400" r="80" fill="rgba(139, 92, 246, 0.1)" stroke="#c6ff3d" strokeWidth="1.5" />
              </svg>
            </div>
          ) : (
            <div className="hero-media-graphic">
              <div className="hero-media-grid"></div>
            </div>
          )}

          {/* Dark Ink Gradient Vignette */}
          <div className="hero-vignette"></div>

          {/* Quick Media Switcher Tag */}
          <div className="hero-swap-tag">
            <span>[HERO ASSET: {activeMediaTab.toUpperCase()}]</span>
            <button 
              type="button" 
              onClick={() => setActiveMediaTab(activeMediaTab === 'visual' ? 'video' : 'visual')}
              className="hero-swap-btn"
              title="Toggle preview media background"
            >
              Switch to {activeMediaTab === 'visual' ? 'Laser Motion' : 'Static Grid'}
            </button>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="container hero-content">
          <div className="hero-badge-row">
            <span className="sticker-badge sticker-lime">WORLD TOUR 2026/27</span>
            <span className="sticker-badge sticker-dark">INDEPENDENT COLLECTIVE</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title__block">{siteConfig.brandName}</span>
            <span className="hero-title__sub">
              SOUND<span className="text-stroke-lime">SYSTEM</span>
            </span>
          </h1>

          <p className="hero-tagline">
            {siteConfig.tagline}
          </p>

          <p className="hero-desc">
            {siteConfig.heroDescription}
          </p>

          {/* Hero CTAs */}
          <div className="hero-ctas">
            <Button to="/contact" variant="lime" size="lg" arrow>
              Book Us
            </Button>
            <Button to="/releases" variant="secondary" size="lg">
              Listen Now
            </Button>
            <button 
              type="button" 
              className={`hero-audio-preview ${isPlayingFeatured ? 'hero-audio-preview--active' : ''}`}
              onClick={toggleFeaturedAudio}
              aria-label={isPlayingFeatured ? "Pause track preview" : "Listen to latest club track preview"}
            >
              <div className="eq-bars">
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
              </div>
              <span>{isPlayingFeatured ? 'Playing: Neon Pressure' : 'Play Live Dub'}</span>
            </button>
          </div>

          {/* Socials bar */}
          <div className="hero-socials">
            <span className="hero-socials-label">Connect:</span>
            <SocialLinks links={siteConfig.socials} iconSize={18} />
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLLING MARQUEE */}
      <Marquee items={siteConfig.marqueeItems} speed="normal" />

      {/* 3. SHORT STORY & PHILOSOPHY */}
      <section className="section story-section">
        <div className="container">
          <Reveal direction="up">
            <div className="story-grid">
              <div className="story-left">
                <span className="section-tag">// OUR HERITAGE</span>
                <h2 className="story-title">
                  Born in South London basements. <br />
                  <span className="text-stroke">Engineered for</span> massive sound systems.
                </h2>
                <div className="story-sticker-wrap">
                  <span className="sticker-badge sticker-purple sticker-rotate-right">NO GENRE BOUNDARIES</span>
                  <span className="sticker-badge sticker-lime">ANALOG WEIGHT</span>
                </div>
              </div>

              <div className="story-right">
                <p className="story-lead">
                  SUBROSA SOUND began in 2018 with a pair of custom-built folded horn subwoofers and a shared refusal to let corporate booking agencies sanitize dance music.
                </p>
                <p>
                  Today, we operate as a decentralized collective of six resident producers, live acts, and sound designers. We don't just supply DJs — we build total acoustic environments. Our sets span blistering 138 BPM UK garage swing, hypnotic Berlin dub techno, raw jungle breakbeats, and deep, chest-rattling 140 dubstep.
                </p>
                <p>
                  Every release on our label is field-tested directly on club dancefloors before pressing. If the low-end doesn't make the ribcage resonate, it doesn't leave the studio.
                </p>
                <div className="story-quote">
                  <blockquote>
                    "SUBROSA bridges the raw unpredictability of 90s pirate radio with the high-fidelity acoustic precision demanded by modern arenas."
                  </blockquote>
                  <cite>— Resident Advisor Club Feature, 2026</cite>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. ANIMATED STATS SECTION */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {siteConfig.stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="up">
                <div className={`stat-card ${idx % 2 === 0 ? 'tilt-card-left' : 'tilt-card-right'}`}>
                  <div className="stat-card__number">
                    {stat.value}
                    <span className="stat-card__suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-card__label">{stat.label}</div>
                  <div className="stat-card__bar"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "WHAT WE DO" SERVICE BLOCKS */}
      <section className="section services-section">
        <div className="container">
          <Reveal direction="up">
            <div className="services-header">
              <div>
                <span className="section-tag">// ARCHITECTURE & CURATION</span>
                <h2>What We Do</h2>
              </div>
              <p>
                From club takeovers and vinyl mastering to festival mainstages, we bring total creative sovereignty to every performance.
              </p>
            </div>
          </Reveal>

          <div className="services-grid">
            {siteConfig.services.map((item, index) => (
              <Reveal key={item.id} delay={index * 120} direction="up">
                <div className="service-card">
                  <div className="service-card__top">
                    <span className="service-card__number">0{index + 1}</span>
                    <span className="sticker-badge sticker-dark">{item.tag}</span>
                  </div>
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__desc">{item.description}</p>
                  <div className="service-card__footer">
                    <Button to="/contact" variant="ghost" size="sm" arrow>
                      Request Specs
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL HIGH-IMPACT CTA BAND */}
      <section className="section cta-band-section">
        <div className="container">
          <Reveal direction="up">
            <div className="cta-band">
              <div className="cta-band__content">
                <div className="cta-band__badge-row">
                  <span className="sticker-badge sticker-lime">AVAILABLE FOR 2026/2027 DATES</span>
                  <span className="sticker-badge sticker-purple">GLOBAL TOURING</span>
                </div>
                <h2 className="cta-band__title">
                  Ready to shake the foundations of your venue?
                </h2>
                <p className="cta-band__text">
                  Direct promoter inquiries, festival stage curators, and technical riders. Lock in your dates directly with our management team.
                </p>
                <div className="cta-band__actions">
                  <Button to="/contact" variant="lime" size="lg" arrow>
                    Book The Collective
                  </Button>
                  <Button 
                    href={`https://wa.me/${siteConfig.whatsAppDigitsOnly}?text=${encodeURIComponent("Hi SUBROSA team, I would like to inquire about booking availability.")}`}
                    target="_blank"
                    variant="secondary" 
                    size="lg"
                  >
                    Quick WhatsApp Chat
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
