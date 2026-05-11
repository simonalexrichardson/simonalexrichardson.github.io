import { chromium } from 'playwright';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${outDir}/_review-full.png`, fullPage: true });
console.log('done');
await browser.close();
