# simonrichardson.dev

Services site for Simon Richardson: bespoke websites for small businesses, trades, bands and clubs in Hertfordshire and Cambridgeshire. Built with [Astro](https://astro.build), hosted on GitHub Pages, with forms handled by a small Cloudflare Worker that emails via Resend.

The site has one job: turn someone who has heard of Simon into a WhatsApp message or an enquiry through the contact form. Adding a website to that form asks for the free site review, so there's only one form.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deployment

Pushes to `main` build the site and deploy it to GitHub Pages through `.github/workflows/deploy.yml`.

**Deploy the Worker before the first push of this version.** The new forms send fields the old Worker doesn't understand. The new Worker still accepts the old form, so deploying it first is safe:

```bash
cd worker && npx wrangler deploy
```

## What to fill in before going live

Everything below is in `src/config/site.ts` unless it says otherwise.

- [ ] **Photo:** replace `src/assets/simon.jpg` with a sharper one, at least 1000px wide. The current one is 600px and soft.
- [ ] **Second photo:** the About section reuses the same image. Point `src/components/home/About.astro` at a different one, ideally behind the kit.
- [ ] **Prices:** confirm `pricing`.

## Environment variables and secrets

| Name | Where | What for |
|---|---|---|
| `RESEND_API_KEY` | Worker secret: `cd worker && npx wrangler secret put RESEND_API_KEY` | Sends the form emails |
| `TO_EMAIL`, `FROM_EMAIL`, `ALLOWED_ORIGIN` | `worker/wrangler.toml` | Where forms go and which site may post to the Worker |
| `RESEND_API_BASE` | Local testing only | Points the Worker at a stub instead of Resend |
| `PUBLIC_FORM_ENDPOINT` | Build time, local testing only | Points the forms at a local Worker |

The site itself needs no secrets. `PUBLIC_RESEND_API_KEY` in `.env` and in `deploy.yml` isn't used by anything, and the value in `.env` is rejected by Resend as invalid, so both can go.

## How the forms work

`src/components/LeadForm.astro` posts to the Worker in `worker/`, which checks the origin, drops anything that fills the honeypot field, validates the fields, and emails Simon through Resend with `reply_to` set to the enquirer. See [worker/README.md](worker/README.md).

To send a real test once you have a working key, send to Resend's `delivered@resend.dev` address so nothing lands in a real inbox.

## Lighthouse (mobile, production build, localhost)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 |
| `/contact` | 99 | 100 | 100 | 100 |
| `/privacy` | 99 | 100 | 100 | 100 |

Re-run it after adding real photos, because images are the most likely thing to pull the homepage below 95.

## Where things live

- `src/config/site.ts`: every business detail
- `src/pages/index.astro` and `src/components/home/`: the homepage
- `src/data/projects.ts` and `src/assets/work/`: the projects and concept sites on the homepage
- `src/components/home/Testimonials.astro`: client quotes. Never add one that isn't real
- `src/pages/contact.astro`, `privacy.astro`: the other pages
- `src/pages/writing/`: posts, linked from the footer only
- `src/content/`: blog posts and case studies
- `scripts/generate-og.mjs`: regenerates the social sharing image
