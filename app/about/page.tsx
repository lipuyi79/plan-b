import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck, Sparkles } from 'lucide-react';

import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `About | ${appConfig.name}`,
  description: `What ${appConfig.name} is, who it's for, and how it keeps your real product intact.`,
};

const values = [
  {
    icon: Layers,
    title: 'The real product stays real',
    text: 'Your product is cut out and locked as a transparent layer. The AI builds the studio around it — it never repaints or warps the item itself.',
  },
  {
    icon: Sparkles,
    title: 'Consistency at scale',
    text: 'Brand DNA presets keep lighting, color, and mood consistent so a catalog of SKUs still looks like one brand.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest about AI',
    text: 'Generated backgrounds are creative, not factual. We tell you clearly what AI output can and cannot guarantee.',
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-fog text-ink">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="tracking-tight">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/studio" className="rounded-md bg-ink px-4 py-2 font-semibold text-white">
            Open Studio
          </Link>
        </div>
      </nav>

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">About us</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal">
          Product photos that keep the real product intact.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          {appConfig.name} helps Shopify, Amazon, Etsy, and DTC sellers create conversion-ready
          product photography with AI — without warping logos, handles, bottle shapes, or packaging.
          The AI generates the background, lighting, shadows, and reflections; your actual product
          layer is preserved.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">Who it&apos;s for</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Independent sellers, creators, and small ecommerce teams who need a steady stream of
          on-brand product images but don&apos;t have a photo studio or budget for one shoot per SKU.
        </p>

        <h2 className="mt-12 text-2xl font-semibold">What we believe</h2>
        <div className="mt-5 grid gap-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <value.icon className="mb-4 text-brand" size={24} />
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{value.text}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Who runs it</h2>
        <p className="mt-3 leading-7 text-slate-700">
          {appConfig.name} is independently operated under the name {legalConfig.entity} (
          {legalConfig.region}). Questions? Email{' '}
          <a
            href={`mailto:${legalConfig.contactEmail}`}
            className="font-medium text-brand underline"
          >
            {legalConfig.contactEmail}
          </a>{' '}
          or visit our <Link href="/contact" className="font-medium text-brand underline">contact page</Link>.
        </p>

        <div className="mt-12">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-semibold text-white shadow-lift"
          >
            Try the studio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
