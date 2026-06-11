import Link from 'next/link';

import { signInAction } from '@/app/actions/auth';
import { Logo } from '@/components/logo';

export default function SignInPage({ searchParams }: { searchParams: { error?: string; message?: string; next?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fog px-6 py-12 text-ink">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-lift">
        <Link href="/">
          <Logo />
        </Link>
        <h1 className="mt-8 text-3xl font-semibold">Sign in</h1>
        <p className="mt-2 text-slate-600">Access your credits, product generations, Brand DNA, and billing.</p>

        {searchParams.error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{searchParams.error}</p> : null}
        {searchParams.message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">{searchParams.message}</p> : null}

        <form action={signInAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={searchParams.next ?? '/dashboard'} />
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" required minLength={6} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
          <button className="w-full rounded-md bg-brand px-4 py-3 font-semibold text-white">Sign in</button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          No account yet? <Link href="/auth/sign-up" className="font-semibold text-brand">Create one</Link>
        </p>
      </div>
    </main>
  );
}
