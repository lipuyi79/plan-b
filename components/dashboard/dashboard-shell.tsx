import Link from 'next/link';
import { CreditCard, History, LayoutDashboard, Palette, Download } from 'lucide-react';

import { signOutAction } from '@/app/actions/auth';
import { appConfig } from '@/lib/config';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/history', label: 'History', icon: History },
  { href: '/dashboard/brand-profiles', label: 'Brand DNA', icon: Palette },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-fog text-ink">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            {appConfig.name}
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/studio" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">
              Open Studio
            </Link>
            <form action={signOutAction}>
              <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Sign out</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
