# Contact form worker

Cloudflare Worker that accepts contact-form POSTs from `simonrichardson.dev` and forwards them to email via the Resend API.

## One-time setup

### 1. Resend

1. Sign up at [resend.com](https://resend.com)
2. **Domains → Add domain** → `simonrichardson.dev`
3. Resend shows DNS records (a few `TXT` for SPF + DKIM, optionally a `MX`). Add each in Cloudflare DNS for `simonrichardson.dev`. Set proxy to **DNS only** (grey cloud) for these records.
4. Wait for Resend to mark the domain "Verified" (usually a few minutes)
5. **API Keys → Create API Key**, scope: **Sending access**, domain: `simonrichardson.dev`. Copy the key — you'll only see it once.

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
