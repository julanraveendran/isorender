# MEMORY.md

## Julan

- Julan named me **julesbotv2** on 2026-03-24.
- Julan is a 23-year-old MEng Chemical with Environmental Engineering student at the University of Nottingham, and also a solo founder / indie hacker.
- Public presence: X = @julezrz, site = julan.dev, newsletter = "The Distribution".

## Julan's priorities and working style

- He wants production-ready, deployed systems rather than prototypes.
- Preferred deployment stack: Railway for backends, Vercel for frontends.
- Uses Stripe live keys from day one.
- Values speed: build fast, launch fast, iterate.
- Prefers clean, modern UI with Tailwind + shadcn/ui.
- Does not want placeholder/demo data; prefers real functionality only.
- Wants SEO included from the start.
- "Build it" means full working code pushed to GitHub and ready to deploy.

## Current ventures

### IsoRender
- **MAIN FEATURE (PIVOT):** Convert ANY photo into an interactive 3D space you can walk through — upload a room/building photo and explore it in immersive 3D.
- Also supports: 2D floor plans (upload or Rightmove/Zoopla links) → 3D isometric renders.
- Competitors/Inspiration: OpenArt Worlds, Plan3D, Nano Banana 2
- Stack: React + Vite on Vercel, Express on Railway, Claude for image analysis, GPT-4.1 for 3D generation, Stripe for payments.
- Pricing: Starter £7 / 10 credits, Pro £19 / 50 credits, Agency £49 / 150 credits.
- Target: UK estate agents, architects, developers, homeowners wanting renovation viz.
- Goal: become the go-to tool for "photo → 3D walkthrough" in UK property market.

### Karmora
- AI autonomous Reddit lead generation agent and competitor to Tydal.co.
- Stack: Express, React, Tailwind, shadcn/ui, PostgreSQL on Railway, Stripe in USD.
- Pricing: Starter $19/mo, Growth $49/mo, Agency $99/mo with 14-day free trial.
- Goal: launch as a premium Reddit lead gen tool while undercutting competitors.

## Academic work

- Julan's final-year MEng project is on Hydrothermal Carbonisation (HTC) of biomass feedstocks (wood and garden waste).
- Needs technically rigorous research-paper-standard writing.
- Key analysis areas: elemental composition (C, H, N, O), HHV with Channiwala & Parikh formula, gas production data.
- Supervisor: Will.
- Goal: finish with a First Class.

## Assistant identity

- Julan wants my vibe to feel like a London-raised 24-year-old like him, helping him sort his life out for success.
- Tone should be sharp, grounded, practical, and ambitious rather than corporate or overly robotic.

## Agent operating preference from Julan

When choosing models for downstream agent work, minimise cost by default:
- Default to TIER_FAST unless there is a clear reason to go higher.
- Escalate to TIER_GENERAL for ordinary multi-step work needing more nuance.
- Use TIER_REASONING only for complex reasoning, high-stakes logic, substantial code/debugging, maths/optimisation, or explicitly requested deep reasoning.
- Expected output format for routing decisions:
  - tier
  - reason
  - max_budget_tokens
  - temperature
  - notes

### Current tier mapping
- TIER_FAST = google/gemini-2.5-flash (`flash`)
- TIER_GENERAL = openrouter/minimax/minimax-m2.5 (`minimax`) — current default
- TIER_REASONING = openai/gpt-5.4 (`gpt`)
- Strong non-default upgrade option: google/gemini-2.5-pro (`pro`)

### Routing guidance
- Use `flash` for greetings, short answers, summaries, extraction, light transforms, and cheap tool orchestration.
- Use `minimax` for most normal work by default.
- Use `gpt` only when the task is genuinely difficult, code-heavy, or high-stakes.
- Use `pro` when stronger reasoning is useful but `gpt` feels unnecessarily expensive.
