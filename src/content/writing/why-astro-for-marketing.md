---
title: 'Why I built this site on Astro'
summary: "What Astro got right for a portfolio site, and where I still reach for Next.js."
tags: ['Astro', 'Next.js']
publishedAt: 2026-04-21
---

The pitch for Astro is straightforward: ship as static HTML by default, add islands of interactivity only where you actually need them. For most marketing sites that's exactly the trade-off you want — content-first, near-zero JS in the bundle, and a build that finishes in a couple of seconds.

I built `simonrichardson.dev` on Astro and it's been frictionless. A few specific wins:

## Content collections

Define a Zod schema for blog posts or case studies, drop markdown files in a folder, get type-safe rendering. The schema is the documentation; if a frontmatter field is missing, the build fails loud. No silently broken posts.

## The output is just HTML

When something looks wrong, View Source shows you the actual rendered markup. No client framework hydration mystery, no "is this a server component or a client component" detective work. The thing on disk is the thing the browser gets.

## Sitemap and image handling are a config line each

`@astrojs/sitemap` auto-discovers every route. Add a page, it shows up in the sitemap on next build. Image lazy-loading and dimension hints are the default. I didn't have to configure either of them.

## Where Astro stops paying off

Stateful apps. The moment you need a real session, server actions, route handlers that actually do work, or a component tree that re-renders based on user input, Astro's strengths become irrelevant and Next.js's start to matter. Quiet Loon — the product I co-founded — runs on Next.js for exactly that reason.

The rule of thumb I use:

- **Astro** for sites that exist to be read.
- **Next.js** for sites that exist to be used.

Most freelance work falls cleanly into one or the other. The rare middle case — a marketing site with a small dashboard — usually means two deployments, not one over-stretched framework.
