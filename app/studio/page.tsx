import Link from 'next/link';

import { ProductStudio } from '@/components/product-studio';
import { Logo } from '@/components/logo';
import { freeMonthlyCredits } from '@/lib/config';
import { requireUser } from '@/lib/dashboard';

export default async function StudioPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-fog text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {appConfig.name}
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">
            Dashboard
          </Link>
          <Link href="/pricing" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">
            Credits & plans
          </Link>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Free users receive {freeMonthlyCredits} product generations per month. Upgrade when generating SKU batches.
        </div>
        <ProductStudio />
      </div>
    </main>
  );
}
