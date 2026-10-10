import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { artistsData } from '../data/artists';
import { siteConfig } from '../data/site';
import Button from './Button';
import './ContactForm.css';

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const preselectedArtist = searchParams.get('artist') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Club Night',
    artist: preselectedArtist || 'Full Collective Takeover',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedArtist) {
      setFormData((prev) => ({ ...prev, artist: preselectedArtist }));
    }
  }, [preselectedArtist]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name or promoter/agency name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch & booking confirmation.';
    }
    if (!formData.eventDate) {
      errs.eventDate = 'Please select a prospective event date.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide event details (city, venue capacity, time slot, minimum 15 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  // Generate WhatsApp prefilled link from form data
  const generateWhatsAppLink = () => {
    const textLines = [
      `*SUBROSA SOUND BOOKING INQUIRY*`,
      `• Promoter/Name: ${formData.name || 'Not specified'}`,
      `• Contact Email: ${formData.email || 'Not specified'}`,
      `• Phone: ${formData.phone || 'Not specified'}`,
      `• Requested Artist: ${formData.artist}`,
      `• Event Type: ${formData.eventType}`,
      `• Target Date: ${formData.eventDate || 'TBD'}`,
      `• Details: ${formData.message || 'Direct inquiry via website.'}`
    ];
    const encoded = encodeURIComponent(textLines.join('\n'));
    return `https://wa.me/${siteConfig.whatsAppDigitsOnly}?text=${encoded}`;
  };

  return (
    <div className="contact-form-container">
      {isSubmitted ? (
        <div className="contact-form__success">
          <div className="success-badge">
            <span className="sticker-badge sticker-lime">CONFIRMED</span>
          </div>
          <h3>Inquiry Received!</h3>
          <p>
            Thank you, <strong>{formData.name}</strong>. Our management team has received your request for <strong>{formData.artist}</strong> on <strong>{formData.eventDate}</strong>.
          </p>
          <p className="success-sub">
            We review technical riders and confirm availability within 24 hours. For immediate confirmation, you can send this directly via WhatsApp:
          </p>
          <div className="success-actions">
            <Button
              href={generateWhatsAppLink()}
              target="_blank"
              variant="lime"
              size="md"
              arrow
            >
              Confirm via WhatsApp
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  eventDate: '',
                  eventType: 'Club Night',
                  artist: 'Full Collective Takeover',
                  message: ''
                });
              }}
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Row 1: Name & Email */}
          <div className="contact-form__row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name / Organization <span className="req">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Vance (Warehouse Project)"
                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                required
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="req">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="bookings@youragency.com"
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                required
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>

          {/* Row 2: Phone & Event Date */}
          <div className="contact-form__row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone / WhatsApp Number <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7700 900000"
                className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                required
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">
                Event Date <span className="req">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className={`form-input ${errors.eventDate ? 'form-input--error' : ''}`}
                required
              />
              {errors.eventDate && <span className="form-error">{errors.eventDate}</span>}
            </div>
          </div>

          {/* Row 3: Event Type & Artist Selection */}
          <div className="contact-form__row">
            <div className="form-group">
              <label htmlFor="eventType" className="form-label">
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Club Night">Club Night / Residency</option>
                <option value="Festival">Festival Stage / Arena</option>
                <option value="Warehouse Rave">Warehouse Rave / DIY Space</option>
                <option value="Private Event">Private / Afterparty</option>
                <option value="Brand Partnership">Brand Partnership / Sound Design</option>
                <option value="Other">Other / Radio Broadcast</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="artist" className="form-label">
                Select Artist or Collective
              </label>
              <select
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Full Collective Takeover">Full Collective Takeover (Multi-B2B)</option>
                {artistsData.map((art) => (
                  <option key={art.id} value={art.name}>
                    {art.name} ({art.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Area */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Event Details & Venue Info <span className="req">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide city, venue name, estimated capacity, sound system specs, and desired set length..."
              className={`form-textarea ${errors.message ? 'form-textarea--error' : ''}`}
              required
            ></textarea>
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          {/* Action Row */}
          <div className="contact-form__actions">
            <Button
              type="submit"
              variant="lime"
              size="lg"
              arrow
            >
              Submit Booking Inquiry
            </Button>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-direct-btn"
              title="Chat directly with booking agent via WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.39 1.28-1.92 1.36-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.33-1.77-1.33-3.37s.84-2.39 1.14-2.71c.3-.32.65-.4.87-.4.22 0 .43.01.62.01.2 0 .46-.07.72.55.27.64.92 2.24 1 2.4.08.16.14.35.03.56-.11.21-.17.34-.34.54-.17.2-.36.45-.51.6-.17.17-.35.35-.15.7.2.35.88 1.45 1.88 2.34 1.29 1.15 2.38 1.51 2.73 1.68.35.17.55.15.76-.09.21-.24.89-1.04 1.13-1.4.24-.36.48-.3.8-.18.32.12 2.05.97 2.4 1.14.35.17.59.26.67.4.08.14.08.82-.16 1.49z"/>
              </svg>
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
