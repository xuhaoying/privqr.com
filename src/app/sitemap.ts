import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://privqr.com'
  const currentDate = new Date()
  
  // Enhanced sitemap with additional metadata
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          zh: `${baseUrl}/zh`,
        },
      },
    },
    {
      url: `${baseUrl}/crypto`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/crypto`,
          zh: `${baseUrl}/zh/crypto`,
        },
      },
    },
    {
      url: `${baseUrl}/matter`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/matter`,
          zh: `${baseUrl}/zh/matter`,
        },
      },
    },
    {
      url: `${baseUrl}/bulk`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/bulk`,
          zh: `${baseUrl}/zh/bulk`,
        },
      },
    },
    {
      url: `${baseUrl}/3d`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/3d`,
          zh: `${baseUrl}/zh/3d`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          zh: `${baseUrl}/zh/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          zh: `${baseUrl}/zh/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/guides`,
          zh: `${baseUrl}/zh/guides`,
        },
      },
    },
    {
      url: `${baseUrl}/guides/crypto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}/guides/crypto`,
          zh: `${baseUrl}/zh/guides/crypto`,
        },
      },
    },
    {
      url: `${baseUrl}/guides/matter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}/guides/matter`,
          zh: `${baseUrl}/zh/guides/matter`,
        },
      },
    },
    {
      url: `${baseUrl}/guides/bulk`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}/guides/bulk`,
          zh: `${baseUrl}/zh/guides/bulk`,
        },
      },
    },
    {
      url: `${baseUrl}/guides/3d`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}/guides/3d`,
          zh: `${baseUrl}/zh/guides/3d`,
        },
      },
    },
  ]
}