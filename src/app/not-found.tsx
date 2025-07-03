import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-6">
            <FileQuestion className="w-10 h-10 text-brand-600" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-2">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            
            <Link
              href="/crypto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              Try QR Generator
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <Link href="/crypto" className="hover:text-brand-600 underline">
                Crypto QR
              </Link>
              <span>•</span>
              <Link href="/matter" className="hover:text-brand-600 underline">
                Matter/IoT
              </Link>
              <span>•</span>
              <Link href="/bulk" className="hover:text-brand-600 underline">
                Bulk Processing
              </Link>
              <span>•</span>
              <Link href="/3d" className="hover:text-brand-600 underline">
                3D Print
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}