import { chromium } from 'playwright';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(resolve(__dirname, '../public/favicon.svg'), 'utf8');
const out = resolve(__dirname, '../public/favicon.ico');

const sizes = [16, 32, 48];

const html = (size) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:transparent}
    svg{display:block;width:${size}px;height:${size}px}
  </style></head><body>${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`;

const browser = await chromium.launch();
const pngs = [];

for (const size of sizes) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(html(size));
  const buf = await page.screenshot({
    type: 'png',
    omitBackground: false,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  pngs.push(buf);
  await page.close();
}

await browser.close();

const ico = await pngToIco(pngs);
writeFileSync(out, ico);
console.log(`✓  favicon.ico (${sizes.join('+')}) — ${ico.length} bytes`);
