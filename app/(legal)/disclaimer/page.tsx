import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { appConfig, legalConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `Disclaimer | ${appConfig.name}`,
  description: `Important disclaimers about AI-generated images from ${appConfig.name}.`,
};

export default function DisclaimerPage() {
  return (
    <LegalDocument
      title="Disclaimer"
      intro={`${appConfig.name} uses artificial intelligence to generate product photography. Please read this disclaimer carefully — it explains the nature and limits of AI-generated Output.`}
    >
      <h2>1. AI-Generated Content</h2>
      <p>
        Images produced by the Service are created by automated AI models. Output is generated
        algorithmically and is inherently <strong>variable and unpredictable</strong>. The same input
        and settings can produce different results, and Output may contain visual artifacts,
        inaccuracies, distortions, or unexpected elements.
      </p>

      <h2>2. No Guarantee of Results</h2>
      <p>We make no warranty or guarantee that Output will:</p>
      <ul>
        <li>Match a specific look, style, brand, or expectation;</li>
        <li>Be free of errors, artifacts, or distortions;</li>
        <li>Accurately represent the real-world color, size, material, or condition of your product;</li>
        <li>Increase sales, conversions, clicks, or any business outcome;</li>
        <li>Be accepted by any specific marketplace, platform, or advertising network.</li>
      </ul>
      <p>
        While the Service is designed to keep your original product layer intact, AI-generated
        backgrounds, lighting, shadows, and reflections are creative interpretations, not factual
        depictions.
      </p>

      <h2>3. Your Responsibility to Review</h2>
      <p>
        You are responsible for reviewing every image before you publish or use it. Do not use Output
        that misrepresents your product or that could mislead customers. You are responsible for
        ensuring your listings comply with applicable advertising laws and with the rules of the
        platforms where you sell (such as Amazon, Etsy, and Shopify).
      </p>

      <h2>4. Not Professional Advice</h2>
      <p>
        Content on this site and within the Service is provided for general informational purposes
        only and does not constitute legal, business, or professional advice.
      </p>

      <h2>5. Intellectual Property &amp; Inputs</h2>
      <p>
        You are responsible for ensuring you have the rights to the product images you upload and that
        your use of Output does not infringe the trademarks, copyrights, or other rights of third
        parties. See our <a href="/terms">Terms of Service</a> for details.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, {legalConfig.entity} is not liable for any loss or
        damage arising from your use of, or reliance on, AI-generated Output. The Service and all
        Output are provided "as is" without warranties of any kind.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this disclaimer? Email{' '}
        <a href={`mailto:${legalConfig.contactEmail}`}>{legalConfig.contactEmail}</a>.
      </p>
    </LegalDocument>
  );
}
