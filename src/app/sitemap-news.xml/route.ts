import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://privqr.com'
  const currentDate = new Date().toISOString().split('T')[0]
  
  // This is a template for future news/blog content
  // Currently returns an empty but valid news sitemap
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- Example news article (template for future use) -->
  <!--
  <url>
    <loc>${baseUrl}/blog/introducing-privqr</loc>
    <news:news>
      <news:publication>
        <news:name>priv QR Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${currentDate}</news:publication_date>
      <news:title>Introducing priv QR: Privacy-First QR Code Generator</news:title>
      <news:keywords>privacy, qr code, cryptocurrency, iot, open source</news:keywords>
      <news:stock_tickers>CRYPTO:BTC, CRYPTO:ETH</news:stock_tickers>
    </news:news>
  </url>
  -->
  
  <!-- Placeholder entry to keep sitemap valid -->
  <url>
    <loc>${baseUrl}/updates</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`

  return new NextResponse(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}