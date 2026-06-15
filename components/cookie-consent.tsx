'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'pf-cookie-consent';

/**
 * Lightweight, self-managed cookie consent banner. Shows once until the user
 * accepts or declines; the choice is stored in localStorage. No third-party
 * scripts are loaded — this satisfies the "notice + choice" baseline for
 * GDPR/ePrivacy without pulling in a consent-management SDK.
 *
 * If you later add analytics, gate it on the stored value === 'accepted'.
 */
export function CookieConsent() {
  // Start hidden; reveal only after we confirm no prior choice (avoids SSR flash).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — show the banner anyway.
      setVisible(true);
    }
  }, []);

  function choose(value: 'accepted' | 'declined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures; closing the banner is still the right UX.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-600">
          We use essential cookies to keep you signed in and optional cookies to understand usage.
          See our{' '}
          <Link href="/cookies" className="font-medium text-brand underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
