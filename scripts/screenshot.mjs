import { chromium } from 'playwright';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');

const sites = [
  { name: 'quietloon',    url: 'https://www.quietloon.com' },
  { name: 'reaperdrones', url: 'https://reaperdrones.com' },
  { name: 'altitude',     url: 'https://altitudedronesurveying.vercel.app' },
  { name: 'nonstarters',  url: 'https://thenonstarters.vercel.app' },
  { name: 'shabbyroads',  url: 'https://www.shabbyroadband.co.uk' },
  { name: 'voltline',     url: 'https://voltline-electrical.vercel.app' },
  { name: 'wildmoor',     url: 'https://wildmoor-gardens.vercel.app' },
  { name: 'northbridge',  url: 'https://northbridge-plumbing.vercel.app' },
  { name: 'beechwood',    url: 'https://beechwood-care.vercel.app' },
  { name: 'tideway',      url: 'https://tideway-swim-academy.vercel.app' },
];

const browser = await chromium.launch();
const context = await browser.newContext({ ignoreHTTPSErrors: true });

for (const site of sites) {
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch {
    // networkidle timed out — page probably loaded, just has open connections
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
}

await browser.close();
console.log('Done.');
