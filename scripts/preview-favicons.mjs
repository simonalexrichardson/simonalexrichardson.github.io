import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../tmp-favicons');
mkdirSync(out, { recursive: true });

// rx="0" — full-bleed orange, no transparent corners.
const candidates = {
  brackets: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#c85a12"/>
    <path d="M 23 21 L 13 32 L 23 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 41 21 L 51 32 L 41 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#c85a12"/>
    <path d="M 22 16 L 42 32 L 22 48" stroke="#f8f7f4" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  diamond: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#c85a12"/>
    <polygon points="32,14 50,32 32,50 14,32" fill="#f8f7f4"/>
  </svg>`,
};

const browser = await chromium.launch();

for (const [name, svg] of Object.entries(candidates)) {
  writeFileSync(resolve(out, `${name}.svg`), svg);
  const page = await browser.newPage({ viewport: { width: 540, height: 200 }, deviceScaleFactor: 2 });
  await page.setContent(`<!doctype html><html><head><style>
    html,body{margin:0;padding:0;background:#0f0e0c;display:flex;align-items:center;justify-content:center;height:200px;gap:48px;font-family:ui-sans-serif,system-ui,sans-serif}
    .group{display:flex;flex-direction:column;align-items:center;gap:6px;color:#a09d98;font-size:11px;letter-spacing:0.06em;text-transform:uppercase}
    .icon{display:block;overflow:hidden}
  </style></head><body>
    <div class="group"><div class="icon" style="width:16px;height:16px">${svg.replace('<svg ', '<svg width="16" height="16" ')}</div><span>16</span></div>
    <div class="group"><div class="icon" style="width:32px;height:32px">${svg.replace('<svg ', '<svg width="32" height="32" ')}</div><span>32</span></div>
    <div class="group"><div class="icon" style="width:128px;height:128px">${svg.replace('<svg ', '<svg width="128" height="128" ')}</div><span>128</span></div>
  </body></html>`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: resolve(out, `${name}-preview.png`), clip: { x: 0, y: 0, width: 540, height: 200 } });
  await page.close();
  console.log(`✓  ${name}`);
}

await browser.close();
