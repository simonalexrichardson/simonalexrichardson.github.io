import { chromium } from 'playwright';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');

const sites = [
  { name: 'quietloon',    url: 'https://www.quietloon.com' },
  { name: 'reaperdrones', url: 'https://www.reaperdrones.com' },
  { name: 'altitude',     url: 'https://altitudedronesurveying.vercel.app' },
  { name: 'nonstarters',  url: 'https://www.thenonstarters.com' },
  { name: 'shabbyroads',  url: 'https://www.shabbyroadband.co.uk' },
  { name: 'voltline',     url: 'https://voltline-electrical.vercel.app' },
  { name: 'hartley',      url: 'https://wildmoor-gardens.vercel.app' },
  { name: 'northbridge',  url: 'https://northbridge-plumbing.vercel.app' },
  { name: 'beechwood',    url: 'https://beechwood-care.vercel.app' },
  { name: 'tideway',      url: 'https://tideway-swim-academy.vercel.app' },
  { name: 'cobalt',       url: 'https://aero-mandate-radar.vercel.app' },
];

// Vercel Firewall fingerprints headless Chromium beyond UA. Use real Chrome +
// stealth tweaks (drop the automation flag, hide navigator.webdriver) to bypass.
const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--disable-blink-features=AutomationControlled'],
});
const context = await browser.newContext({
  ignoreHTTPSErrors: true,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  locale: 'en-GB',
  viewport: { width: 1280, height: 800 },
});
await context.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const site of sites) {
  let captured = false;
  for (let attempt = 1; attempt <= 4 && !captured; attempt++) {
    const page = await context.newPage();
    let response = null;
    try {
      response = await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 });
    } catch {
      // networkidle timed out — page probably loaded, just has open connections
    }
    const status = response?.status();
    if (status === 403 || status === 429) {
      await page.close();
      const wait = 4000 * attempt;
      console.log(`…  ${site.name} got ${status} on attempt ${attempt}, retrying in ${wait}ms`);
      await sleep(wait);
      continue;
    }
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${outDir}/${site.name}.jpg`,
      type: 'jpeg',
      quality: 82,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`✓  ${site.name}`);
    await page.close();
    captured = true;
  }
  if (!captured) {
    console.log(`✗  ${site.name} — gave up after retries`);
  }
  await sleep(1500);
}

await browser.close();
console.log('Done.');
