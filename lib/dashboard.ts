import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { AccountSummary, BrandProfile, DownloadRecord, GenerationHistoryItem } from '@/lib/types';

export async function requireUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return { supabase, user };
}

export async function getDashboardData() {
  const { supabase, user } = await requireUser();

  const [accountResult, generationsResult, profilesResult, downloadsResult] = await Promise.all([
    supabase.from('account_summaries').select('*').eq('user_id', user.id).maybeSingle(),
    supabase.from('generations').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8),
    supabase.from('brand_profiles').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8),
    supabase.from('downloads').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8),
  ]);

  return {
    user,
    account: accountResult.data as AccountSummary | null,
    generations: (generationsResult.data ?? []) as GenerationHistoryItem[],
    profiles: (profilesResult.data ?? []) as BrandProfile[],
    downloads: (downloadsResult.data ?? []) as DownloadRecord[],
  };
}
