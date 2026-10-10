import React from 'react';
import { instagramData } from '../data/instagram';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import GalleryItem from '../components/GalleryItem';
import Reveal from '../components/Reveal';
import './Gallery.css';

export default function Gallery() {
  const filteredItems = instagramData;

  const handleItemClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="page-gallery page-fade-slide">
      <SEO 
        title="Visual Archives & Gallery"
        description="Visual documentations of SUBROSA SOUND club residencies, modular studio sessions, tape mastering, and backstage tour rituals across London, Berlin, and Amsterdam."
      />

      <div className="container">
        {/* Page Header */}
        <PageHeader 
          tag="VISUAL CHRONICLES"
          title="Atmospheres &"
          outlineWord="Archives"
          description="A curated documentary gallery of 3 AM warehouse haze, modular synthesizer patching, vinyl dubplate inspection, and international tour life."
          badge={{ text: `${filteredItems.length} POSTS`, type: "lime" }}
        />

        {/* Status */}
        <div className="gallery-filter-bar">
          <div className="gallery-status">
            <span>Click any item to view on Instagram</span>
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <section className="gallery-masonry-section" aria-label="Visual Masonry Grid">
          <div className="gallery-masonry">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 50} direction="up">
                <GalleryItem
                  item={item}
                  onClick={handleItemClick}
                />
              </Reveal>
            ))}
          </div>
        </section>
       </div>
     </div>
   );
 }
