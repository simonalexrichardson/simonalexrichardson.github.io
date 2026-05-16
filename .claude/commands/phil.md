# /phil — what Phil's making

Show me Phil's recent work on familyos.

1. Pull `c:/Users/simon/projects/familyos` if not done recently.
2. List **open PRs by Phil** (`gh pr list --state open --author philrich1-afk`). Include drafts. For each: `[#N] title · state · one-line summary from the PR body · reviewer status`.
3. List **PRs Phil merged in the last 24h** (`gh pr list --state merged --author philrich1-afk --search "merged:>$(date -d '24h ago' -Iseconds)"` or equivalent). One line each.
4. List **active branches Phil pushed to in the last 48h** that aren't yet PRs (compare `git branch -r --sort=-committerdate` against open PRs).
5. **Identify the active thread.** Phil tends to work in 3–4 PR sequences building on each other (e.g. PostHog PR1 → PR2 → PR3, signup funnel audit, observability rollout). Group his recent work by theme and tell me where he is in the sequence.

End with a one-line read on **what he's likely to ship next** based on the trajectory.

Be concise. Three short blocks max: **Open**, **Just merged**, **Where he's headed**.
