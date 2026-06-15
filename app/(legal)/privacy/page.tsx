import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${appConfig.name}`,
  description: `How ${appConfig.name} collects, uses, and protects your data.`,
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro={`This Privacy Policy explains how ${legalConfig.entity} ("we", "us") collects, uses, and protects your information when you use ${appConfig.name} (the "Service"). We aim to collect only what we need to run the Service.`}
    >
      <h2>1. Information We Collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Account data:</strong> your email address and authentication details when you sign
          up or sign in.
        </li>
        <li>
          <strong>Uploaded images:</strong> the product photos and any related assets you upload to
          generate Output.
        </li>
        <li>
          <strong>Brand profiles &amp; settings:</strong> styles, presets, and preferences you save.
        </li>
        <li>
          <strong>Billing data:</strong> subscription and payment records. Card details are handled
          directly by our payment processor (Creem) — we do not store full card numbers.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Usage data such as generations, downloads, and credit consumption.</li>
        <li>Technical data such as IP address, browser type, and device information.</li>
        <li>Essential cookies and similar technologies required to keep you signed in.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide the Service — process your uploads and generate, store, and deliver Output;</li>
        <li>To manage your account, credits, and subscription;</li>
        <li>To process payments and prevent fraud and abuse;</li>
        <li>To provide support and respond to your requests;</li>
        <li>To maintain, secure, and improve the Service;</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal information, and we do not use your uploaded
        product images to train third-party foundation models for unrelated purposes.
      </p>

      <h2>3. Legal Bases (GDPR / EEA &amp; UK Users)</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom, we process your data under the
        following legal bases:
      </p>
      <ul>
        <li><strong>Contract</strong> — to deliver the Service you signed up for;</li>
        <li><strong>Legitimate interests</strong> — to secure, maintain, and improve the Service;</li>
        <li><strong>Consent</strong> — where required, for example optional communications;</li>
        <li><strong>Legal obligation</strong> — to meet tax, accounting, and compliance duties.</li>
      </ul>

      <h2>4. Service Providers &amp; Sharing</h2>
      <p>We share data only with providers that help us operate the Service, including:</p>
      <ul>
        <li><strong>Supabase</strong> — authentication and database/storage;</li>
        <li><strong>Creem</strong> — subscription billing and payment processing;</li>
        <li><strong>AI image-processing providers</strong> — to perform background removal and generation;</li>
        <li>Hosting and infrastructure providers.</li>
      </ul>
      <p>
        These providers are bound to use your data only to provide services to us. We may also
        disclose information if required by law or to protect our rights and users.
      </p>

      <h2>5. International Transfers</h2>
      <p>
        We are based in the United States, and your information may be processed in the U.S. and other
        countries. Where we transfer data from the EEA/UK, we rely on appropriate safeguards such as
        Standard Contractual Clauses.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We keep your account data while your account is active. Uploaded images and generated Output
        are retained so you can access your history; you may delete them, and we delete associated
        data within a reasonable period after account closure, except where we must retain records
        for legal, tax, or fraud-prevention purposes.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location (including under GDPR and the CCPA/CPRA), you may have the right to
        access, correct, delete, or export your personal data, to object to or restrict certain
        processing, and to withdraw consent. To exercise these rights, email us at{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a>. You also have
        the right to lodge a complaint with your local data-protection authority.
      </p>

      <h2>8. Security</h2>
      <p>
        We use technical and organizational measures to protect your data, including encrypted
        transport and access controls. No method of transmission or storage is fully secure, so we
        cannot guarantee absolute security.
      </p>

      <h2>9. Children</h2>
      <p>
        The Service is not directed to children under 18, and we do not knowingly collect their
        personal information. If you believe a child has provided us data, contact us and we will
        delete it.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will revise the "Last updated" date
        above and, for material changes, provide additional notice where appropriate.
      </p>

      <h2>11. Contact</h2>
      <p>
        For privacy questions or requests, email{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a>.
      </p>
    </LegalDocument>
  );
}
