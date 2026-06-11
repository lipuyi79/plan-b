import { CheckoutButton } from '@/components/checkout-button';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { pricingPlans } from '@/lib/config';
import { getDashboardData } from '@/lib/dashboard';

export default async function BillingPage() {
  const { account } = await getDashboardData();

  return (
    <DashboardShell>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="mt-2 text-sm text-slate-600">Current plan: {account?.plan_id ?? 'free'} · Status: {account?.status ?? 'free'} · Credits: {account?.credits_balance ?? 0}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <article key={plan.id} className={plan.featured ? 'rounded-lg border-2 border-brand p-5' : 'rounded-lg border border-slate-200 p-5'}>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-3 text-3xl font-semibold">${plan.price}<span className="text-sm text-slate-500">/mo</span></p>
              <p className="mt-2 text-sm text-slate-600">{plan.credits} credits</p>
              <p className="mt-3 min-h-10 text-sm text-slate-600">{plan.audience}</p>
              <div className="mt-5"><CheckoutButton planId={plan.id} featured={plan.featured} /></div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
