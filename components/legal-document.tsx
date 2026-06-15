import { legalConfig } from '@/lib/config';

/**
 * Renders a legal document with a consistent title, effective date, and reading
 * typography. The class list below stands in for a typography plugin (not
 * installed) so headings, paragraphs, and lists render consistently across the
 * Terms / Privacy / Refund / Disclaimer pages. Pass the policy body as children.
 */
export function LegalDocument({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={[
        'space-y-5 text-slate-700',
        '[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink',
        '[&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink',
        '[&_p]:leading-7',
        '[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:leading-7',
        '[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:leading-7',
        '[&_a]:font-medium [&_a]:text-brand [&_a]:underline',
        '[&_strong]:font-semibold [&_strong]:text-ink',
      ].join(' ')}
    >
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="text-sm text-slate-500">Last updated: {legalConfig.effectiveDate}</p>
        {intro ? <p className="text-base leading-7 text-slate-600">{intro}</p> : null}
      </header>
      {children}
    </article>
  );
}
