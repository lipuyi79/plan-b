import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Cookie Policy | ${appConfig.name}`,
  description: `How ${appConfig.name} uses cookies and similar technologies.`,
};

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      intro={`This Cookie Policy explains how ${legalConfig.entity} ("we", "us") uses cookies and similar technologies on ${appConfig.name} (the "Service"), and the choices you have.`}
    >
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device by your browser. We also use similar
        technologies such as <strong>localStorage</strong> to remember your preferences (for example,
        your cookie consent choice). Together we refer to these as "cookies."
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <h3>Strictly necessary</h3>
      <p>
        Required for the Service to function — for example, to keep you signed in and to remember
        your cookie consent choice. These cannot be switched off without breaking core features.
      </p>
      <h3>Functional</h3>
      <p>
        Remember settings and preferences (such as saved brand styles in your account) to improve
        your experience.
      </p>
      <h3>Analytics (if enabled)</h3>
      <p>
        Help us understand how the Service is used so we can improve it — for example, which features
        are used and where errors occur. We only set non-essential analytics cookies where permitted
        by your consent choice.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some cookies may be set by service providers we use to operate the Service, including our
        authentication provider (Supabase) and our payment processor (Creem) during checkout. These
        providers process data under their own privacy and cookie policies.
      </p>

      <h2>4. Your Choices</h2>
      <ul>
        <li>
          When you first visit, you can <strong>Accept</strong> or <strong>Decline</strong>{' '}
          non-essential cookies in the banner.
        </li>
        <li>
          You can change or withdraw consent at any time by clearing this site&apos;s cookies and
          site data in your browser, which will make the consent banner appear again.
        </li>
        <li>
          Most browsers let you block or delete cookies in their settings. Blocking strictly
          necessary cookies may prevent the Service from working properly.
        </li>
      </ul>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. We will revise the &quot;Last
        updated&quot; date above when we do.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies? Email{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a>. See also our{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalDocument>
  );
}
