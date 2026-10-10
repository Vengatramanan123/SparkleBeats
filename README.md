# SUBROSA SOUND | Electronic Collective & DJ Brand Website

A high-energy, 5-page website built for the electronic music collective and DJ imprint **SUBROSA SOUND**. Designed with a **"Professional + Funky"** aesthetic: deep ink foundation (`#0d0b12`), off-white typography, electric purple (`#8b5cf6`), and sharp acid lime accents (`#c6ff3d`).

---

## ⚡ Live Features & Pages

1. **About (Home)** (`/`):
   - Full-screen hero with video/image background placeholder (with designated swap spot)
   - Brand name and tagline with oversized typography and outline stroke styling
   - Interactive live Web Audio synthesizer preview with animated equalizer
   - Quick CTAs: *"Book Us"* and *"Listen Now"*
   - Short collective heritage story with rotated sticker badges
   - Animated stats grid (*280+ Global Events, 8 Yrs Heritage, 36 Touring Cities, 145K+ Followers*)
   - Seamless infinite marquee ticker
   - *"What We Do"* service cards (*Club Residencies, Label Imprint, Festival Takeovers, Sound Design*)
   - High-impact closing booking CTA banner

2. **Releases** (`/releases`):
   - Filterable catalog tabs (*All / Singles / EPs / Remixes*)
   - Featured latest release banner with interactive audio play trigger and streaming links
   - Interactive release cards with tilted perspective that straightens on hover
   - Live multi-bar equalizer animation synced to Web Audio playback (one track plays at a time)
   - Direct streaming platform links (*Spotify, SoundCloud, Apple Music*)

3. **Artists** (`/artists`):
   - Roster grid of resident DJs, live acts, and sound designers (*Kid Velvet, Maya Volt, Sub Freq, Nyx Echo, Torque, Ciel*)
   - Rotated sticker badges (*"Founder", "Resident", "Live Act", "Bass Scientist"*)
   - Hover reveals instant *"Book"* button
   - Click opens accessible **Artist Detail Modal** with full bio, top releases, tour dates, and direct booking trigger

4. **Gallery** (`/gallery`):
   - Dynamic multi-column masonry layout
   - Category filter tabs (*All / Live / Backstage / Studio*)
   - Hover zoom and atmospheric club caption overlays
   - Fullscreen accessible **Lightbox** with previous/next controls, keyboard arrow navigation, and `Escape` key dismissal

5. **Contact** (`/contact`):
   - Promoter booking dispatch form with real-time field validation (*Name, Email, Phone, Event Date, Event Type, Artist Selection, Details*)
   - Dynamic query param support (pre-selects artist when navigating from artist roster)
   - **WhatsApp Direct Button** that automatically generates an encoded, prefilled booking message
   - Direct management contacts and dispatch turnaround guarantee
   - Interactive FAQ accordion (*Rates, riders, lead times, full collective curations*)

---

## 🛠 Stack & Architecture

- **Vite 5** + **React 18** + **React Router 6** (JavaScript)
- **Zero UI kits, zero Tailwind, zero animation libraries**: Pure, semantic HTML5 and vanilla CSS with design tokens
- **Google Fonts**: *"Bricolage Grotesque"* + *"Unbounded"* for headings, *"Inter"* for body
- **Web Audio API**: Built-in electronic synthesizer engine (`src/utils/audioPlayer.js`) generating punchy four-on-the-floor kicks, hi-hat swing, sub-bass glides, and synth arpeggios on demand with zero external asset latency
- **Automated Verification**: Headless Chrome test suite (`verify-site.js`) verifying 15 responsive viewports across 375px, 768px, and 1440px with zero layout overflow

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

### 4. Run Viewport & Interactive Test Suite
```bash
node verify-site.js
```
Runs headless Chrome across all 5 pages at 375px, 768px, and 1440px, captures screenshots into `screenshots/`, and verifies interactive behaviors.

---

## 🎨 Where to Customize

### 1. Change Brand Name, Tagline & Site Info
Edit `src/data/site.js`:
```javascript
export const siteConfig = {
  brandName: "SUBROSA SOUND",        // Your collective/DJ brand name
  shortName: "SUBROSA",              // Short version for compact headers
  tagline: "HEAVY BASS • HIGH ENERGY • UNDERGROUND SOUL",
  heroDescription: "An independent electronic collective...",
  yearEstablished: 2018,
  location: "London • Berlin • Tokyo • Amsterdam",
  // ...
};
```

