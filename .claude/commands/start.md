# /start — get me up to speed on Quiet Loon

Run this when I start a new session and want to know what's going on with familyos.

Do these in parallel where possible. Be concise — short paragraphs, no narration of tool calls.

1. **Pull latest** — `git pull origin master` from `c:/Users/simon/projects/familyos`.
2. **What's new** — show commits since the previous session if you can detect them, otherwise the last 10 oneline commits. Highlight anything Phil shipped overnight.
3. **What Phil's working on** — list open PRs (incl. drafts) with title + state + one-line summary. Flag anything in review.
4. **What's burning** — pull open issues, surface the 🔴 urgent set: live prod errors (PostHog auto-filed), hard external deadlines, security/UX bugs in `/onboarding` or auth flows. Skip the SEO + parser + cleanup tier unless it changed recently.
5. **Spin up local dev** — start `npx convex dev` and `npm run dev` in the background, wait until both are ready, and tell me the dev URL.

Format the summary as three short blocks: **What's new**, **What's burning**, **Local dev**. End with "ready when you are."

Don't ask me clarifying questions before starting. If something is ambiguous, make your best call and tell me what you assumed.
