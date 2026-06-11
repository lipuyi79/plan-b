import { NextResponse } from 'next/server';

import { getPlan } from '@/lib/creem';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

function getMetadata(payload: Record<string, any>) {
  return payload.metadata ?? payload.data?.metadata ?? payload.object?.metadata ?? payload.event?.metadata ?? {};
}

function getExternalId(payload: Record<string, any>) {
  return payload.id ?? payload.data?.id ?? payload.object?.id ?? payload.checkout?.id ?? payload.subscription?.id ?? null;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const metadata = getMetadata(payload);
    const userId = metadata.userId ?? metadata.user_id;
    const planId = metadata.planId ?? metadata.plan_id;
    const plan = getPlan(planId);
    const credits = Number(metadata.credits ?? plan?.credits ?? 0);
    const externalId = getExternalId(payload);

    if (!userId || !plan || !credits) {
      return NextResponse.json({ received: true, skipped: 'Missing user, plan, or credits metadata.' });
    }

    const supabase = createSupabaseAdminClient();

    await supabase.from('credit_ledger').insert({
      user_id: userId,
      delta: credits,
      reason: `creem_${plan.id}_subscription`,
      external_id: externalId,
      metadata: payload,
    });

    const { data: current } = await supabase
      .from('account_summaries')
      .select('credits_balance')
      .eq('user_id', userId)
      .maybeSingle();

    await supabase.from('account_summaries').upsert({
      user_id: userId,
      plan_id: plan.id,
      status: 'active',
      credits_balance: (current?.credits_balance ?? 0) + credits,
      creem_customer_id: payload.customer?.id ?? payload.data?.customer?.id ?? null,
      creem_subscription_id: payload.subscription?.id ?? payload.data?.subscription?.id ?? null,
      current_period_end: payload.current_period_end ?? payload.data?.current_period_end ?? null,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook failed.' },
      { status: 400 },
    );
  }
}
