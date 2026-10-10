import React from 'react';
import { useNavigate } from 'react-router-dom';
import { artistsData } from '../data/artists';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ArtistCard from '../components/ArtistCard';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import './Artists.css';

export default function Artists() {
  const navigate = useNavigate();

  const handleBookArtist = (artist) => {
    navigate(`/contact?artist=${encodeURIComponent(artist.name)}`);
  };

  return (
    <div className="page-artists page-fade-slide">
      <SEO 
        title="Artist Roster"
        description="Meet the SUBROSA SOUND resident DJs, live performers, and acoustic engineers pushing underground UK garage, dubstep, jungle, and techno."
      />

      <div className="container">
        {/* Page Header */}
        <PageHeader 
          tag="COLLECTIVE ROSTER"
          title="Sonic Architects &"
          outlineWord="Residents"
          description="A decentralized collective of producers, dubplate cutters, and selectors. Click any artist profile to explore unreleased tracks, residency history, and booking requirements."
          badge={{ text: "6 RESIDENTS", type: "purple" }}
        />

        {/* Collective Booking Callout Banner */}
        <Reveal direction="up">
          <div className="roster-callout">
            <div className="roster-callout__text">
              <span className="sticker-badge sticker-lime">COLLECTIVE CURATION</span>
              <h3>Need a Full Room Takeover?</h3>
              <p>
                Book multiple residents or the entire SUBROSA collective for 8-hour marathon B2B sets with dedicated visual mapping and custom booth monitors.
              </p>
            </div>
            <div className="roster-callout__actions">
              <Button to="/contact?artist=Full+Collective+Takeover" variant="lime" size="md" arrow>
                Book Full Takeover
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Roster Grid */}
        <section className="artists-grid-section" aria-label="Artist Roster Grid">
          <div className="artists-grid">
            {artistsData.map((artist, idx) => (
              <Reveal key={artist.id} delay={idx * 80} direction="up">
                <ArtistCard
                  artist={artist}
                  onBookArtist={handleBookArtist}
                  tilt={idx % 2 === 0 ? 'left' : 'right'}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
