import { recordDownloadAction } from '@/app/actions/dashboard';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getDashboardData } from '@/lib/dashboard';

export default async function DownloadsPage({ searchParams }: { searchParams: { error?: string; message?: string } }) {
  const { downloads } = await getDashboardData();

  return (
    <DashboardShell>
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">Download records</h1>
          <p className="mt-2 text-sm text-slate-600">Track exported product images for billing and customer history.</p>
          {searchParams.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{searchParams.error}</p> : null}
          {searchParams.message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">{searchParams.message}</p> : null}

          <form action={recordDownloadAction} className="mt-5 space-y-4">
            <label className="block text-sm font-medium">
              File URL
              <input name="file_url" type="url" required placeholder="https://.../final-product-photo.png" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium">
              Generation ID optional
              <input name="generation_id" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <button className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white">Record download</button>
          </form>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Recent downloads</h2>
          <div className="mt-4 space-y-3">
            {downloads.length ? downloads.map((download) => (
              <article key={download.id} className="rounded-md bg-slate-50 p-4 text-sm">
                <p className="font-semibold">{new Date(download.created_at).toLocaleString()}</p>
                <a href={download.file_url} target="_blank" className="mt-1 block truncate text-brand" rel="noreferrer">{download.file_url}</a>
              </article>
            )) : <p className="text-sm text-slate-500">No downloads recorded yet.</p>}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
