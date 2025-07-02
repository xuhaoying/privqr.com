import { ReactNode } from 'react';
import { Header } from './Header';
import { FooterEnhanced } from './Footer-enhanced';
import { BreadcrumbsClient } from '@/components/seo/BreadcrumbsClient';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbsClient />
        {children}
      </main>
      <FooterEnhanced />
    </div>
  );
}