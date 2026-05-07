import { chromium } from 'playwright';
import { readdirSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csDir = resolve(__dirname, '../src/content/case-studies');
const outDir = resolve(__dirname, '../public/images/og');
mkdirSync(outDir, { recursive: true });

// Tiny YAML frontmatter parser — case studies follow a fixed shape, no need for a full lib.
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  return out;
}

const html = ({ project, role, title }) => `
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
    width: 96px;
    height: 96px;
    background: #c85a12;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 48px;
  }
  .mark svg { width: 60px; height: 60px; }
  .eyebrow {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c85a12;
    margin-bottom: 22px;
  }
  h1 {
    font-size: 80px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 24px;
    max-width: 940px;
  }
  .role {
    font-size: 28px;
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
  .author {
    position: absolute;
    bottom: 56px;
    right: 96px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #a09d98;
  }
</style>
</head>
<body>
  <div class="mark"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M 23 21 L 13 32 L 23 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 41 21 L 51 32 L 41 43" stroke="#f8f7f4" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg></div>
  <p class="eyebrow">Case study · ${escapeHtml(project)}</p>
  <h1>${escapeHtml(title)}</h1>
  <p class="role">${escapeHtml(role)}</p>
  <div class="url">simonrichardson.dev</div>
  <div class="author">Simon Richardson</div>
</body>
</html>
`;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const browser = await chromium.launch();

const files = readdirSync(csDir).filter((f) => f.endsWith('.md'));
for (const f of files) {
  const md = readFileSync(join(csDir, f), 'utf8');
  const fm = parseFrontmatter(md);
  if (fm.draft === 'true') {
    console.log(`-  ${f} (draft, skipped)`);
    continue;
  }
  const slug = f.replace(/\.md$/, '');
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html({
    project: fm.project ?? slug,
    role: fm.role ?? '',
    title: fm.title ?? fm.project ?? slug,
  }), { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: join(outDir, `${slug}.png`),
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await page.close();
  console.log(`✓  ${slug}.png`);
}

await browser.close();
