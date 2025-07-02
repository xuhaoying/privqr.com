import Link from 'next/link';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, Wifi, Upload, Printer } from 'lucide-react';

const features = [
  {
    name: 'Crypto',
    description: 'Bitcoin, Ethereum & Lightning Invoice QR codes with BIP-21 compliance',
    href: '/crypto',
    cta: 'Generate Crypto QR',
    Icon: Bitcoin,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20" />
    ),
    className: "md:col-span-1",
  },
  {
    name: 'Matter/IoT',
    description: 'Smart device pairing codes with Matter 1.x standard compliance',
    href: '/matter',
    cta: 'Create Device Code',
    Icon: Wifi,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20" />
    ),
    className: "md:col-span-1",
  },
  {
    name: 'Bulk Generation',
    description: 'CSV batch processing with validation reports and ZIP downloads',
    href: '/bulk',
    cta: 'Process CSV',
    Icon: Upload,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20" />
    ),
    className: "md:col-span-1",
  },
  {
    name: '3D Print',
    description: 'STL-ready QR codes optimized for 3D printing and physical products',
    href: '/3d',
    cta: 'Create 3D QR',
    Icon: Printer,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20" />
    ),
    className: "md:col-span-1",
  },
];

const trustBadges = [
  { icon: '🔒', text: 'Data Never Leaves Browser' },
  { icon: '⚡', text: 'Generate in <50ms' },
  { icon: '📱', text: 'Works Offline' },
];

export const metadata = {
  title: 'QR Toolkit - Professional QR Code Generator | Free, Privacy-First',
  description: 'Generate professional QR codes instantly with our privacy-first tool. Support for crypto payments (Bitcoin, Ethereum), IoT devices, bulk processing, and 3D printing. 100% free and works offline.',
  keywords: 'free QR code generator, professional QR codes, crypto QR codes, Bitcoin QR, Ethereum QR, bulk QR generator, IoT QR codes, Matter device codes, privacy QR generator',
  openGraph: {
    title: 'QR Toolkit - Professional QR Code Generator',
    description: 'Create professional QR codes for crypto, IoT, and business use. Privacy-first, works offline, completely free.',
  },
};

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Professional QR Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Zero dependencies • Offline-first • Privacy-focused • Industry standards
        </p>

        {/* Feature Grid */}
        <BentoGrid className="max-w-6xl mx-auto mb-12">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <BentoCard
                name={feature.name}
                className={feature.className}
                background={feature.background}
                Icon={feature.Icon}
                description={feature.description}
                href={feature.href}
                cta={feature.cta}
              />
            </Link>
          ))}
        </BentoGrid>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-lg">{badge.icon}</span>
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-8">
              Why QR Toolkit?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Absolute Privacy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All processing happens in your browser. Your sensitive data never touches our servers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Professional Features
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Industry-standard formats, batch processing, and validation reports for serious users.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Open Source
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fully transparent and auditable code. Verify our security claims yourself.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Ready to start?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Choose a tool above or try our most popular features
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/crypto">
            <ShimmerButton 
              background="rgba(59, 130, 246, 1)"
              className="text-white"
            >
              Generate Crypto QR
            </ShimmerButton>
          </Link>
          <Link href="/bulk">
            <ShimmerButton 
              background="rgba(16, 185, 129, 1)"
              className="text-white"
            >
              Batch Process CSV
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </div>
  );
}