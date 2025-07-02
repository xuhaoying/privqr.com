import { MetadataRoute } from 'next'

export default function sitemapFeatures(): MetadataRoute.Sitemap {
  const baseUrl = 'https://privqr.com'
  const currentDate = new Date()
  
  // Define feature pages with their specific metadata
  const features = [
    {
      path: '/crypto',
      priority: 0.95,
      keywords: ['bitcoin', 'ethereum', 'lightning', 'cryptocurrency', 'qr code'],
      images: [
        {
          url: `${baseUrl}/images/crypto-qr-preview.png`,
          title: 'Cryptocurrency QR Code Generator',
          caption: 'Generate secure Bitcoin, Ethereum, and Lightning payment QR codes',
        },
      ],
    },
    {
      path: '/matter',
      priority: 0.9,
      keywords: ['matter', 'iot', 'smart home', 'thread', 'device pairing'],
      images: [
        {
          url: `${baseUrl}/images/matter-qr-preview.png`,
          title: 'Matter/IoT QR Code Generator',
          caption: 'Create Matter-compliant device pairing QR codes',
        },
      ],
    },
    {
      path: '/bulk',
      priority: 0.9,
      keywords: ['bulk', 'batch', 'csv', 'mass generation', 'enterprise'],
      images: [
        {
          url: `${baseUrl}/images/bulk-qr-preview.png`,
          title: 'Bulk QR Code Generator',
          caption: 'Generate hundreds of QR codes from CSV files',
        },
      ],
    },
    {
      path: '/3d',
      priority: 0.85,
      keywords: ['3d printing', 'stl', 'printable', 'physical', 'manufacturing'],
      images: [
        {
          url: `${baseUrl}/images/3d-qr-preview.png`,
          title: '3D Printable QR Code Generator',
          caption: 'Create STL-ready QR codes for 3D printing',
        },
      ],
    },
  ]
  
  return features.map(feature => ({
    url: `${baseUrl}${feature.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: feature.priority,
    alternates: {
      languages: {
        en: `${baseUrl}${feature.path}`,
        zh: `${baseUrl}/zh${feature.path}`,
      },
    },
    // Note: Additional metadata like images and keywords will be handled
    // through structured data and meta tags on the actual pages
  }))
}