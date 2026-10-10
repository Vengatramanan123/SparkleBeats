import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function fetchInstagram() {
  console.log('Connecting to Chrome to inspect https://www.instagram.com/djspark.wav/ ...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false, // Let's try headless false or true with realistic viewport
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  try {
    await page.goto('https://www.instagram.com/djspark.wav/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000));

    // Capture screenshot
    await page.screenshot({ path: path.resolve('screenshots/instagram_profile.png') });

    const pageInfo = await page.evaluate(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.content;
      const ogImage = document.querySelector('meta[property="og:image"]')?.content;
      const bodyText = document.body.innerText;
      
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => ({ src: img.src, alt: img.alt }))
        .filter(i => i.src && i.src.startsWith('http') && !i.src.includes('static.cdninstagram'));
      
      const postLinks = Array.from(document.querySelectorAll('a'))
        .map(a => a.href)
        .filter(href => href.includes('/p/') || href.includes('/reel/'));

      return {
        title,
        metaDesc,
        ogImage,
        bodyText: bodyText.slice(0, 1500),
        images,
        postLinks: [...new Set(postLinks)]
      };
    });

    console.log('Result:', JSON.stringify(pageInfo, null, 2));
    fs.writeFileSync('instagram-data.json', JSON.stringify(pageInfo, null, 2));
  } catch (err) {
    console.error('Error fetching Instagram:', err.message);
  } finally {
    await browser.close();
  }
}

fetchInstagram();
