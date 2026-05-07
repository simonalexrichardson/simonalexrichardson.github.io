---
title: 'Migrating my contact form from Web3Forms to a Cloudflare Worker'
summary: 'Why I moved off a free form service for my own site, and the 30 lines of Worker code that replaced it.'
tags: ['Cloudflare', 'Resend', 'Forms']
publishedAt: 2026-04-12
---

Web3Forms is a great service. For most static sites, it's the cheapest way to take an enquiry without writing a backend. I'd been using it on this site since I launched, and I had no real complaints.

Then I needed the same access key on another project. Rather than juggle a shared key, I decided to free this site's slot and migrate.

The replacement is a Cloudflare Worker. About 30 lines of TypeScript that:

1. Validate the payload — required fields, length caps, email shape
2. Run a honeypot check — if the bot field is filled, silently return success so the bot doesn't retry
3. Forward the email to my inbox via the Resend API
4. Return `{ success: true }`, so the existing form JS doesn't need to change

The Resend API key lives as a Cloudflare Worker secret — never in source, never in the bundle. CORS is locked to my origin. The Worker is bound to `contact.simonrichardson.dev` so the form posts to a clean URL, not a `*.workers.dev` one.

Total cost: £0. The free tiers cover 100k Worker requests a day and 3,000 Resend emails a month. I will not be exceeding either.

The thing I lost: zero-code form-to-email. The thing I gained: full control over what gets emailed (formatting, fields, validation), no third-party limits, and a setup I now reach for on other sites that want a contact form without a backend.

Would I recommend the swap? Only if you want the control. Web3Forms remains the right answer for "static site, just needs a form, can't be bothered". But if you're already on Cloudflare for DNS, the Worker variant is genuinely as quick to set up the second time you do it.
