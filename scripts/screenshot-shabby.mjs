import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
try {
  await page.goto('https://shabbyroads.vercel.app/gigs', { waitUntil: 'networkidle', timeout: 20000 });
} catch { /* page loaded, ignore open connections */ }
await page.waitForTimeout(1500);
await page.screenshot({
  path: `${outDir}/shabbyroads.png`,
  clip: { x: 0, y: 0, width: 1280, height: 800 },
});
console.log('✓ shabbyroads (gigs page)');
await browser.close();
