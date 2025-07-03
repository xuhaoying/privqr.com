"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Bitcoin, Wifi, Upload, Printer, Shield, Zap, Globe } from 'lucide-react';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { TextEffect } from '@/components/magicui/text-effect';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dynamic imports for heavy components
const BentoGrid = dynamic(() => import('@/components/ui/bento-grid').then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-96" />
});

const BentoCard = dynamic(() => import('@/components/ui/bento-grid').then(mod => ({ default: mod.BentoCard })), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-48" />
});

const BorderBeam = dynamic(() => import('@/components/magicui/border-beam').then(mod => ({ default: mod.BorderBeam })), {
  ssr: false
});

const AnimatedList = dynamic(() => import('@/components/magicui/animated-list').then(mod => ({ default: mod.AnimatedList })), {
  ssr: false
});

const FAQSchema = dynamic(() => import('@/components/seo/StructuredData').then(mod => ({ default: mod.FAQSchema })), {
  ssr: true
});

const features = [
  {
    name: 'Crypto QR Generator',
    description: 'Bitcoin, Ethereum & Lightning Network QR codes with full BIP-21, EIP-681, and BOLT-11 compliance',
    href: '/crypto',
    cta: 'Generate Crypto QR',
    Icon: Bitcoin,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200 dark:from-orange-900/20 dark:to-amber-800/20" />
    ),
    className: "md:col-span-2",
  },
  {
    name: 'Matter/IoT Pairing',
    description: 'Smart device pairing codes with Matter 1.x standard compliance and CSA certification',
    href: '/matter',
    cta: 'Create Device Code',
    Icon: Wifi,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-brand-200 to-emerald-200 dark:from-brand-900/20 dark:to-emerald-800/20" />
    ),
    className: "md:col-span-2",
  },
  {
    name: 'Bulk Processing',
    description: 'CSV batch processing with comprehensive validation reports and automated ZIP downloads',
    href: '/bulk',
    cta: 'Process CSV',
    Icon: Upload,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-teal-200 dark:from-green-900/20 dark:to-teal-800/20" />
    ),
    className: "md:col-span-2",
  },
  {
    name: '3D Printable QR',
    description: 'STL-ready QR codes optimized for 3D printing, physical manufacturing, and product embedding',
    href: '/3d',
    cta: 'Create 3D QR',
    Icon: Printer,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-200 to-pink-200 dark:from-purple-900/20 dark:to-pink-800/20" />
    ),
    className: "md:col-span-2",
  },
];

const trustStats = [
  { icon: '🔒', number: '100%', text: 'Client-Side Processing' },
  { icon: '⚡', number: '<50ms', text: 'Generation Speed' },
  { icon: '📱', number: '∞', text: 'Offline Capability' },
  { icon: '🆓', number: '0$', text: 'Forever Free' },
];

const recentActivity = [
  { icon: '💳', text: 'Bitcoin payment QR generated', time: '2s ago' },
  { icon: '📱', text: 'Matter device paired successfully', time: '5s ago' },
  { icon: '📊', text: 'Bulk CSV processed (50 items)', time: '12s ago' },
  { icon: '🏗️', text: '3D QR model downloaded', time: '18s ago' },
  { icon: '⚡', text: 'Lightning invoice created', time: '25s ago' },
];

// Metadata moved to layout.tsx for client components

export default function HomePage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  🎉 100% Privacy-First QR Generator
                </span>
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Main Title with Gradient Animation */}
            <div className="space-y-4">
              <TextEffect
                preset="fade-in-blur"
                as="h1"
                className="text-6xl lg:text-8xl font-bold tracking-tight"
              >
                Professional
              </TextEffect>
              <div className="relative">
                <AnimatedGradientText className="text-6xl lg:text-8xl font-bold tracking-tight">
                  QR Generator
                </AnimatedGradientText>
              </div>
            </div>

            {/* Subtitle */}
            <TextEffect
              preset="fade-in-blur"
              as="p"
              className="text-xl lg:text-2xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed"
            >
              Create crypto-ready, IoT-compatible, and business-grade QR codes with zero dependencies. 
              Everything happens in your browser - no servers, no data collection, no privacy concerns.
            </TextEffect>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link href="/crypto">
                <ShimmerButton 
                  background="rgba(16, 217, 163, 1)"
                  className="text-white text-lg px-8 py-4 animate-pulse-glow"
                >
                  🚀 Start Generating
                </ShimmerButton>
              </Link>
              <Link href="/about">
                <ShimmerButton 
                  background="rgba(255, 255, 255, 1)"
                  className="text-gray-900 text-lg px-8 py-4 border border-gray-200"
                >
                  🔍 Learn More
                </ShimmerButton>
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16"
            >
              {trustStats.map((stat, index) => (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stat.number}</div>
                  <div className="text-sm text-black dark:text-white">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <AnimatedGradientText>
                Powerful Tools
              </AnimatedGradientText>
            </h2>
            <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
              Professional-grade QR code generation for every use case
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BentoGrid className="max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Link href={feature.href}>
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
                </motion.div>
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      {/* Live Activity Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Real-time
                <br />
                <AnimatedGradientText>
                  Privacy Protection
                </AnimatedGradientText>
              </h2>
              <p className="text-xl text-black dark:text-gray-300 mb-8">
                Watch as QR codes are generated entirely in your browser. No data ever leaves your device, 
                ensuring complete privacy and security for your sensitive information.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Shield className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Zero Servers</h3>
                    <p className="text-sm text-black">100% client-side</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Zap className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-sm text-black">Sub-50ms generation</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Globe className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Works Offline</h3>
                    <p className="text-sm text-black">No internet needed</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="relative">
              <Card className="relative overflow-hidden">
                <BorderBeam size={300} duration={15} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    Live Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedList className="space-y-3" delay={2000}>
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.text}</p>
                          <p className="text-xs text-black">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </AnimatedList>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to create amazing
              <br />
              <AnimatedGradientText>
                QR codes?
              </AnimatedGradientText>
            </h2>
            <p className="text-xl text-black dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust priv QR for their professional QR code needs. 
              Start generating now, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/crypto">
                <ShimmerButton 
                  background="rgba(16, 217, 163, 1)"
                  className="text-white text-lg px-8 py-4"
                >
                  🚀 Generate Crypto QR
                </ShimmerButton>
              </Link>
              <Link href="/bulk">
                <ShimmerButton 
                  background="rgba(16, 185, 129, 1)"
                  className="text-white text-lg px-8 py-4"
                >
                  📊 Try Bulk Processing
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <FAQSchema />
      </Suspense>
    </div>
  );
}