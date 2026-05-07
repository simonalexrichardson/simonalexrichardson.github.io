---
title: 'Quiet Loon — building a web app to carry the mental load'
project: 'Quiet Loon'
role: 'Co-founder, designer & developer'
summary: 'A web app for couples and households to share the running list of small things — the bin nights, the appointments, the half-finished thoughts — without one person having to remember it all.'
tags: ['Next.js', 'TypeScript', 'Postgres', 'Supabase', 'Stripe', 'Claude API', 'Vercel']
liveUrl: 'https://quietloon.com'
image: '/images/quietloon.jpg'
imageAlt: 'Screenshot of the Quiet Loon web app'
publishedAt: 2026-05-06
order: 1
draft: false
---

## The problem

Most households have one person who carries the running list — the invisible inventory of bin nights, school forms, half-finished thoughts, and "did we ever fix that thing?". The cost is invisible until something gets dropped, and even then it rarely lands as "we have a system problem" — it lands as "you forgot".

There are plenty of tools for this. None of them quite work. Generic todo apps treat household admin like project management. Notes apps don't share well. Calendars only catch dated items. Family planners are over-built and full of features no one asked for. So the load stays where it always was — in one person's head.

I wanted a tool that made the load visible without turning life admin into another app to maintain.

## What we built

A small, deliberate web app — not a feature-bloated planner. The brief we set ourselves:

- **Capture in seconds.** If logging something takes longer than just doing it, no one sticks with it. The capture surface is one input.
- **Shared by default.** Two people, one list. No invite flows, no role hierarchies, no permission settings.
- **Quietly intelligent.** Use AI where it earns its keep — parsing dates from natural-language input, generating a calm weekly summary, flagging items that have aged out — and nowhere it doesn't.

The home view is a single inbox. You type what's on your mind, hit enter, and Quiet Loon figures out the rest: whether it's a one-off task, a recurring chore, a date-bound reminder, or something to revisit. Your partner sees the same view. There are no projects, no tags, no priorities to set. The whole point is that you stop holding it; the app holds it.

## Stack and decisions

- **Next.js + React** for the app shell — Astro is brilliant for marketing sites but wrong for a stateful app of this kind
- **TypeScript** end to end
- **Postgres on Supabase**, with Supabase Auth for login
- **Stripe** for billing
- **Anthropic Claude** for natural-language parsing and the weekly digest
- **Vercel** for hosting

A few decisions worth calling out:

### Email-first auth, no OAuth

Households often share an email for life admin. OAuth would impose a personal-account identity onto a tool whose whole point is shared. Magic-link email login is slower per session but meets people where they already live.

### No push notifications in v1

This sounds wrong; everyone says you need notifications. But the pitch is "you don't have to remember." Push would create a new thing to check. The weekly digest goes out by email on Sunday evening, which is when households actually plan the week. Push can come later if I'm wrong about this.

### LLM where it pays, not LLM-everywhere

Claude is doing two specific jobs: parsing free-text input into structured items, and writing the weekly digest. Both are bounded, both cacheable, both have clear value. We avoided putting a chat surface anywhere — it's a list app, not a chatbot, and the cost economics of "AI that responds to anything" don't work at consumer subscription pricing.

## Outcome

Quiet Loon went live in May 2026. Paid from day one — no free tier, just a short trial — which makes early feedback much higher signal than a free product would.

Next, in priority order: a calmer mobile experience (PWA install + offline capture), iCal export so dated items show in whatever calendar people already use, and a "season change" prompt — Quiet Loon nudging you to retire stale items every quarter so the list doesn't accumulate sediment.

## What I'd do differently

We spent too long on the marketing site before launch. The landing page went through three rewrites trying to explain "mental load" to people who recognise it instantly if they have the problem, and won't be convinced by clever copy if they don't. Better to ship a thinner page sooner and let the audience self-identify.

---

**[Visit Quiet Loon →](https://quietloon.com)**