### 2. Change WhatsApp Number
Edit `src/data/site.js`:
```javascript
whatsAppNumber: "+44 7700 900829",    // Formatted for display
whatsAppDigitsOnly: "447700900829",   // Digits only with country code for wa.me links
```

### 3. Change Colors & Typography Tokens
Edit `src/styles/tokens.css`:
```css
:root {
  /* Base ink colors */
  --color-bg-primary: #0d0b12;
  --color-bg-secondary: #14101c;
  --color-text-primary: #f5f4f8;

  /* Funky Accents */
  --color-accent-purple: #8b5cf6;     /* Primary brand accent */
  --color-accent-lime: #c6ff3d;       /* Sharp secondary highlight */

  /* Fonts */
  --font-display: 'Bricolage Grotesque', 'Unbounded', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### 4. Change Releases & Catalog
Edit `src/data/releases.js`:
- Add or modify releases, cover art gradients, track length, catalog numbers, genres, and streaming links (`spotify`, `soundcloud`, `appleMusic`).

### 5. Change Artist Roster & Tour Dates
Edit `src/data/artists.js`:
- Add resident DJs, bio copy, genre pills, top tracks list, and upcoming tour dates (`venue`, `city`, `date`).

### 6. Change Visual Gallery Archives
Edit `src/data/gallery.js`:
- Add photos, captions, dates, locations, and categories (`Live`, `Backstage`, `Studio`).

### 7. Swap Media & Video Backgrounds
- **Hero Video/Photo Swap Spot**: Look for the designated comment block in `src/pages/About.jsx` under `hero-media-backdrop`:
  ```jsx
  {/* Replace the simulated backdrop with your custom video: */}
  <video autoPlay loop muted playsInline className="hero-video">
    <source src="/assets/hero-loop.mp4" type="video/mp4" />
  </video>
  ```
- **Local Images**: Place your custom images into `public/images/` and reference them directly in `src/data/releases.js`, `src/data/artists.js`, or `src/data/gallery.js`.

---

## 📁 Project Structure

```
subrosa-sound/
├── index.html                   # HTML entry point with Google Fonts & SEO meta
├── package.json                 # Project configuration & scripts
├── vite.config.js               # Vite configuration
├── verify-site.js               # Multi-viewport Chrome test suite
├── screenshots/                 # Captured responsive screenshots (375px, 768px, 1440px)
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Route definitions & scroll restoration
    ├── data/
    │   ├── site.js              # Brand config, WhatsApp number, FAQs, stats, socials
    │   ├── releases.js          # Discography catalog & streaming links
    │   ├── artists.js           # Roster profiles, top tracks & tour dates
    │   └── gallery.js           # Visual documentary archives
    ├── pages/
    │   ├── About.jsx            # Home / About page with full-screen hero & stats
    │   ├── Releases.jsx         # Filterable discography & audio preview
    │   ├── Artists.jsx          # Collective roster & booking triggers
    │   ├── Gallery.jsx          # Masonry archives & lightbox
    │   └── Contact.jsx          # Booking dispatch form & WhatsApp gateway
    ├── components/
    │   ├── Navbar.jsx           # Sticky blur header & mobile drawer
    │   ├── Footer.jsx           # Newsletter dispatch & dynamic copyright
    │   ├── Button.jsx           # Funky interactive buttons
    │   ├── PageHeader.jsx       # Reusable display headers with outline words
    │   ├── Reveal.jsx           # IntersectionObserver scroll reveals
    │   ├── Marquee.jsx          # Infinite ticker banner
    │   ├── ReleaseCard.jsx      # Tilted release cards & equalizer
    │   ├── ArtistCard.jsx       # Roster card with book overlay
    │   ├── ArtistModal.jsx      # Accessible profile modal dialog
    │   ├── GalleryItem.jsx      # Masonry item with zoom caption
    │   ├── Lightbox.jsx         # Keyboard-controlled image viewer
    │   ├── ContactForm.jsx      # Validated booking form & WhatsApp link
    │   ├── SocialLinks.jsx      # Crisp SVG social icons
    │   ├── ArtworkGraphic.jsx   # Generative vector vinyl artwork
    │   ├── PhotoGraphic.jsx     # Atmospheric vector scene illustrations
    │   └── SEO.jsx              # Per-route title & Open Graph tags
    ├── utils/
    │   └── audioPlayer.js       # Real-time Web Audio API synthesizer
    └── styles/
        ├── tokens.css           # CSS variables (colors, fonts, shadows)
        └── global.css           # Global typography, stickers & resets
```
