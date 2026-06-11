import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getDashboardData } from '@/lib/dashboard';

export default async function HistoryPage() {
  const { generations } = await getDashboardData();

  return (
    <DashboardShell>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold">Generation history</h1>
        <p className="mt-2 text-sm text-slate-600">Saved product generation requests and final output URLs.</p>
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Scene</th>
                <th className="px-4 py-3">Brand style</th>
                <th className="px-4 py-3">Seed</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {generations.length ? generations.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium">{item.product_type}</td>
                  <td className="px-4 py-3 text-slate-600">{item.scene}</td>
                  <td className="px-4 py-3 text-slate-600">{item.brand_style}</td>
                  <td className="px-4 py-3 text-slate-600">{item.seed}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr><td className="px-4 py-5 text-slate-500" colSpan={5}>No generation history yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
