import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/post/*', '/tag/*', '/'],
        disallow: ['/my-posts', '/admin', '/edit/*', '/new-post/*'],
      },
    ],
    sitemap: 'https://ashjournals.com/sitemap.xml',
  };
}
