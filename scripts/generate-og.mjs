import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images');

const html = `
<!doctype html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    font-family: 'Inter', system-ui, sans-serif;
    background: #f8f7f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 96px;
    color: #18170f;
    position: relative;
  }
  .mark {
    width: 128px;
    height: 128px;
    background: #c85a12;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 56px;
  }
  .mark svg { width: 80px; height: 80px; }
  h1 {
    font-size: 88px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 24px;
  }
  p {
    font-size: 32px;
    color: #6b6860;
    line-height: 1.4;
    max-width: 880px;
  }
  .url {
    position: absolute;
    bottom: 56px;
    left: 96px;
    font-size: 22px;
    color: #a09d98;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .pulse {
    position: absolute;
    bottom: 56px;
    right: 96px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #a09d98;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #16a34a;
  }
</style>
</head>
<body>
  <div class="mark"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M 23 21 L 13 32 L 23 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 41 21 L 51 32 L 41 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg></div>
  <h1>Simon Richardson</h1>
  <p>Web design &amp; development — marketing sites, custom apps, AI features.</p>
  <div class="url">simonrichardson.dev</div>
  <div class="pulse"><span class="dot"></span> Available</div>
</body>
</html>
`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({
  path: `${outDir}/og-image.png`,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
console.log('og-image.png');
await browser.close();
