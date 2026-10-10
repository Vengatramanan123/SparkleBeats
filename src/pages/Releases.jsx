import React, { useState, useEffect } from 'react';
import { releasesData } from '../data/releases';
import { audioPlayer } from '../utils/audioPlayer';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ReleaseCard from '../components/ReleaseCard';
import ArtworkGraphic from '../components/ArtworkGraphic';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import './Releases.css';

export default function Releases() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const featuredRelease = releasesData.find((r) => r.isFeatured) || releasesData[0];

  useEffect(() => {
    const unsub = audioPlayer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setActiveTrackId(state.isPlaying ? state.currentTrackId : null);
    });
    return unsub;
  }, []);

  const handleTogglePlay = (trackId) => {
    const release = releasesData.find((r) => r.id === trackId);
    const bpm = release ? parseInt(release.bpm, 10) || 136 : 136;
    audioPlayer.toggle(trackId, bpm);
  };

  const categories = ['All', 'Singles', 'EPs', 'Remixes'];

  const filteredReleases = releasesData.filter((rel) => {
    if (activeFilter === 'All') return true;
    return rel.type === activeFilter;
  });

  return (
    <div className="page-releases page-fade-slide">
      <SEO 
        title="Releases & Discography"
        description="Explore the SUBROSA SOUND catalog. Heavyweight vinyl dubplates, digital club weapons, EPs, and VIP remixes across UK Garage, Dubstep, Jungle, and Techno."
      />

      <div className="container">
        {/* Page Header */}
        <PageHeader 
          tag="DISCOGRAPHY & IMPRINT"
          title="Sonic Arsenal &"
          outlineWord="Dubplates"
          description="Every track mastered for heavyweight analog sound systems. Filter through our catalogue, listen to live club previews, and stream on Spotify, SoundCloud, or Apple Music."
          badge={{ text: "CATALOGUE 2026", type: "lime" }}
        />

        {/* FEATURED RELEASE SHOWCASE */}
        <Reveal direction="up">
          <section className="featured-release-banner" aria-label="Featured Latest Release">
            <div className="featured-release-grid">
              {/* Large Cover Art with Play Button */}
              <div className="featured-release-art-wrap">
                <ArtworkGraphic release={featuredRelease} size="large" />
                <span className="sticker-badge sticker-lime featured-badge">
                  ★ {featuredRelease.badge}
                </span>
                <button
                  type="button"
                  className={`featured-play-btn ${activeTrackId === featuredRelease.id && isPlaying ? 'featured-play-btn--active' : ''}`}
                  onClick={() => handleTogglePlay(featuredRelease.id)}
                  aria-label={activeTrackId === featuredRelease.id && isPlaying ? "Pause preview" : "Play preview"}
                >
                  {activeTrackId === featuredRelease.id && isPlaying ? (
                    <div className="eq-bars">
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                      <span className="eq-bar"></span>
                    </div>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </button>
              </div>

              {/* Featured Release Details */}
              <div className="featured-release-info">
                <div className="featured-meta-row">
                  <span className="featured-cat">{featuredRelease.catalogNumber}</span>
                  <span className="featured-type">// {featuredRelease.type}</span>
                  <span className="featured-bpm">{featuredRelease.bpm}</span>
                </div>

                <h2 className="featured-title">{featuredRelease.title}</h2>
                <p className="featured-artist">{featuredRelease.artist}</p>

                <p className="featured-desc">{featuredRelease.description}</p>

                <div className="featured-specs">
                  <div className="spec-item">
                    <span className="spec-label">RELEASE DATE</span>
                    <span className="spec-val">{featuredRelease.releaseDate}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">DURATION</span>
                    <span className="spec-val">{featuredRelease.duration}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">GENRE</span>
                    <span className="spec-val">{featuredRelease.genre}</span>
                  </div>
                </div>

                {/* Streaming links & listen CTA */}
                <div className="featured-actions">
                  <Button 
                    variant="lime" 
                    size="md"
                    onClick={() => handleTogglePlay(featuredRelease.id)}
                    arrow
                  >
                    {activeTrackId === featuredRelease.id && isPlaying ? 'Pause Audio Preview' : 'Listen Live Preview'}
                  </Button>

                  <div className="featured-stream-links">
                    <a href={featuredRelease.links.spotify} target="_blank" rel="noopener noreferrer" className="stream-btn">
                      Spotify
                    </a>
                    <a href={featuredRelease.links.soundcloud} target="_blank" rel="noopener noreferrer" className="stream-btn">
                      SoundCloud
                    </a>
                    <a href={featuredRelease.links.appleMusic} target="_blank" rel="noopener noreferrer" className="stream-btn">
                      Apple Music
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* FILTER BAR */}
        <div className="releases-filter-bar">
          <div className="releases-filter-tabs" role="tablist" aria-label="Filter releases by format">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat}
                className={`filter-tab ${activeFilter === cat ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                <span className="filter-count">
                  ({cat === 'All' ? releasesData.length : releasesData.filter((r) => r.type === cat).length})
                </span>
              </button>
            ))}
          </div>

          <div className="releases-filter-status">
            Showing <strong>{filteredReleases.length}</strong> releases • <em>One track plays at a time</em>
          </div>
        </div>

        {/* CATALOG GRID */}
        <section className="releases-grid-section" aria-label="Releases Catalog">
          <div className="releases-grid">
            {filteredReleases.map((rel, index) => (
              <Reveal key={rel.id} delay={index * 60} direction="up">
                <ReleaseCard
                  release={rel}
                  isPlaying={activeTrackId === rel.id && isPlaying}
                  onTogglePlay={handleTogglePlay}
                  tilt={index % 2 === 0 ? 'left' : 'right'}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
