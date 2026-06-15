import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';

import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Contact | ${appConfig.name}`,
  description: `Get in touch with the ${appConfig.name} team.`,
};

export default function ContactPage() {
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Contact</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal">
          We&apos;d love to hear from you.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Questions about {appConfig.name}, billing, refunds, or your data? Reach out and a real
          person will get back to you.
        </p>

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <span className="mt-1 rounded-md bg-brand/10 p-2 text-brand">
              <Mail size={22} />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Email support</h2>
              <a
                href={`mailto:${legalConfig.contactEmail}`}
                className="mt-1 inline-block font-medium text-brand"
              >
                {legalConfig.contactEmail}
              </a>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We typically reply within 1–2 business days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/refund"
            className="rounded-lg border border-slate-200 bg-white p-5 hover:border-brand"
          >
            <h3 className="font-semibold">Billing &amp; refunds</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              How subscriptions, cancellations, and refunds work.
            </p>
          </Link>
          <Link
            href="/privacy"
            className="rounded-lg border border-slate-200 bg-white p-5 hover:border-brand"
          >
            <h3 className="font-semibold">Privacy &amp; data</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              How we handle your account and uploaded images.
            </p>
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          {legalConfig.entity} · {legalConfig.region}
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
