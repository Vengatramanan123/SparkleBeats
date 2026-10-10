import React, { useState } from 'react';
import { siteConfig } from '../data/site';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';
import Reveal from '../components/Reveal';
import './Contact.css';

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="page-contact page-fade-slide">
      <SEO 
        title="Bookings & Contact"
        description="Book SUBROSA SOUND collective artists, request technical and hospitality riders, or send an instant WhatsApp dispatch for upcoming club dates and festival curations."
      />

      <div className="container">
        {/* Page Header */}
        <PageHeader 
          tag="DISPATCH & BOOKINGS"
          title="Direct Inquiries &"
          outlineWord="Roster"
          description="Direct artist management and collective takeover curations. Fill out our booking dispatch below or chat immediately via WhatsApp."
          badge={{ text: "2026/2027 CALENDAR OPEN", type: "lime" }}
        />

        {/* Contact Layout Grid */}
        <div className="contact-main-grid">
          {/* Left: Contact Booking Form */}
          <div className="contact-form-column">
            <Reveal direction="up">
              <ContactForm />
            </Reveal>
          </div>

          {/* Right: Direct Contacts, Fast Specs, Socials */}
          <div className="contact-info-column">
            <Reveal direction="up" delay={100}>
              <div className="contact-info-card">
                <span className="sticker-badge sticker-purple">MANAGEMENT HQ</span>
                <h3 className="contact-info-card__title">Direct Channels</h3>
                <p className="contact-info-card__sub">
                  For emergency festival replacements, same-day tour changes, or urgent riders:
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-item">
                    <span className="contact-detail-label">WhatsApp Hotline:</span>
                    <a 
                      href={`https://wa.me/${siteConfig.whatsAppDigitsOnly}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-detail-val contact-detail-val--lime"
                    >
                      {siteConfig.whatsAppNumber}
                    </a>
                  </div>

                  <div className="contact-detail-item">
                    <span className="contact-detail-label">Booking Inquiries:</span>
                    <a href={`mailto:${siteConfig.contactEmail}`} className="contact-detail-val">
                      {siteConfig.contactEmail}
                    </a>
                  </div>

                  <div className="contact-detail-item">
                    <span className="contact-detail-label">Press & Management:</span>
                    <a href={`mailto:${siteConfig.mgmtEmail}`} className="contact-detail-val">
                      {siteConfig.mgmtEmail}
                    </a>
                  </div>

                  <div className="contact-detail-item">
                    <span className="contact-detail-label">Operating Hubs:</span>
                    <span className="contact-detail-val">{siteConfig.location}</span>
                  </div>
                </div>

                <div className="contact-info-socials">
                  <span className="contact-socials-title">Follow Roster Channels:</span>
                  <SocialLinks links={siteConfig.socials} iconSize={20} />
                </div>
              </div>
            </Reveal>

            {/* Turnaround Guarantee Badge Card */}
            <Reveal direction="up" delay={150}>
              <div className="rider-tip-card">
                <div className="rider-tip-card__header">
                  <span className="rider-tip-icon">⚡</span>
                  <h4>4-Hour Promoter Dispatch</h4>
                </div>
                <p>
                  Promoters who utilize our integrated WhatsApp gateway receive verified availability, technical rider confirmation, and prospective holds within 4 business hours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="section faq-section" aria-label="Frequently Asked Questions">
          <Reveal direction="up">
            <div className="faq-header">
              <span className="section-tag">// LOGISTICS & RIDERS</span>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about booking fees, hospitality, travel, and acoustic riders.</p>
            </div>

            <div className="faq-accordion" role="region" aria-label="Booking FAQ Accordion">
              {siteConfig.faq.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div 
                        id={`faq-answer-${index}`} 
                        className="faq-answer-content"
                      >
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
