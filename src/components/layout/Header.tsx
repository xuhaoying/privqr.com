'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Github, Sparkles } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/crypto', label: 'Crypto', badge: '🔥' },
    { href: '/matter', label: 'Matter', badge: '⚡' },
    { href: '/bulk', label: 'Bulk', badge: '💎' },
    { href: '/3d', label: '3D Print', badge: '🚀' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative w-8 h-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/logo-transparent.svg"
                alt="priv QR"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex items-center space-x-2">
              <AnimatedGradientText className="text-xl font-bold">
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
                className="text-xs"
              >
                ✨
              </motion.div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    pathname === link.href
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'text-gray-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {link.label}
                    {link.badge && (
                      <span className="text-xs opacity-75">{link.badge}</span>
                    )}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-500 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/xuhaoying/privqr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <Github className="w-5 h-5" />
            </Link>
            <ShimmerButton
              background="rgba(16, 217, 163, 1)"
              className="text-white text-sm px-4 py-2"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Pro Version
            </ShimmerButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ x: -20, opacity: 0 }}
              animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.badge && (
                    <span className="text-sm opacity-75">{link.badge}</span>
                  )}
                </span>
              </Link>
            </motion.div>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="https://github.com/xuhaoying/privqr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </Link>
              <ShimmerButton
                background="rgba(16, 217, 163, 1)"
                className="text-white mx-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Pro Version
              </ShimmerButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}