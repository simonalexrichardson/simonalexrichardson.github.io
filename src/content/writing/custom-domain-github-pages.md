---
title: 'Custom domain on GitHub Pages with Cloudflare DNS'
summary: 'The exact DNS records, GitHub settings, and gotchas to get a domain serving over HTTPS in about ten minutes.'
tags: ['GitHub Pages', 'Cloudflare', 'DNS']
publishedAt: 2026-05-05
---

Moving this site from `simonalexrichardson.github.io` to `simonrichardson.dev` was supposed to take five minutes. It took ten, because I read the docs once and that was enough. Here's the version with no fluff.

## Cloudflare DNS records

In the `simonrichardson.dev` zone, add five records:

| Type  | Name  | Content                          | Proxy        |
| ----- | ----- | -------------------------------- | ------------ |
| A     | @     | 185.199.108.153                  | DNS only     |
| A     | @     | 185.199.109.153                  | DNS only     |
| A     | @     | 185.199.110.153                  | DNS only     |
| A     | @     | 185.199.111.153                  | DNS only     |
| CNAME | www   | simonalexrichardson.github.io    | DNS only     |

The proxy mode matters. Set them to **DNS only** (grey cloud), not Proxied (orange). GitHub Pages needs the requests to hit its servers directly to provision the Let's Encrypt cert. Once the cert is live you can flip them to Proxied if you want Cloudflare's caching, but it's optional.

## SSL/TLS mode

In Cloudflare's SSL/TLS settings, set encryption mode to **Full**, not Flexible. Flexible breaks GitHub's internal HTTPS redirects and leaves you in a redirect loop.

## CNAME file in the repo

Commit a file at `public/CNAME` (no extension) containing just the domain:

```
simonrichardson.dev
```

GitHub auto-detects this on the next deploy and treats it as the custom domain.

## GitHub Pages settings

Set the custom domain in repo settings (or via the API):

```sh
gh api -X PUT repos/OWNER/REPO/pages -f cname=simonrichardson.dev
```

GitHub kicks off cert provisioning. Watch its state via:

```sh
gh api repos/OWNER/REPO/pages
```

`https_certificate.state` runs `authorization_created` → `approved`, usually in 1–5 minutes once DNS resolves. Then enable HTTPS enforcement:

```sh
gh api -X PUT repos/OWNER/REPO/pages -F https_enforced=true
```

## Update the site

Anywhere the old `*.github.io` domain is hardcoded:

- `astro.config.mjs` `site:`
- JSON-LD `url`
- Footer `siteUrl` / share-button URLs
- `robots.txt` sitemap line
- `README.md`

GitHub auto-301s the old URL to the new one, so things keep working, but using the canonical URL directly avoids the redirect hop and stops bleeding link equity.

That's it. Once HTTPS is enforced, hit URL Inspection in Search Console and request indexing of the new homepage. Old URLs continue to redirect.
