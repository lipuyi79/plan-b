import { NextResponse } from 'next/server';

import { seedPool } from '@/lib/config';
import { buildBackgroundPrompt, generationRequestSchema } from '@/lib/generation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in to generate product photos.' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('account_summaries')
      .select('credits_balance')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!account || account.credits_balance < 1) {
      return NextResponse.json({ error: 'Not enough credits. Upgrade or add credits to continue.' }, { status: 402 });
    }

    const body = await request.json();
    const input = generationRequestSchema.parse(body);
    const prompt = buildBackgroundPrompt(input);
    const model = process.env.FAL_MODEL ?? 'fal-ai/flux/dev';
    const seed = seedPool[input.seedIndex];

    const response = await fetch(`https://fal.run/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        seed,
        image_size: 'square_hd',
        num_images: 1,
        enable_safety_checker: true,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json({ error: detail }, { status: response.status });
    }

    const result = await response.json();
    const imageUrl = result.images?.[0]?.url ?? result.image?.url ?? result.url;

    const { data: generation } = await supabase
      .from('generations')
      .insert({
        user_id: user.id,
        product_type: input.productType,
        scene: input.scene,
        brand_style: input.brandStyle,
        seed,
        marketplace: input.marketplace,
        product_image_url: null,
        background_url: imageUrl,
        output_url: imageUrl,
        prompt,
        credits_used: 1,
      })
      .select('id')
      .single();

    await supabase
      .from('account_summaries')
      .update({ credits_balance: account.credits_balance - 1 })
      .eq('user_id', user.id);

    await supabase.from('credit_ledger').insert({
      user_id: user.id,
      delta: -1,
      reason: 'generation',
      external_id: generation?.id ?? null,
      metadata: { model, seed },
    });

    return NextResponse.json({ imageUrl, prompt, seed, generationId: generation?.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed.' },
      { status: 400 },
    );
  }
}
