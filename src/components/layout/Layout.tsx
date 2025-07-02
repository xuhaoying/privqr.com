import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>🔒 Your data never leaves your browser</p>
          <p className="mt-2">
            © 2024 QR Toolkit · Open Source · Privacy First
          </p>
        </div>
      </footer>
    </div>
  );
}