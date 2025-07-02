'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/crypto', label: 'Crypto' },
    { href: '/matter', label: 'Matter' },
    { href: '/bulk', label: 'Bulk' },
    { href: '/3d', label: '3D Print' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src="/logo-transparent.svg"
                alt="priv QR"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900">priv QR</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-brand-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/xuhaoying/privqr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              GitHub
            </Link>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}