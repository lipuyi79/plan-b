import { pricingPlans } from './config';

export type PlanId = (typeof pricingPlans)[number]['id'];

export function getPlan(planId: string) {
  return pricingPlans.find((plan) => plan.id === planId);
}

// Creem uses pre-created products: build each plan's product in the Creem
// dashboard (set its price + monthly interval there) and expose the resulting
// product_id via env so test/live ids can differ without code changes.
function getCreemProductId(planId: string) {
  const envKey = `CREEM_PRODUCT_${planId.toUpperCase()}`;
  return process.env[envKey];
}

export async function createCreemCheckout(planId: string, userId: string, userEmail?: string) {
  const plan = getPlan(planId);

  if (!plan) {
    throw new Error('Unknown plan.');
  }

  const apiKey = process.env.CREEM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing CREEM_API_KEY.');
  }

  const productId = getCreemProductId(plan.id);

  if (!productId) {
    throw new Error(`Missing Creem product id for plan "${plan.id}". Set CREEM_PRODUCT_${plan.id.toUpperCase()}.`);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const response = await fetch('https://api.creem.io/v1/checkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      product_id: productId,
      ...(userEmail ? { customer: { email: userEmail } } : {}),
      metadata: {
        userId,
        planId: plan.id,
        credits: plan.credits,
      },
      success_url: `${appUrl}/dashboard/billing?checkout=success&plan=${plan.id}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Creem checkout failed: ${detail}`);
  }

  return response.json() as Promise<{ url?: string; checkout_url?: string }>;
}
