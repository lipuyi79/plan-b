import Link from 'next/link';

import { signUpAction } from '@/app/actions/auth';
import { appConfig, freeMonthlyCredits } from '@/lib/config';

export default function SignUpPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fog px-6 py-12 text-ink">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-lift">
        <Link href="/" className="text-lg font-semibold">
          {appConfig.name}
        </Link>
        <h1 className="mt-8 text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-slate-600">Start with {freeMonthlyCredits} free generations each month.</p>

        {searchParams.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{searchParams.error}</p> : null}

        <form action={signUpAction} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" required minLength={6} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <button className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white">Create account</button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account? <Link href="/auth/sign-in" className="font-semibold text-brand">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
