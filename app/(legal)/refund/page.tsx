import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy | ${appConfig.name}`,
  description: `How subscriptions, cancellations, and refunds work at ${appConfig.name}.`,
};

export default function RefundPage() {
  return (
    <LegalDocument
      title="Refund & Cancellation Policy"
      intro={`This policy explains how subscriptions, cancellations, and refunds work for ${appConfig.name}, operated by ${legalConfig.entity}. It applies to all paid plans purchased through our payment processor, Creem.`}
    >
      <h2>1. Subscriptions</h2>
      <p>
        Paid plans are recurring subscriptions billed in advance — monthly unless stated otherwise.
        Each billing cycle includes a credit allowance used to generate product images. Your
        subscription renews automatically until you cancel.
      </p>

      <h2>2. How to Cancel</h2>
      <ul>
        <li>You can cancel at any time from your account billing page, or by emailing us.</li>
        <li>
          Cancellation stops future renewals. You keep access to your plan and remaining credits
          until the end of the current paid billing period.
        </li>
        <li>We do not charge a cancellation fee.</li>
      </ul>

      <h2>3. Refunds</h2>
      <p>
        Because the Service delivers digital goods (AI-generated images) and credits are consumable
        and made available immediately, fees are generally <strong>non-refundable</strong> once a
        billing cycle has started. However, we want customers to be treated fairly, so we offer the
        following:
      </p>
      <ul>
        <li>
          <strong>14-day first-purchase guarantee.</strong> If you are unsatisfied with your{' '}
          <em>first</em> paid subscription, contact us within 14 days of that initial charge and we
          will refund it, provided you have used no more than a small portion of the included credits
          (up to 20%).
        </li>
        <li>
          <strong>Billing errors.</strong> If you were charged in error, charged after a valid
          cancellation, or double-charged, we will refund the incorrect amount in full.
        </li>
        <li>
          <strong>Service failure.</strong> If a technical fault on our side prevented you from using
          purchased credits and we cannot resolve it, we will refund the affected portion or restore
          the credits.
        </li>
      </ul>

      <h2>4. What Is Not Refundable</h2>
      <ul>
        <li>Renewal charges after the first billing cycle (cancel before renewal to avoid them);</li>
        <li>Credits that have already been substantially used;</li>
        <li>Dissatisfaction with the artistic style or result of AI Output, which is inherently variable (see our <a href="/disclaimer">Disclaimer</a>);</li>
        <li>Accounts terminated for violating our <a href="/terms">Terms of Service</a>.</li>
      </ul>

      <h2>5. How to Request a Refund</h2>
      <p>
        Email{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a> from the email
        address on your account, with your reason and approximate charge date. We aim to respond
        within 5 business days. Approved refunds are issued to the original payment method through
        Creem and may take several business days to appear, depending on your bank or card issuer.
      </p>

      <h2>6. Statutory Rights</h2>
      <p>
        Nothing in this policy limits any non-waivable rights you may have under applicable consumer
        law in your country of residence, including any statutory right of withdrawal for EU/EEA and
        UK consumers.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about billing or refunds? Email{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a>.
      </p>
    </LegalDocument>
  );
}
