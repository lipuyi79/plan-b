import { NextResponse } from 'next/server';

import { createCreemCheckout } from '@/lib/creem';

export async function POST(request: Request) {
  try {
    const { planId } = await request.json();
    const checkout = await createCreemCheckout(planId);
    const url = checkout.checkout_url ?? checkout.url;

    if (!url) {
      return NextResponse.json({ error: 'Creem did not return a checkout URL.' }, { status: 502 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed.' },
      { status: 400 },
    );
  }
}
