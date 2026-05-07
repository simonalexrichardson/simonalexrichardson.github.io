---
title: 'Where AI earns its keep'
summary: "After a year of shipping LLM features, the heuristics I use to decide whether one belongs in a product."
tags: ['AI', 'Claude', 'Product']
publishedAt: 2026-04-30
---

Most "AI features" don't need to exist. The ones that do tend to share a few traits.

After a year of shipping Claude integrations into client work and my own products, here's the rough shape of what's worked and what hasn't.

## Where it earns its keep

- **Parsing unstructured input.** Turning "school pickup Tuesday at 3" into a date-bound task. Email triage. Free-text search that resolves to a structured query. The user does less work; the model does the only kind of work it's actually good at.
- **Summarising state.** Weekly digests, change-of-status updates, "what happened while you were out" recaps. Bounded input, bounded output, low stakes if it's slightly off.
- **Bridging two formats.** Markdown to email-friendly HTML. Structured data to natural-language responses. Code to documentation. The hard part of these jobs is rewriting, not deciding *what* to write — exactly where LLMs are strongest.

## Where it usually doesn't

- **Open-ended chat surfaces.** Most products do not need a chatbot. If your users would have asked a chatbot the same question twice, your product needed a clearer affordance, not an LLM.
- **Anything that needs to be deterministic.** Pricing, legal disclosures, anything where "approximately right" is wrong.
- **Filling space.** An "AI-powered" sticker on a feature that already worked fine.

## The cost test

The cost economics are usually the deciding factor. If you can't run the call inside a budget that fits your unit economics, it doesn't matter how good the output is. For consumer subscription products especially, "LLM responds to anything" doesn't pencil out.

On Quiet Loon, Claude is doing two specific things — parsing free-text input into structured items, and writing the weekly digest. Both are bounded, both cacheable, both have clear value. We deliberately avoided putting a chat surface anywhere; it's a list app, not a chatbot, and the unit economics don't work at consumer subscription pricing.

The version of this advice that matters: figure out what the model is uniquely good at — language, ambiguity, transformation — and use it for *that*. Skip the chat box.
