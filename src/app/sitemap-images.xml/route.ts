import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://privqr.com'
  
  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage images -->
  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>priv QR - Professional QR Code Generator</image:title>
      <image:caption>Privacy-first QR code generator for crypto, IoT, and bulk processing</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/logo-transparent.svg</image:loc>
      <image:title>priv QR Logo</image:title>
      <image:caption>priv QR brand logo with transparent background</image:caption>
    </image:image>
  </url>
  
  <!-- Crypto QR Generator images -->
  <url>
    <loc>${baseUrl}/crypto</loc>
    <image:image>
      <image:loc>${baseUrl}/images/crypto-bitcoin-qr.png</image:loc>
      <image:title>Bitcoin QR Code Example</image:title>
      <image:caption>Example of Bitcoin payment QR code with BIP-21 compliance</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/crypto-ethereum-qr.png</image:loc>
      <image:title>Ethereum QR Code Example</image:title>
      <image:caption>Example of Ethereum payment QR code with EIP-681 compliance</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/crypto-lightning-qr.png</image:loc>
      <image:title>Lightning Network QR Code Example</image:title>
      <image:caption>Example of Lightning invoice QR code with BOLT-11 format</image:caption>
    </image:image>
  </url>
  
  <!-- Matter/IoT QR Generator images -->
  <url>
    <loc>${baseUrl}/matter</loc>
    <image:image>
      <image:loc>${baseUrl}/images/matter-device-qr.png</image:loc>
      <image:title>Matter Device Pairing QR Code</image:title>
      <image:caption>QR code for Matter/Thread smart device commissioning</image:caption>
    </image:image>
  </url>
  
  <!-- Bulk QR Generator images -->
  <url>
    <loc>${baseUrl}/bulk</loc>
    <image:image>
      <image:loc>${baseUrl}/images/bulk-csv-upload.png</image:loc>
      <image:title>Bulk CSV Upload Interface</image:title>
      <image:caption>Upload CSV files to generate multiple QR codes at once</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/bulk-qr-grid.png</image:loc>
      <image:title>Bulk QR Code Results</image:title>
      <image:caption>Grid view of generated QR codes from CSV batch processing</image:caption>
    </image:image>
  </url>
  
  <!-- 3D Printable QR Generator images -->
  <url>
    <loc>${baseUrl}/3d</loc>
    <image:image>
      <image:loc>${baseUrl}/images/3d-qr-preview.png</image:loc>
      <image:title>3D Printable QR Code Preview</image:title>
      <image:caption>3D model preview of printable QR code with proper depth</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/3d-qr-printed.png</image:loc>
      <image:title>3D Printed QR Code Example</image:title>
      <image:caption>Physical 3D printed QR code ready for scanning</image:caption>
    </image:image>
  </url>
</urlset>`

  return new NextResponse(imageSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}