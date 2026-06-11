import Link from 'next/link';

import { CheckoutButton } from '@/components/checkout-button';
import { Logo } from '@/components/logo';
import { freeMonthlyCredits, pricingPlans } from '@/lib/config';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-fog text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="tracking-tight">
          <Logo />
        </Link>
        <Link href="/studio" className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          Open Studio
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Creem billing</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-normal">
          Credits for product photos that keep the item real.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Free users get {freeMonthlyCredits} generations per month. Paid plans are built for sellers producing SKU batches with consistent brand DNA.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={
                plan.featured
                  ? 'rounded-lg border-2 border-brand bg-white p-6 shadow-lift'
                  : 'rounded-lg border border-slate-200 bg-white p-6'
              }
            >
              {plan.featured ? <p className="mb-3 text-sm font-semibold text-brand">Most popular</p> : null}
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-4 text-4xl font-semibold">
                ${plan.price}<span className="text-base font-medium text-slate-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{plan.credits} Credits</p>
              <p className="mt-4 min-h-12 text-sm leading-6 text-slate-600">{plan.audience}</p>
              <div className="mt-6">
                <CheckoutButton planId={plan.id} featured={plan.featured} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
