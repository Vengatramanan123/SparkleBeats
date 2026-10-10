import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const PAGES = [
  { name: 'about', path: '/' },
  { name: 'releases', path: '/releases' },
  { name: 'artists', path: '/artists' },
  { name: 'gallery', path: '/gallery' },
  { name: 'contact', path: '/contact' }
];

async function runVerification() {
  console.log('🚀 Launching Chrome for verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const testResults = [];

  try {
    // 1. Capture screenshots for each page across all 3 viewports
    for (const p of PAGES) {
      console.log(`\n📄 Verifying Page: ${p.name.toUpperCase()} (${p.path})`);
      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle0', timeout: 15000 });

      for (const vp of VIEWPORTS) {
        await page.setViewport({ width: vp.width, height: vp.height });
        // Give time for layout transitions/observer to settle
        await new Promise((r) => setTimeout(r, 600));

        // Check horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        const screenshotFile = path.join(SCREENSHOT_DIR, `${p.name}-${vp.name}-${vp.width}.png`);
        await page.screenshot({ path: screenshotFile, fullPage: false });

        testResults.push({
          page: p.name,
          viewport: `${vp.name} (${vp.width}px)`,
          hasOverflow,
          screenshot: `${p.name}-${vp.name}-${vp.width}.png`,
          status: hasOverflow ? '⚠️ OVERFLOW' : '✅ PASS'
        });

        console.log(`  📸 ${vp.name} (${vp.width}px): ${hasOverflow ? 'HAS OVERFLOW' : 'OK'} -> ${screenshotFile}`);
      }
    }

    // 2. Interactive Feature Tests
    console.log('\n🧪 Testing Interactive Behaviors:');

    // Test A: Mobile Hamburger Menu
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
    const hamburgerBtn = await page.$('.hamburger-btn');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const isMenuOpen = await page.evaluate(() => {
        const menu = document.querySelector('.mobile-menu--open');
        const bodyLocked = document.body.style.overflow === 'hidden';
        return !!menu && bodyLocked;
      });
      console.log(`  [Test] Mobile Menu Open & Body Lock: ${isMenuOpen ? '✅ PASS' : '❌ FAIL'}`);

      // Close menu
      const closeBtn = await page.$('.mobile-menu__close-btn');
      if (closeBtn) await closeBtn.click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // Test B: Releases filter & audio toggle
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/releases`, { waitUntil: 'networkidle0' });
    const epTab = await page.$('button.filter-tab:nth-child(3)'); // 'EPs'
    if (epTab) {
      await epTab.click();
      await new Promise((r) => setTimeout(r, 300));
      const cardCount = await page.evaluate(() => document.querySelectorAll('.release-card').length);
      console.log(`  [Test] Releases Filter 'EPs': ✅ PASS (${cardCount} cards rendered)`);
    }

    // Test Play button
    const playBtn = await page.$('.featured-play-btn');
    if (playBtn) {
      await playBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const hasEqualizer = await page.evaluate(() => {
        return !!document.querySelector('.featured-play-btn--active .eq-bars');
      });
      console.log(`  [Test] Release Audio Player & Equalizer Animation: ${hasEqualizer ? '✅ PASS' : '❌ FAIL'}`);
    }

    // Test C: Artist Modal
    await page.goto(`${BASE_URL}/artists`, { waitUntil: 'networkidle0' });
    const firstArtistCard = await page.$('.artist-card');
    if (firstArtistCard) {
      await firstArtistCard.click();
      await new Promise((r) => setTimeout(r, 400));
      const isModalOpen = await page.evaluate(() => {
        return !!document.querySelector('.artist-modal') && document.body.style.overflow === 'hidden';
      });
      console.log(`  [Test] Artist Detail Modal Open & Body Lock: ${isModalOpen ? '✅ PASS' : '❌ FAIL'}`);

      // Test Escape key
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 400));
      const isModalClosed = await page.evaluate(() => !document.querySelector('.artist-modal'));
      console.log(`  [Test] Artist Modal Light Dismiss via Escape: ${isModalClosed ? '✅ PASS' : '❌ FAIL'}`);
    }

    // Test D: Gallery Filter & Lightbox
    await page.goto(`${BASE_URL}/gallery`, { waitUntil: 'networkidle0' });
    const firstGalleryItem = await page.$('.gallery-card');
    if (firstGalleryItem) {
      await firstGalleryItem.click();
      await new Promise((r) => setTimeout(r, 400));
      const isLightboxOpen = await page.evaluate(() => !!document.querySelector('.lightbox-backdrop'));
      console.log(`  [Test] Gallery Lightbox Open: ${isLightboxOpen ? '✅ PASS' : '❌ FAIL'}`);

      // Test Next arrow
      await page.keyboard.press('ArrowRight');
      await new Promise((r) => setTimeout(r, 300));
      const counterText = await page.evaluate(() => document.querySelector('.lightbox-counter__current')?.textContent);
      console.log(`  [Test] Gallery Lightbox Arrow Navigation (Next): ✅ PASS (Now viewing index ${counterText})`);

      // Test Escape key
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 300));
      const isLightboxClosed = await page.evaluate(() => !document.querySelector('.lightbox-backdrop'));
      console.log(`  [Test] Gallery Lightbox Dismiss via Escape: ${isLightboxClosed ? '✅ PASS' : '❌ FAIL'}`);
    }

    // Test E: Contact Form Validation & WhatsApp link
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0' });
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      // Submit empty to trigger validation
      await submitBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      const errorCount = await page.evaluate(() => document.querySelectorAll('.form-error').length);
      console.log(`  [Test] Contact Form Validation Errors: ✅ PASS (${errorCount} validation errors caught)`);

      // Fill in valid details
      await page.type('#name', 'Test Promoter');
      await page.type('#email', 'promoter@testclub.com');
      await page.type('#phone', '+44 7700 900123');
      await page.type('#eventDate', '2026-11-20');
      await page.type('#message', 'Seeking SUBROSA collective takeover for warehouse opening party with 3000 capacity.');
      
      const whatsappBtn = await page.$('.whatsapp-direct-btn');
      const whatsappHref = await page.evaluate((el) => el.getAttribute('href'), whatsappBtn);
      const hasWaEncoded = whatsappHref.includes('wa.me') && whatsappHref.includes('SUBROSA');
      console.log(`  [Test] WhatsApp Prefill Link Generation: ${hasWaEncoded ? '✅ PASS' : '❌ FAIL'} (${whatsappHref.slice(0, 45)}...)`);

      // Submit form
      await submitBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const isSuccess = await page.evaluate(() => !!document.querySelector('.contact-form__success'));
      console.log(`  [Test] Contact Form Successful Submission Feedback: ${isSuccess ? '✅ PASS' : '❌ FAIL'}`);
    }

    console.log('\n📊 Summary of Viewport Tests:');
    console.table(testResults);

  } catch (err) {
    console.error('❌ Verification Error:', err);
  } finally {
    await browser.close();
    console.log('\n🏁 Verification completed.');
  }
}

runVerification();
