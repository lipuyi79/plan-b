import Link from 'next/link';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { StatCard } from '@/components/dashboard/stat-card';
import { getDashboardData } from '@/lib/dashboard';

export default async function DashboardPage() {
  const { user, account, generations, profiles, downloads } = await getDashboardData();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">User center</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-600">Signed in as {user.email}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Current plan" value={account?.plan_id ?? 'free'} helper={`Status: ${account?.status ?? 'free'}`} />
          <StatCard title="Credits left" value={account?.credits_balance ?? 0} helper="Used for product generations" />
          <StatCard title="Generated images" value={generations.length} helper="Recent saved generations" />
          <StatCard title="Brand profiles" value={profiles.length} helper="Reusable Brand DNA presets" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent generations</h2>
              <Link href="/dashboard/history" className="text-sm font-semibold text-brand">View all</Link>
            </div>
            <div className="mt-4 space-y-3">
              {generations.length ? generations.map((item) => (
                <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm">
                  <p className="font-semibold">{item.product_type}</p>
                  <p className="text-slate-600">{item.scene}</p>
                </div>
              )) : <p className="text-sm text-slate-500">No saved generations yet.</p>}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Downloads</h2>
              <Link href="/dashboard/downloads" className="text-sm font-semibold text-brand">View all</Link>
            </div>
            <div className="mt-4 space-y-3">
              {downloads.length ? downloads.map((item) => (
                <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm">
                  <p className="font-semibold">{new Date(item.created_at).toLocaleDateString()}</p>
                  <p className="truncate text-slate-600">{item.file_url}</p>
                </div>
              )) : <p className="text-sm text-slate-500">No downloads recorded yet.</p>}
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
