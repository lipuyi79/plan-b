import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const imageUrl = body.imageUrl as string | undefined;
    const imageDataUrl = body.imageDataUrl as string | undefined;

    if (!imageUrl && !imageDataUrl) {
      return NextResponse.json({ error: 'Missing imageUrl or imageDataUrl.' }, { status: 400 });
    }

    const response = await fetch('https://fal.run/fal-ai/imageutils/rembg', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl ?? imageDataUrl,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json({ error: detail }, { status: response.status });
    }

    const result = await response.json();
    const cutoutUrl = result.image?.url ?? result.url ?? result.images?.[0]?.url;

    return NextResponse.json({ cutoutUrl, raw: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Background removal failed.' },
      { status: 400 },
    );
  }
}
