import { saveBrandProfileAction } from '@/app/actions/dashboard';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getDashboardData } from '@/lib/dashboard';

export default async function BrandProfilesPage({ searchParams }: { searchParams: { error?: string; message?: string } }) {
  const { profiles } = await getDashboardData();

  return (
    <DashboardShell>
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">Brand DNA</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Save reusable lighting, color, camera, mood, and style references for consistent SKU batches.</p>
          {searchParams.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{searchParams.error}</p> : null}
          {searchParams.message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">{searchParams.message}</p> : null}

          <form action={saveBrandProfileAction} className="mt-5 space-y-4">
            {[
              ['name', 'Profile name', 'Luxury Minimal Skincare'],
              ['lighting', 'Lighting', 'soft studio key light from upper left'],
              ['shadow', 'Shadow', 'natural contact shadow'],
              ['color_palette', 'Color palette', 'white, warm gray, champagne'],
              ['camera', 'Camera', '85mm product lens'],
              ['mood', 'Mood', 'premium, quiet, editorial'],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="block text-sm font-medium">
                {label}
                <input name={name} placeholder={placeholder} required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
              </label>
            ))}
            <label className="block text-sm font-medium">
              Reference notes
              <textarea name="reference_notes" rows={3} placeholder="Notes from uploaded brand images: tone, composition, depth of field..." className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <button className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white">Save Brand Profile</button>
          </form>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Saved profiles</h2>
          <div className="mt-4 space-y-3">
            {profiles.length ? profiles.map((profile) => (
              <article key={profile.id} className="rounded-md bg-slate-50 p-4">
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{profile.lighting} · {profile.color_palette} · {profile.camera}</p>
                <p className="mt-1 text-sm text-slate-500">Mood: {profile.mood}</p>
              </article>
            )) : <p className="text-sm text-slate-500">No Brand Profiles yet.</p>}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
