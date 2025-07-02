// Utility functions for enhanced sitemap generation

export interface EnhancedSitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
    geo_location?: string;
    license?: string;
  }>;
  videos?: Array<{
    thumbnail_url: string;
    title: string;
    description: string;
    content_url?: string;
    duration?: number;
    publication_date?: Date;
  }>;
  news?: {
    publication: {
      name: string;
      language: string;
    };
    publication_date: Date;
    title: string;
    keywords?: string[];
  };
  alternates?: {
    languages: Record<string, string>;
  };
  mobile?: boolean;
}

// Generate sitemap entries with enhanced metadata
export function generateEnhancedSitemap(entries: EnhancedSitemapEntry[]): string {
  const urlset = entries.map(entry => {
    let urlNode = `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>`;

    // Add image information
    if (entry.images && entry.images.length > 0) {
      entry.images.forEach(image => {
        urlNode += `
    <image:image>
      <image:loc>${image.url}</image:loc>`;
        if (image.title) {
          urlNode += `
      <image:title>${escapeXml(image.title)}</image:title>`;
        }
        if (image.caption) {
          urlNode += `
      <image:caption>${escapeXml(image.caption)}</image:caption>`;
        }
        urlNode += `
    </image:image>`;
      });
    }

    // Add video information
    if (entry.videos && entry.videos.length > 0) {
      entry.videos.forEach(video => {
        urlNode += `
    <video:video>
      <video:thumbnail_loc>${video.thumbnail_url}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>`;
        if (video.content_url) {
          urlNode += `
      <video:content_loc>${video.content_url}</video:content_loc>`;
        }
        if (video.duration) {
          urlNode += `
      <video:duration>${video.duration}</video:duration>`;
        }
        urlNode += `
    </video:video>`;
      });
    }

    // Add alternate language versions
    if (entry.alternates && entry.alternates.languages) {
      Object.entries(entry.alternates.languages).forEach(([lang, url]) => {
        urlNode += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`;
      });
    }

    // Add mobile annotation
    if (entry.mobile) {
      urlNode += `
    <mobile:mobile/>`;
    }

    urlNode += `
  </url>`;

    return urlNode;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlset}
</urlset>`;
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate sitemap index
export function generateSitemapIndex(sitemaps: Array<{ url: string; lastModified: Date }>): string {
  const sitemapNodes = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>`;
}

// Priority calculation helpers
export function calculatePriority(path: string): number {
  if (path === '/') return 1.0;
  if (path.startsWith('/crypto')) return 0.95;
  if (path.startsWith('/matter') || path.startsWith('/bulk')) return 0.9;
  if (path.startsWith('/3d')) return 0.85;
  if (path.startsWith('/about')) return 0.8;
  if (path.startsWith('/contact')) return 0.7;
  if (path.startsWith('/privacy') || path.startsWith('/terms')) return 0.5;
  return 0.4;
}

// Change frequency calculation
export function calculateChangeFrequency(path: string): EnhancedSitemapEntry['changeFrequency'] {
  if (path === '/') return 'daily';
  if (path.includes('/blog') || path.includes('/news')) return 'daily';
  if (path.includes('/crypto') || path.includes('/matter') || path.includes('/bulk')) return 'weekly';
  if (path.includes('/about') || path.includes('/contact')) return 'monthly';
  if (path.includes('/privacy') || path.includes('/terms')) return 'yearly';
  return 'weekly';
}