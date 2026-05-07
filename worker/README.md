# Contact form worker

Cloudflare Worker that accepts contact-form POSTs from `simonrichardson.dev` and forwards them to email via the Resend API.

## One-time setup

### 1. Resend

1. Sign up at [resend.com](https://resend.com) using `simonalexrichardson@gmail.com`.
2. **API Keys → Create API Key** with **Sending access**. Copy the key — only shown once.

The Worker sends `from: onboarding@resend.dev` (Resend's shared address that works without domain verification) to the account's own email, which Resend allows in this restricted form. If you ever want emails to come from `enquiries@simonrichardson.dev` instead, you'll need to add and verify the domain in Resend (a few `TXT` records into Cloudflare DNS) and update `FROM_EMAIL` in `wrangler.toml`.

### 2. Worker deploy

```sh
cd worker
npm install
npx wrangler login           # opens browser, auth with Cloudflare
npx wrangler secret put RESEND_API_KEY
# paste the Resend key when prompted
npx wrangler deploy
```

Wrangler prints the deployed URL, e.g. `https://simonrichardson-contact.<your-subdomain>.workers.dev`.

### 3. Custom domain (optional but recommended)

To call the worker from `https://contact.simonrichardson.dev/` instead of the workers.dev URL:

1. Cloudflare dashboard → **Workers & Pages → simonrichardson-contact → Settings → Domains & Routes → Add Custom Domain**
2. Enter `contact.simonrichardson.dev` — Cloudflare adds the DNS record automatically.
3. Update the `fetch` URL in [src/components/Contact.astro](../src/components/Contact.astro) to `https://contact.simonrichardson.dev/`.

## Local testing

```sh
cd worker
npx wrangler dev
```

Worker listens on `http://localhost:8787`. To test, change `ALLOWED_ORIGIN` in `wrangler.toml` temporarily to `http://localhost:4321` and run the Astro dev server alongside.

## Updating

```sh
cd worker
npx wrangler deploy
```
