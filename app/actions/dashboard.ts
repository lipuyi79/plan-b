'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function saveBrandProfileAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  const payload = {
    user_id: user.id,
    name: String(formData.get('name') ?? ''),
    lighting: String(formData.get('lighting') ?? ''),
    shadow: String(formData.get('shadow') ?? ''),
    color_palette: String(formData.get('color_palette') ?? ''),
    camera: String(formData.get('camera') ?? ''),
    mood: String(formData.get('mood') ?? ''),
    reference_notes: String(formData.get('reference_notes') ?? '') || null,
  };

  const { error } = await supabase.from('brand_profiles').insert(payload);

  if (error) {
    redirect(`/dashboard/brand-profiles?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/brand-profiles');
  redirect('/dashboard/brand-profiles?message=Brand profile saved.');
}

export async function recordDownloadAction(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  const fileUrl = String(formData.get('file_url') ?? '');
  const generationId = String(formData.get('generation_id') ?? '') || null;

  const { error } = await supabase.from('downloads').insert({
    user_id: user.id,
    generation_id: generationId,
    file_url: fileUrl,
    file_type: 'png',
  });

  if (error) {
    redirect(`/dashboard/downloads?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/downloads');
  redirect('/dashboard/downloads?message=Download recorded.');
}
