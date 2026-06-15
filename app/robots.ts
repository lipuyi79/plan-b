import type { MetadataRoute } from 'next';

import { appConfig } from '@/lib/config';

/**
 * Allow crawling of public pages; keep authenticated and API routes out of
 * search results. Points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const base = appConfig.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api', '/auth'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
