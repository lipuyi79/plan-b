import { NextResponse } from 'next/server';

import { buildBackgroundPrompt, generationRequestSchema } from '@/lib/generation';
import { seedPool } from '@/lib/config';

export async function POST(request: Request) {
  try {
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

    return NextResponse.json({ imageUrl, prompt, seed });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed.' },
      { status: 400 },
    );
  }
}
