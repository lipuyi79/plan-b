import { NextResponse } from 'next/server';

import { createCreemCheckout } from '@/lib/creem';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in before checkout.' }, { status: 401 });
    }

    const { planId } = await request.json();
    const checkout = await createCreemCheckout(planId, user.id, user.email ?? undefined);
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
