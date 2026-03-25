# IsoRender

AI-powered tool that converts 2D floor plans into stunning isometric 3D renders. Built for UK estate agents, architects, property developers, and letting agents.

**Live at**: [isorender.com](https://isorender.com)

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/julanraveendran/isorender.git
cd isorender

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then edit .env with your actual API keys

# 4. Run the dev server
npm run dev
# Opens at http://localhost:5000
```

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + SQLite (Drizzle ORM)
- **AI**: Anthropic Claude (floor plan analysis) + OpenAI GPT-4.1 (image generation)
- **Payments**: Stripe (checkout sessions + webhooks)
- **Frontend Hosting**: Vercel (isorender.com)
- **Backend Hosting**: Railway (isorender-production.up.railway.app)

## Project Structure

```
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx    # Homepage
│   │   │   ├── Generator.tsx  # Render generator + paywall
│   │   │   ├── seo/           # 12 SEO landing pages
│   │   │   └── blog/          # 20 blog articles
│   │   ├── components/        # shadcn UI components
│   │   └── lib/queryClient.ts # API configuration
│   ├── public/                # Static files (robots.txt, sitemap.xml, llms.txt)
│   └── index.html             # HTML template + Tawk.to chat
├── server/
│   ├── routes.ts              # All API endpoints (render, Stripe, credits)
│   ├── storage.ts             # Database operations
│   └── index.ts               # Express server + CORS
├── shared/schema.ts           # Database schema
├── vercel.json                # Vercel config (API proxy to Railway)
└── .env.example               # Environment variable template
```

## Deployment

Push to `main` branch → auto-deploys to both Vercel (frontend) and Railway (backend).

```bash
git add -A
git commit -m "your changes"
git push origin main
```

## Environment Variables

See `.env.example` for the full list. Required:
- `ANTHROPIC_API_KEY` — Claude API for floor plan analysis
- `OPENAI_API_KEY` — GPT-4.1 for image generation
- `STRIPE_SECRET_KEY` — Stripe payments
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook verification

## Key Features

- Upload floor plan images or paste Rightmove/Zoopla URLs
- AI-powered 2-step pipeline: Claude analyzes layout → GPT-4.1 generates 3D render
- 3 free renders for every visitor, then Stripe paywall
- 12 SEO landing pages + 20 blog articles
- Google Search Console verified and indexing
