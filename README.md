# simonrichardson.dev

Personal site for Simon Richardson — web design and development. Built with [Astro](https://astro.build) and deployed to GitHub Pages. Linked from "Built by Simon" footer credits on client sites.

## Local development

```bash
npm install
npm run dev      # starts dev server at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages automatically.

**First-time setup:** after pushing this repo, go to **Settings → Pages → Source** and set it to **GitHub Actions** (not "Deploy from a branch"). The workflow will then handle everything on push.

---

## Placeholders to fill in

Before the site is ready to share, replace the following:

1. **Contact form Worker** — see [worker/README.md](worker/README.md) for the Resend + Cloudflare Worker setup. Update `CONTACT_ENDPOINT` in `src/components/Contact.astro` to point at your deployed Worker.

2. **Altitude Drone Surveying URL** — in `src/components/Work.astro`, replace the `https://example.com` placeholder with the live URL.

3. **The Non-Starters URL** — same file, replace the `https://example.com` for The Non-Starters.

4. **Shabby Road URL** — same file, replace the `https://example.com` for Shabby Road.

5. **Client site taglines** — in `src/components/Work.astro`, update the `description` fields for Altitude, The Non-Starters, and Shabby Road with the real one-line descriptions.

6. **Screenshot images** — add the following to `public/images/`:
   - `altitude.jpg`
   - `nonstarters.jpg`
   - `shabbyroads.jpg`
   Cards display a neutral placeholder background gracefully until images are added.

7. **OG image** — add `public/images/og-image.jpg` (recommended: 1200×630px). Used as the social sharing image.

8. **Favicon** — replace `public/favicon.svg` and `public/favicon.ico` with your own.

---

## Adding a blog later

When you're ready to add `/blog`:

1. Define a content collection in `src/content/config.ts` using Astro's `defineCollection`. See the [Content Collections docs](https://docs.astro.build/en/guides/content-collections/).
2. Add posts as `.md` or `.mdx` files in `src/content/blog/`.
3. Create `src/pages/blog/index.astro` (list page) and `src/pages/blog/[slug].astro` (post template).

The `src/content/` folder already exists — just add the config and files when you're ready. No other configuration changes needed.

For `/case-studies`, follow the same pattern with a separate collection.
