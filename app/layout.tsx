import type { Metadata } from 'next';
import './globals.css';

import { CookieConsent } from '@/components/cookie-consent';
import { appConfig } from '@/lib/config';

const title = `${appConfig.name} | AI product photos for ecommerce`;

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title,
  description: appConfig.description,
  keywords: [
    'AI product photos',
    'product photography',
    'ecommerce product images',
    'Shopify product photos',
    'Amazon product images',
    'Etsy product photos',
    'AI background generator',
    appConfig.name,
  ],
  alternates: {
    canonical: '/',
  },
  verification: {
    google: [
      'rFs_FAy3rQMZVq_xifeTc9OO82kYC9QUV1u24DWhVjo',
      'ZiPkiQer5lXvhORnynJbjocO1wRfP5_846-eVohX0s4',
    ],
  },
  openGraph: {
    type: 'website',
    url: appConfig.url,
    siteName: appConfig.name,
    title,
    description: appConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: appConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: appConfig.description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
