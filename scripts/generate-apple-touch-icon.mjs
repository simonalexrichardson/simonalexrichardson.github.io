import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(resolve(__dirname, '../public/favicon.svg'), 'utf8');
const out = resolve(__dirname, '../public/apple-touch-icon.png');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:transparent}
  svg{display:block;width:180px;height:180px}
</style></head><body>${svg.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.screenshot({ path: out, type: 'png', omitBackground: false, clip: { x: 0, y: 0, width: 180, height: 180 } });
await browser.close();
console.log(`✓  apple-touch-icon.png (180x180)`);
