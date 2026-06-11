import { pricingPlans } from './config';

export type PlanId = (typeof pricingPlans)[number]['id'];

export function getPlan(planId: string) {
  return pricingPlans.find((plan) => plan.id === planId);
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const response = await fetch('https://api.creem.io/v1/checkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      product_name: `${plan.name} monthly subscription`,
      amount: plan.price * 100,
      currency: 'USD',
      interval: 'month',
      customer_email: userEmail,
      metadata: {
        userId,
        planId: plan.id,
        credits: plan.credits,
      },
      success_url: `${appUrl}/dashboard/billing?checkout=success&plan=${plan.id}`,
      cancel_url: `${appUrl}/dashboard/billing?checkout=cancelled`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Creem checkout failed: ${detail}`);
  }

  return response.json() as Promise<{ url?: string; checkout_url?: string }>;
}
