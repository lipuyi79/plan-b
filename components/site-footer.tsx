import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Logo } from '@/components/logo';
import { appConfig, companyLinks, legalConfig, legalLinks, socialLinks } from '@/lib/config';

/** Maps the icon name stored in config to a lucide-react component. */
const socialIcons: Record<string, LucideIcon> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

/**
 * Global site footer. Surfaces the legal pages, company pages, contact email,
 * and social profiles on every public surface — required for payment-processor
 * / KYC review and expected by users before they subscribe.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  // Only render social links that have a real URL set in config.
  const activeSocials = socialLinks.filter((s) => s.href);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="tracking-tight">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">{appConfig.tagline}</p>
          <a
            href={`mailto:${legalConfig.contactEmail}`}
            className="mt-4 inline-block text-sm font-medium text-brand"
          >
            {legalConfig.contactEmail}
          </a>

          {activeSocials.length > 0 ? (
            <div className="mt-5 flex items-center gap-3">
              {activeSocials.map((social) => {
                const Icon = socialIcons[social.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-slate-500 transition-colors hover:text-ink"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <nav aria-label="Product" className="text-sm">
          <p className="font-semibold text-ink">Product</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>
              <Link href="/studio" className="hover:text-ink">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-ink">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-ink">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <p className="font-semibold text-ink">Company</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="text-sm">
          <p className="font-semibold text-ink">Legal</p>
          <ul className="mt-4 space-y-3 text-slate-600">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalConfig.entity}. All rights reserved. · {legalConfig.region}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
