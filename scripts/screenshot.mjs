import { chromium } from 'playwright';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');

const sites = [
  { name: 'quietloon',    url: 'https://quietloon.com' },
  { name: 'reaperdrones', url: 'https://reaperdrones.com' },
  { name: 'altitude',     url: 'https://altitudedronesurveying.vercel.app' },
  { name: 'nonstarters',  url: 'https://thenonstarters.vercel.app' },
  { name: 'shabbyroads',  url: 'https://shabbyroads.vercel.app' },
];

const browser = await chromium.launch();

for (const site of sites) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch {
    // networkidle timed out — page probably loaded, just has open connections
  }
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: `${outDir}/${site.name}.png`,
    clip: { x: 0, y: 0, width: 1280, height: 800 },
  });
  console.log(`✓  ${site.name}`);
  await page.close();
}

await browser.close();
console.log('Done.');
