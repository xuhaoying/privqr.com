import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Bitcoin, Wifi, Upload, Printer, FileText, Shield } from 'lucide-react';

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  category: 'tool' | 'info' | 'guide';
}

interface RelatedContentProps {
  currentPage: string;
  maxItems?: number;
}

const ALL_CONTENT: Record<string, RelatedItem> = {
  crypto: {
    title: 'Crypto QR Generator',
    description: 'Generate Bitcoin, Ethereum & Lightning payment QR codes',
    href: '/crypto',
    icon: Bitcoin,
    category: 'tool'
  },
  matter: {
    title: 'Matter/IoT QR Generator',
    description: 'Smart device pairing codes with Matter 1.x compliance',
    href: '/matter',
    icon: Wifi,
    category: 'tool'
  },
  bulk: {
    title: 'Bulk QR Generator',
    description: 'CSV batch processing with validation reports',
    href: '/bulk',
    icon: Upload,
    category: 'tool'
  },
  '3d': {
    title: '3D Printable QR Generator',
    description: 'STL-ready QR codes optimized for 3D printing',
    href: '/3d',
    icon: Printer,
    category: 'tool'
  },
  about: {
    title: 'About priv QR',
    description: 'Learn about our mission and technology',
    href: '/about',
    icon: FileText,
    category: 'info'
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How we protect your data and ensure privacy',
    href: '/privacy',
    icon: Shield,
    category: 'info'
  }
};

// Define related content for each page
const RELATED_MAPPING: Record<string, string[]> = {
  '/': ['crypto', 'matter', 'bulk', '3d'],
  '/crypto': ['matter', 'bulk', '3d', 'about'],
  '/matter': ['crypto', '3d', 'bulk', 'about'],
  '/bulk': ['crypto', 'matter', '3d', 'about'],
  '/3d': ['crypto', 'matter', 'bulk', 'about'],
  '/about': ['crypto', 'matter', 'bulk', 'privacy'],
  '/contact': ['about', 'privacy', 'crypto', 'matter'],
  '/privacy': ['about', 'crypto', 'matter', 'bulk'],
  '/terms': ['privacy', 'about', 'crypto', 'matter']
};

export function RelatedContent({ currentPage, maxItems = 4 }: RelatedContentProps) {
  const relatedKeys = RELATED_MAPPING[currentPage] || [];
  const relatedItems = relatedKeys
    .slice(0, maxItems)
    .map(key => ALL_CONTENT[key])
    .filter(Boolean);

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
        Explore More Tools
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card key={item.href} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.category === 'tool' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {item.category === 'tool' ? 'Generator' : 'Info'}
                  </span>
                </div>
                <h3 className="font-semibold text-black dark:text-white leading-tight">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-black dark:text-white mb-4 line-clamp-2">
                  {item.description}
                </p>
                <Link href={item.href}>
                  <ShimmerButton
                    background="rgba(16, 217, 163, 0.8)"
                    className="w-full text-white text-sm"
                  >
                    {item.category === 'tool' ? 'Try Now' : 'Learn More'}
                  </ShimmerButton>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional navigation for comprehensive tools */}
      {currentPage !== '/' && (
        <div className="mt-8 text-center">
          <Link href="/">
            <ShimmerButton
              background="rgba(16, 185, 129, 0.8)"
              className="text-white"
            >
              View All QR Generators
            </ShimmerButton>
          </Link>
        </div>
      )}
    </section>
  );
}

// Component for feature cross-references within content
export function FeatureLinks({ 
  features, 
  title = "Related Features" 
}: { 
  features: string[];
  title?: string;
}) {
  const featureItems = features
    .map(key => ALL_CONTENT[key])
    .filter(Boolean);

  if (featureItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-brand-50 dark:bg-brand-900/20 rounded-lg p-4 my-6">
      <h4 className="font-medium text-brand-900 dark:text-brand-100 mb-3">
        {title}
      </h4>
      <ul className="space-y-2">
        {featureItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className="text-brand-700 dark:text-brand-300 hover:text-brand-900 dark:hover:text-brand-100 text-sm font-medium hover:underline"
            >
              → {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}