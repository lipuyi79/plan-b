import type { Metadata } from 'next';
import Link from 'next/link';

import { Logo } from '@/components/logo';
import { SiteFooter } from '@/components/site-footer';
import { appConfig, legalConfig } from '@/lib/config';

const faqs = [
  {
    question: 'What is ProductFrame AI?',
    answer:
      'ProductFrame AI is an AI product photography studio for ecommerce sellers. It helps you create clean product images while keeping the real product shape, logo, packaging, and key details intact.',
  },
  {
    question: 'How is ProductFrame AI different from a normal AI image generator?',
    answer:
      'Normal AI generators often redraw the entire item. ProductFrame AI is designed to preserve the uploaded product layer and generate backgrounds, shadows, reflections, and styling around it.',
  },
  {
    question: 'Which sellers is ProductFrame AI built for?',
    answer:
      'It is built for Shopify, Amazon, Etsy, DTC, marketplace, and small ecommerce teams that need polished product photos without booking a studio for every SKU.',
  },
  {
    question: 'Can I use the images for my online store?',
    answer:
      'Yes. You can use generated images for product listings, landing pages, social ads, email campaigns, and other ecommerce marketing uses, subject to the Terms of Service.',
  },
  {
    question: 'Will the AI change my product?',
    answer:
      'The workflow is designed to keep the product intact. Results can still vary because AI generation is probabilistic, so always review important product details before publishing.',
  },
  {
    question: 'What kinds of product photos work best?',
    answer:
      'Clear product images with good lighting, visible edges, and minimal obstruction usually work best. Front-facing or three-quarter product shots are ideal for most catalog and lifestyle outputs.',
  },
  {
    question: 'Do I need a transparent PNG?',
    answer:
      'A transparent PNG is helpful, but not always required. ProductFrame AI can help remove or replace backgrounds, then build a new visual scene around the product.',
  },
  {
    question: 'Can ProductFrame AI create Amazon-ready images?',
    answer:
      'It can help create clean ecommerce visuals, lifestyle scenes, and supporting images. You are responsible for checking the final output against Amazon category and marketplace requirements.',
  },
  {
    question: 'Can I generate Shopify product photos?',
    answer:
      'Yes. ProductFrame AI is well suited for Shopify stores that need consistent collection imagery, product hero shots, campaign assets, and social-ready product visuals.',
  },
  {
    question: 'Can I use it for Etsy listings?',
    answer:
      'Yes. Etsy sellers can use it to create cleaner listing images, seasonal scenes, gift-guide visuals, and brand-consistent product photography for handmade or small-batch items.',
  },
  {
    question: 'Does ProductFrame AI support batch product work?',
    answer:
      'The product is designed for SKU workflows and brand consistency. Paid plans include larger credit allowances for sellers producing many product images each month.',
  },
  {
    question: 'What are brand profiles?',
    answer:
      'Brand profiles store reusable style choices such as lighting, camera feel, colors, mood, and visual direction so multiple product images can look like one coherent brand.',
  },
  {
    question: 'What are credits?',
    answer:
      'Credits are used when generating product images or running AI-powered image operations. Your monthly plan determines how many credits are available in your account.',
  },
  {
    question: 'Do free users get credits?',
    answer:
      'Yes. Free users receive a small monthly credit allowance so they can test the workflow before choosing a paid plan.',
  },
  {
    question: 'What happens when I run out of credits?',
    answer:
      'You can wait for the next monthly credit refresh or upgrade to a plan with a larger monthly allowance.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Yes. You can cancel your subscription according to the billing and refund terms. Your account access and credits are handled as described in the Refund Policy.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Refund handling is described in the Refund Policy. If you have a billing issue, contact support with your account email and payment details.',
  },
  {
    question: 'Who processes payments?',
    answer:
      'Payments are processed through Creem. ProductFrame AI does not directly store your full payment card details.',
  },
  {
    question: 'Can teams use the same account?',
    answer:
      'Small teams can use ProductFrame AI for shared ecommerce production workflows, but each user remains responsible for following the Terms of Service and protecting account access.',
  },
  {
    question: 'Can I download generated images?',
    answer:
      'Yes. Generated assets can be downloaded and used in your ecommerce workflow, subject to your plan, credits, and the Terms of Service.',
  },
  {
    question: 'Are my uploaded product images private?',
    answer:
      'ProductFrame AI handles uploaded images according to the Privacy Policy. Do not upload images you do not have the right to use or images containing sensitive personal information.',
  },
  {
    question: 'Do you train AI models on my uploads?',
    answer:
      'Data handling is governed by the Privacy Policy. Review that policy for the current details on how uploaded files, account data, and generated outputs are processed.',
  },
  {
    question: 'Can I upload copyrighted product images?',
    answer:
      'Only upload product images, logos, packaging, and creative assets that you own or have permission to use. You are responsible for the rights to your inputs and final usage.',
  },
  {
    question: 'Can ProductFrame AI guarantee better sales?',
    answer:
      'No. ProductFrame AI helps create stronger product visuals, but it cannot guarantee clicks, conversions, rankings, ad performance, or marketplace approval.',
  },
  {
    question: 'Will every generation be perfect?',
    answer:
      'No. AI outputs may need review, regeneration, or manual edits. Check labels, logos, product proportions, reflections, shadows, and any regulated claims before publishing.',
  },
  {
    question: 'Can I create seasonal product images?',
    answer:
      'Yes. You can create seasonal scenes for holidays, launches, campaigns, gift guides, and promotional collections while keeping the product as the visual anchor.',
  },
  {
    question: 'Can I make lifestyle product scenes?',
    answer:
      'Yes. ProductFrame AI can help place products into lifestyle-inspired scenes such as home, beauty, outdoor, desk, kitchen, or premium studio environments.',
  },
  {
    question: 'What image details should I review before publishing?',
    answer:
      'Review logos, text, packaging claims, product color, proportions, handles, caps, transparent areas, shadows, and reflections. This is especially important for marketplace listings.',
  },
  {
    question: 'How do I contact support?',
    answer: `Email ${legalConfig.contactEmail} with your account email, the issue, and any relevant order or generation details.`,
  },
  {
    question: 'Where can I read the legal policies?',
    answer:
      'The Terms of Service, Privacy Policy, Refund Policy, Disclaimer, and Cookie Policy are linked in the site footer on every public page.',
  },
] as const;

export const metadata: Metadata = {
  title: `FAQ | ${appConfig.name}`,
  description: `Answers to common questions about ${appConfig.name}, AI product photos, credits, billing, privacy, and ecommerce usage.`,
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-fog text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="tracking-tight">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/studio" className="rounded-md bg-ink px-4 py-2 font-semibold text-white">
            Open Studio
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-normal">
          Frequently asked questions about AI product photos.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Practical answers about product preservation, ecommerce usage, credits, billing, privacy,
          and publishing generated images.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-brand">{String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 text-lg font-semibold">{faq.question}</h2>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
