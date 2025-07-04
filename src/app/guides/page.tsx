'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  Coins, 
  Cpu, 
  Grid3x3, 
  Printer, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/magicui/text-effect';

const guides = [
  {
    title: 'Crypto QR Codes',
    description: 'Learn how to generate secure cryptocurrency payment QR codes for Bitcoin, Ethereum, Lightning Network, and more.',
    icon: Coins,
    href: '/guides/crypto',
    color: 'bg-orange-100 text-orange-600',
    topics: ['Bitcoin addresses', 'Lightning invoices', 'ERC20 tokens', 'Security best practices'],
    readTime: '5 min read'
  },
  {
    title: 'Matter/IoT Device Pairing',
    description: 'Master the creation of Matter-compliant QR codes for seamless IoT device commissioning.',
    icon: Cpu,
    href: '/guides/matter',
    color: 'bg-blue-100 text-blue-600',
    topics: ['Vendor & Product IDs', 'Setup PINs', 'TLV validation', 'Compatibility testing'],
    readTime: '7 min read'
  },
  {
    title: 'Bulk QR Generation',
    description: 'Efficiently generate thousands of QR codes with our bulk processing features.',
    icon: Grid3x3,
    href: '/guides/bulk',
    color: 'bg-purple-100 text-purple-600',
    topics: ['CSV formatting', 'Template system', 'Batch processing', 'Export options'],
    readTime: '6 min read'
  },
  {
    title: '3D Printable QR Codes',
    description: 'Create QR codes optimized for 3D printing with proper depth and material considerations.',
    icon: Printer,
    href: '/guides/3d',
    color: 'bg-green-100 text-green-600',
    topics: ['STL generation', 'Depth settings', 'Print optimization', 'Material guidelines'],
    readTime: '4 min read'
  }
];

const quickTips = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All QR codes are generated locally in your browser. No data is sent to servers.'
  },
  {
    icon: Clock,
    title: 'Instant Generation',
    description: 'QR codes are created in under 50ms with our optimized algorithms.'
  },
  {
    icon: CheckCircle2,
    title: 'Standards Compliant',
    description: 'All codes follow industry standards for maximum compatibility.'
  }
];

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <TextEffect
          preset="fade-in-blur"
          as="h1"
          className="text-5xl lg:text-6xl font-bold mb-6"
        >
          User Guides
        </TextEffect>
        <p className="text-xl text-gray-900 max-w-3xl mx-auto">
          Everything you need to know about generating QR codes with priv QR. 
          From basic usage to advanced features, we've got you covered.
        </p>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {quickTips.map((tip, index) => (
          <Card key={index} className="bg-brand-50 border-brand-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-100 rounded-lg">
                  <tip.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-900">{tip.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Guides Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {guides.map((guide, index) => (
          <motion.div
            key={guide.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Link href={guide.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${guide.color}`}>
                      <guide.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-gray-900">{guide.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-brand-600 transition-colors">
                    {guide.title}
                  </CardTitle>
                  <p className="text-gray-900 mb-4">{guide.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-900">Topics covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand-600 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Read guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Getting Started Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-brand-50 to-brand-100 border-brand-200">
          <CardContent className="p-12">
            <BookOpen className="w-12 h-12 text-brand-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              New to priv QR?
            </h2>
            <p className="text-lg text-gray-900 mb-6 max-w-2xl mx-auto">
              Start with our Crypto guide to learn the basics of QR code generation, 
              then explore other features as you need them.
            </p>
            <Link href="/guides/crypto">
              <button className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                Start with Crypto Guide
              </button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}