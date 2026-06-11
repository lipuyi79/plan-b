import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in to record downloads.' }, { status: 401 });
    }

    const { generationId, fileUrl } = await request.json();

    if (!fileUrl) {
      return NextResponse.json({ error: 'Missing fileUrl.' }, { status: 400 });
    }

    const { error } = await supabase.from('downloads').insert({
      user_id: user.id,
      generation_id: generationId || null,
      file_url: fileUrl,
      file_type: 'png',
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ recorded: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Download record failed.' },
      { status: 400 },
    );
  }
}
