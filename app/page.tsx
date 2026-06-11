import Link from 'next/link';
import { ArrowRight, ImagePlus, Layers, Sparkles } from 'lucide-react';

import { Logo } from '@/components/logo';
import { pricingPlans } from '@/lib/config';

const pillars = [
  {
    icon: Layers,
    title: 'Product Lock Pipeline',
    text: 'The product is cut out, locked as a transparent PNG, and composited back after the background is generated.',
  },
  {
    icon: Sparkles,
    title: 'Brand DNA Consistency',
    text: 'Save lighting, camera, colors, mood, and a fixed seed pool so 100 SKUs still look like one brand.',
  },
  {
    icon: ImagePlus,
    title: 'Realism Engine',
    text: 'Grounding shadows, reflection layers, and photography templates keep the image from looking fake.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-fog text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="tracking-tight">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/pricing" className="text-sm font-medium text-slate-700">
            Pricing
          </Link>
          <Link href="/auth/sign-in" className="text-sm font-medium text-slate-700">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            AI product photos for US ecommerce sellers
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-7xl">
            ProductFrame AI
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
            Generate Shopify, Amazon, Etsy, and DTC product photos without warping the real item. The AI builds the studio, not a fake copy of your product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-semibold text-white shadow-lift"
            >
              Create product photos <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-800">
              View plans
            </Link>
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lift">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#e5e7eb_45%,#fef3c7_100%)]" />
          <div className="absolute inset-x-10 bottom-16 h-28 rounded-[50%] bg-slate-900/10 blur-2xl" />
          <div className="absolute left-1/2 top-1/2 h-[58%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/60 bg-white/80 shadow-2xl backdrop-blur-sm">
            <div className="mx-auto mt-8 h-16 w-28 rounded-full border-[10px] border-slate-800/80" />
            <div className="mx-auto mt-4 h-44 w-40 rounded-b-[2rem] rounded-t-lg bg-gradient-to-br from-slate-900 to-slate-600" />
            <div className="absolute right-8 top-32 h-24 w-12 rounded-r-full border-[10px] border-slate-700" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-md bg-white/85 p-4 text-sm font-medium text-slate-700 backdrop-blur">
            Original product layer remains unchanged. Background, shadow, and reflection are generated around it.
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-12 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg border border-slate-200 p-6">
              <pillar.icon className="mb-5 text-brand" size={26} />
              <h2 className="text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="font-semibold">{plan.name}</p>
              <p className="mt-3 text-3xl font-semibold">${plan.price}<span className="text-base text-slate-500">/mo</span></p>
              <p className="mt-2 text-sm text-slate-600">{plan.credits} credits</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
