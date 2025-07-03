import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://privqr.com${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-900 mb-6 ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-700" aria-hidden="true" />
              )}
              
              {item.current ? (
                <span 
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {index === 0 && <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : item.href ? (
                <Link 
                  href={item.href}
                  className="hover:text-brand-600 transition-colors"
                >
                  {index === 0 && <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
                  {item.label}
                </Link>
              ) : (
                <span>
                  {index === 0 && <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Helper function to generate breadcrumbs based on pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Define page mappings
  const pageMap: Record<string, string> = {
    'crypto': 'Crypto QR Generator',
    'matter': 'Matter/IoT QR Generator', 
    'bulk': 'Bulk QR Generator',
    '3d': '3D Printable QR Generator',
    'about': 'About',
    'contact': 'Contact',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service'
  };

  // Build breadcrumb path
  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    const isLast = i === segments.length - 1;
    const label = pageMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      current: isLast
    });
  }

  return breadcrumbs;
}

// Pre-defined breadcrumbs for common pages
export const PAGE_BREADCRUMBS = {
  crypto: [
    { label: 'Home', href: '/' },
    { label: 'Crypto QR Generator', current: true }
  ],
  matter: [
    { label: 'Home', href: '/' },
    { label: 'Matter/IoT QR Generator', current: true }
  ],
  bulk: [
    { label: 'Home', href: '/' },
    { label: 'Bulk QR Generator', current: true }
  ],
  '3d': [
    { label: 'Home', href: '/' },
    { label: '3D Printable QR Generator', current: true }
  ],
  about: [
    { label: 'Home', href: '/' },
    { label: 'About', current: true }
  ],
  contact: [
    { label: 'Home', href: '/' },
    { label: 'Contact', current: true }
  ],
  privacy: [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', current: true }
  ],
  terms: [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', current: true }
  ]
} as const;