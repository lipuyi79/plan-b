'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function CheckoutButton({ planId, featured }: { planId: string; featured?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function startCheckout() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/creem/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'Checkout failed.');
      }

      window.location.href = result.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Checkout failed.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void startCheckout()}
        disabled={loading}
        className={
          featured
            ? 'flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60'
            : 'flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 font-semibold text-slate-900 disabled:opacity-60'
        }
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : null}
        Start with Creem
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
