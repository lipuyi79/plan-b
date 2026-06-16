export const appConfig = {
  name: 'ProductFrame AI',
  tagline: 'AI product photos that keep the real product intact.',
  description:
    'Create conversion-ready product photos for Shopify, Amazon, Etsy, and DTC stores without warping logos, handles, bottle shapes, or packaging.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
};

/**
 * Legal / compliance metadata shared across the Terms, Privacy, Refund, and
 * Disclaimer pages. Centralized so the operator name, contact address, and
 * effective date stay consistent everywhere (and are easy to update for KYC /
 * payment-processor review).
 */
export const legalConfig = {
  /** Public-facing operator name. Update if you incorporate a legal entity. */
  entity: 'ProductFrame AI',
  /** Where legal / privacy / refund inquiries are sent. */
  contactEmail: '15018647951@163.com',
  /** Short, non-address operator location shown in the footer. */
  region: 'Operated remotely · United States',
  /**
   * Effective date shown at the top of each policy. Bump this string whenever
   * you materially change any policy so the version is auditable.
   */
  effectiveDate: 'June 15, 2026',
  /** Governing-law summary used in Terms. US-first with GDPR accommodations. */
  governingLaw: 'the State of Delaware, United States',
};

/** Legal pages exposed in the footer (and reused by payment-processor review). */
export const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refund', label: 'Refund Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/cookies', label: 'Cookie Policy' },
] as const;

/** Company / informational pages exposed in the footer. */
export const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Social profiles shown in the footer. `href: ''` is treated as "not set yet"
 * and is hidden — fill in the real URL to make the icon appear. `icon` is a
 * lucide-react icon name resolved in the footer.
 */
export const socialLinks = [
  { label: 'X (Twitter)', href: 'https://x.com/lpy520ow', icon: 'twitter' },
  { label: 'LinkedIn', href: '', icon: 'linkedin' },
  { label: 'Instagram', href: '', icon: 'instagram' },
] as const;

export const brandStyles = [
  {
    id: 'luxury-minimal',
    name: 'Luxury Minimal',
    dna: {
      lighting: 'soft studio key light',
      shadow: 'natural contact shadow',
      color: 'white, warm gray, champagne accents',
      camera: '85mm product lens, low distortion',
      mood: 'premium, quiet, editorial',
    },
  },
  {
    id: 'apple-clean',
    name: 'Apple Clean',
    dna: {
      lighting: 'large diffused light from upper left',
      shadow: 'subtle soft gray grounding shadow',
      color: 'white, silver, graphite, pale blue',
      camera: '70mm lens, straight-on commercial angle',
      mood: 'clean, modern, technical',
    },
  },
  {
    id: 'nordic-home',
    name: 'Nordic Home',
    dna: {
      lighting: 'window light with soft falloff',
      shadow: 'warm natural tabletop shadow',
      color: 'oak, linen, stone, muted green',
      camera: '50mm lifestyle product lens',
      mood: 'calm, organic, home-focused',
    },
  },
  {
    id: 'beauty-gloss',
    name: 'Beauty Gloss',
    dna: {
      lighting: 'controlled beauty dish and rim light',
      shadow: 'defined contact shadow with glossy reflection',
      color: 'cream, blush, glass, high-gloss black',
      camera: '100mm macro product lens',
      mood: 'polished, premium, cosmetic campaign',
    },
  },
  {
    id: 'outdoor-active',
    name: 'Outdoor Active',
    dna: {
      lighting: 'golden hour directional sunlight',
      shadow: 'realistic terrain contact shadow',
      color: 'sand, forest, sky, slate',
      camera: '35mm commercial lifestyle angle',
      mood: 'rugged, aspirational, energetic',
    },
  },
] as const;

export const seedPool = [1001, 1002, 1003, 1004, 1005, 1006];

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    credits: 200,
    audience: 'Students and first-time sellers',
    featured: false,
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 19,
    credits: 800,
    audience: 'Etsy, Shopify, and creator-led stores',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39,
    credits: 2500,
    audience: 'Designers and AI content studios',
    featured: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    credits: 6000,
    audience: 'Small ecommerce teams',
    featured: false,
  },
] as const;

export const freeMonthlyCredits = 4;
