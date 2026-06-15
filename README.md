# Safe Solution — Premium Bin Washing Website

A full-stack Next.js 15 website for a premium residential & commercial bin-washing service in Cape Town, South Africa.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** — custom design system (navy/aqua/mint palette)
- **Supabase** — bookings, contact messages, subscriptions
- **Anthropic Claude API** — AI chat assistant (serverless, key never exposed client-side)
- **PayFast** — ZAR payment integration (stubbed, ready to wire up)

---

## Quick Start

### 1. Clone & install

```bash
cd Dustbin-service
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `PAYFAST_MERCHANT_ID` | payfast.co.za |
| `PAYFAST_MERCHANT_KEY` | payfast.co.za |
| `PAYFAST_PASSPHRASE` | payfast.co.za |
| `NEXT_PUBLIC_APP_URL` | Your domain (or `http://localhost:3000`) |

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. This creates: `bookings`, `contact_messages`, `subscriptions`, `customers`, `pricing_tiers`, `service_areas` tables with Row Level Security

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customization

### Brand details

Edit `lib/constants.ts`:

```ts
export const BRAND = {
  name: "Safe Solution",
  phone: "+27 XX XXX XXXX",      // ← replace
  email: "hello@safesolution.co.za",
  whatsapp: "27XXXXXXXXXX",      // ← digits only, no +
  ...
};
```

### Service suburbs

Update the `SERVICE_SUBURBS` array in `lib/constants.ts`.

### Pricing

Update the `PRICING_TIERS` and `COMMERCIAL_TIERS` arrays in `lib/constants.ts`.

### AI assistant knowledge

Update `AI_SYSTEM_PROMPT` in `lib/constants.ts` — this is the system prompt sent to Claude on every chat message. It defines the brand voice, services, pricing, and service area the assistant knows about.

The chat API route is at `app/api/chat/route.ts` — it uses `claude-haiku-4-5-20251001` for fast, cost-effective responses.

### PayFast integration

The `PAYFAST_*` env vars are pre-wired. Implement payment flow by:
1. Creating a `/api/payfast/notify` route to handle IPN callbacks
2. Generating a PayFast payment URL in the booking confirmation step
3. Toggling `PAYFAST_ENV=sandbox` → `live` when ready

---

## Project Structure

```
app/
  page.tsx              # Homepage (all sections)
  pricing/page.tsx      # Pricing & comparison table
  booking/page.tsx      # Multi-step booking form
  about/page.tsx        # Brand story, team, sustainability
  contact/page.tsx      # Contact form + WhatsApp
  api/
    chat/route.ts       # Claude AI chat (server-side)
    bookings/route.ts   # Supabase booking CRUD
    contact/route.ts    # Supabase contact message
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # robots.txt
  layout.tsx            # Root layout + fonts + metadata

components/
  ui/
    Navbar.tsx          # Sticky nav with mobile menu
    Footer.tsx          # Footer with social links
    AnimatedCounter.tsx # Intersection-observer scroll counter
    Accordion.tsx       # FAQ accordion
    BeforeAfterSlider.tsx # Drag-to-compare before/after
  sections/             # Homepage section components
  chat/
    ChatWidget.tsx      # Floating AI chat widget

lib/
  constants.ts          # All editable brand/content config
  supabase.ts           # Supabase client + types
  utils.ts              # cn(), formatZAR()

supabase-schema.sql     # Run in Supabase SQL editor
.env.example            # Environment variable template
```

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Add all env vars in Vercel dashboard → Project → Settings → Environment Variables.

### Other platforms

Any platform that supports Next.js 15 serverless functions (Netlify, Railway, Render) will work. Ensure all env vars are set.

---

## Items marked `[EDIT ME]`

Search the project for `[EDIT ME]` to find all placeholder content:

```bash
grep -r "\[EDIT ME\]" .
```

Common placeholders:
- Brand phone, email, WhatsApp in `lib/constants.ts`
- Team member names in `app/about/page.tsx`
- Google Maps embed in `app/contact/page.tsx` and `components/sections/ServiceArea.tsx`
- PayFast credentials in `.env.local`
