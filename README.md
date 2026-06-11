# ProductFrame AI

ProductFrame AI is a Next.js SaaS starter for US ecommerce sellers who need conversion-ready product photos without product deformation.

## Core positioning

The product should never be regenerated. The app uses a product-lock pipeline:

1. Upload product photo
2. Remove background / use transparent PNG
3. Lock original product pixels
4. Generate background only with Fal.ai `fal-ai/flux/dev`
5. Composite original product back with grounding shadow and optional reflection

This directly targets the three biggest product-photo AI issues:

- Product deformation: logos, handles, bottle caps, packaging and labels remain unchanged.
- Inconsistent style: Brand DNA and fixed seed pools keep SKU batches aligned.
- Fake AI look: grounding shadow, reflection layer, and photography templates improve realism.

## Stack

- Next.js App Router
- Tailwind CSS
- Fal.ai for image generation
- Supabase Cloud for auth/data/storage expansion
- Creem for subscription billing
- Vercel deployment

## Local setup

```bash
npm install
npm run dev
```

Create `.env.local` with:

```bash
FAL_KEY="..."
FAL_MODEL="fal-ai/flux/dev"
CREEM_API_KEY="..."
NEXT_PUBLIC_SUPABASE_URL="https://nkgwkmfbfjjpcrugufhx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Pages

- `/` landing page
- `/auth/sign-in` and `/auth/sign-up` Supabase Auth pages
- `/dashboard` user center with plan, credits, history, Brand DNA, downloads, and billing
- `/studio` protected product image studio
- `/pricing` Creem subscription plans

## API routes

- `POST /api/generate-background` creates background-only ecommerce scenes.
- `POST /api/remove-background` calls Fal background removal for future cutout automation.
- `POST /api/creem/checkout` starts a Creem checkout session.
- `POST /api/creem/webhook` receives Creem payment events.

## Billing plans

- Starter: $9/mo, 200 credits
- Creator: $19/mo, 800 credits
- Pro: $39/mo, 2500 credits
- Business: $79/mo, 6000 credits
- Free users: 4 generations per month

## Next production steps

- Run `supabase/migrations/202606100001_user_center.sql` in Supabase SQL Editor before using the user center.
- Store uploaded original product images and generated backgrounds in Supabase Storage.
- Verify Creem's live checkout and webhook schemas, then add webhook signature validation.
- Add server-side compositing with Sharp so exported images include product, shadow, and reflection as one final PNG/JPEG.
