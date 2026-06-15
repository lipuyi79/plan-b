import type { MetadataRoute } from 'next';

import { appConfig } from '@/lib/config';

/**
 * Public routes exposed to search engines. Authenticated areas (dashboard,
 * auth, api) are intentionally excluded — see robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = appConfig.url.replace(/\/$/, '');
  const paths = [
    '/',
    '/pricing',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/refund',
    '/disclaimer',
    '/cookies',
  ];

  return paths.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
