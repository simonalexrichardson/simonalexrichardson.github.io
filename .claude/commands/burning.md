# /burning — what's urgent right now

Pull and triage open issues by urgency. Skip the planned/normal/low tier — I only want the 🔴 fires.

1. `git pull origin master` from `c:/Users/simon/projects/familyos` (quietly, no need to summarise the pull itself).
2. `gh issue list --state open --limit 50 --json number,title,createdAt,updatedAt,author` and the same for open PRs.
3. Surface anything matching these urgent criteria:
   - **Live prod errors** auto-filed by PostHog (`author=app/posthog-eu`).
   - **Hard external deadlines** mentioned in the issue title or body (Gemini migration, Node.js migration, Stripe/Postmark/Twilio API sunsets, etc.).
   - **Security or auth bugs** affecting sign-up / onboarding / invite flow.
   - **Customer-impacting bugs** filed within the last 48h.
   - Anything flagged with brute-force / data-loss / billing risk.
4. For each, give: `[#N] one-line what + why-now`. Order by severity (live errors and deadlines first).
5. End with a one-line **"single best action right now"** recommendation.

Skip: SEO, parser quality, cleanup, eval harness, marketing leftovers — unless one of them has changed status or moved up the priority chain recently.

Don't show me the long-form summary unless I ask. Keep it scannable.
