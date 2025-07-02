import { ReactNode } from 'react';
import { Header } from './Header';
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
      <footer className="mt-auto py-6 bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">priv QR</h3>
              <p className="text-sm text-gray-600">
                Privacy-first QR code generator for professionals
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/crypto" className="hover:text-brand-600">Crypto QR Codes</a></li>
                <li><a href="/matter" className="hover:text-brand-600">Matter/IoT</a></li>
                <li><a href="/bulk" className="hover:text-brand-600">Bulk Processing</a></li>
                <li><a href="/3d" className="hover:text-brand-600">3D Printing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/about" className="hover:text-brand-600">About Us</a></li>
                <li><a href="/contact" className="hover:text-brand-600">Contact</a></li>
                <li><a href="/privacy" className="hover:text-brand-600">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-brand-600">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/docs/USER_GUIDE.md" className="hover:text-brand-600">User Guide</a></li>
                <li><a href="https://github.com/xuhaoying/privqr.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">GitHub</a></li>
                <li><a href="/docs/TROUBLESHOOTING.md" className="hover:text-brand-600">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              🔒 Your data never leaves your browser
            </p>
            <p className="text-sm text-gray-500">
              © 2024 priv QR · Open Source · Privacy First
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}