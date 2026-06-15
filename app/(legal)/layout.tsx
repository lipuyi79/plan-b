import Link from 'next/link';

import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';

/**
 * Shared chrome for every legal page: top nav, a constrained reading column,
 * and the global footer. The document body itself is rendered by the
 * <LegalDocument> component (see components/legal-document.tsx).
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-fog text-ink">
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

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">{children}</main>

      <SiteFooter />
    </div>
  );
}
