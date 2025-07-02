import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://privqr.com'
  const currentDate = new Date().toISOString()
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                  http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  <!-- Main pages sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  
  <!-- Feature pages sitemap -->
  <sitemap>
    <loc>${baseUrl}/sitemap-features.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  
  <!-- Default sitemap (for backward compatibility) -->
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  
  <!-- News sitemap (for future blog/updates) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  
  <!-- Image sitemap (for better image indexing) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex', // Sitemap index should not be indexed itself
    },
  })
}