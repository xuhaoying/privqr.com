import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/docs/'],
    },
    sitemap: 'https://qrtoolkit.vercel.app/sitemap.xml',
  }
}