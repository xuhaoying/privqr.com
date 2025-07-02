'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Github, Twitter, Mail, Heart, Shield, Zap, Globe } from 'lucide-react';

const footerLinks = {
  features: [
    { href: '/crypto', label: 'Crypto QR Codes', badge: '🔥' },
    { href: '/matter', label: 'Matter/IoT', badge: '⚡' },
    { href: '/bulk', label: 'Bulk Processing', badge: '💎' },
    { href: '/3d', label: '3D Printing', badge: '🚀' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
  resources: [
    { href: '/docs/USER_GUIDE.md', label: 'User Guide' },
    { href: 'https://github.com/xuhaoying/privqr.com', label: 'GitHub', external: true },
    { href: '/docs/TROUBLESHOOTING.md', label: 'Support' },
  ],
  social: [
    { href: 'https://github.com/xuhaoying/privqr.com', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:support@privqr.com', icon: Mail, label: 'Email' },
  ]
};

const trustFeatures = [
  { icon: Shield, text: '100% Client-Side Processing' },
  { icon: Zap, text: 'Sub-50ms Generation Speed' },
  { icon: Globe, text: 'Works Completely Offline' },
];

export function FooterEnhanced() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <AnimatedGradientText className="text-2xl font-bold">
                priv QR
              </AnimatedGradientText>
              <motion.div
                animate={{ 
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                className="text-lg"
              >
                ✨
              </motion.div>
            </div>
            <p className="text-black dark:text-white mb-6 leading-relaxed">
              Privacy-first QR code generator for professionals. Generate Bitcoin, Ethereum, Lightning, 
              IoT device codes, and more - all in your browser with zero data collection.
            </p>
            
            {/* Trust Features */}
            <div className="space-y-3">
              {trustFeatures.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-sm text-black dark:text-white"
                >
                  <feature.icon className="w-4 h-4 text-brand-500" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h4 className="font-semibold text-black dark:text-white mb-3">
                Stay Updated
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-800 text-sm"
                />
                <ShimmerButton
                  background="rgba(16, 217, 163, 1)"
                  className="text-white px-4 py-2 text-sm"
                >
                  Subscribe
                </ShimmerButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-black dark:text-white mb-4">Features</h4>
            <ul className="space-y-3">
              {footerLinks.features.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-black dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-xs opacity-70">{link.badge}</span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-black dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-black dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-black dark:text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-black dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-medium text-black dark:text-white mb-3 text-sm">Connect</h5>
              <div className="flex gap-3">
                {footerLinks.social.map((social, index) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-black dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-full"
              >
                <Shield className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  🔒 Your data never leaves your browser
                </span>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-black dark:text-white">
              <span>© 2024 priv QR</span>
              <span>•</span>
              <span>Open Source</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>for Privacy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}