import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | QR Toolkit',
  description: 'Learn about QR Toolkit - The privacy-first, professional QR code generator for developers, businesses, and crypto users.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
        About QR Toolkit
      </h1>
      
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              QR Toolkit is dedicated to providing the most secure, privacy-focused, and professional QR code generation service available. We believe that your data should remain private, and our tools should work when you need them most.
            </p>
            
            <p>
              In an era where data privacy is paramount, we&apos;ve built a tool that processes everything locally in your browser. No servers, no data collection, no privacy concerns - just powerful QR code generation when and where you need it.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔒 Privacy First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                All QR code generation happens entirely in your browser. Your sensitive data - cryptocurrency addresses, contact information, WiFi passwords - never touches our servers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Lightning Fast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Generate QR codes in under 50ms with zero dependencies. Our optimized algorithms ensure instant results without compromise on quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📱 Works Offline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Once loaded, QR Toolkit works completely offline. Generate QR codes anywhere, anytime - no internet connection required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏗️ Professional Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Built for professionals with industry-standard formats, bulk processing, validation reports, and advanced customization options.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>What Makes Us Different</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Specialized for Modern Use Cases</h3>
            <p>
              While other QR generators focus on basic text and URLs, we&apos;ve built specialized tools for:
            </p>
            <ul>
              <li><strong>Cryptocurrency Payments</strong> - Bitcoin, Ethereum, and Lightning Network with full compliance to BIP-21, EIP-681, and BOLT-11 standards</li>
              <li><strong>IoT Device Pairing</strong> - Matter/Thread device codes following CSA specifications</li>
              <li><strong>Bulk Processing</strong> - CSV-based batch generation for enterprise use cases</li>
              <li><strong>3D Printing</strong> - Optimized QR codes for physical manufacturing and products</li>
            </ul>

            <h3>Built by Developers, for Everyone</h3>
            <p>
              Our team understands the frustration of QR tools that don&apos;t work when you need them, compromise your privacy, or lack the features professionals require. That&apos;s why we built QR Toolkit with:
            </p>
            <ul>
              <li>Open source transparency</li>
              <li>Industry-standard compliance</li>
              <li>Enterprise-grade reliability</li>
              <li>Consumer-friendly simplicity</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Our Technology</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Technical Excellence</h3>
            <p>
              QR Toolkit is built with modern web technologies to ensure maximum performance, security, and compatibility:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4>Frontend</h4>
                <ul className="text-sm">
                  <li>Next.js 15 with App Router</li>
                  <li>TypeScript for type safety</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Web Workers for performance</li>
                </ul>
              </div>
              <div>
                <h4>QR Generation</h4>
                <ul className="text-sm">
                  <li>Multiple format support (PNG, SVG)</li>
                  <li>Error correction optimization</li>
                  <li>Custom sizing and styling</li>
                  <li>Logo embedding capabilities</li>
                </ul>
              </div>
            </div>

            <h3>Security & Privacy</h3>
            <ul>
              <li>Client-side processing only</li>
              <li>No data transmission to servers</li>
              <li>Secure headers and CSP policies</li>
              <li>Open source for transparency</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Community & Support</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Open Source</h3>
            <p>
              QR Toolkit is fully open source. We believe in transparency and community-driven development. You can:
            </p>
            <ul>
              <li>View our source code on GitHub</li>
              <li>Report issues and suggest features</li>
              <li>Contribute to development</li>
              <li>Fork and customize for your needs</li>
            </ul>

            <h3>Support Channels</h3>
            <ul>
              <li><strong>Documentation</strong> - Comprehensive guides for all features</li>
              <li><strong>GitHub Issues</strong> - Bug reports and feature requests</li>
              <li><strong>Community</strong> - Discussion and help from other users</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Future Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>We&apos;re continuously improving QR Toolkit with new features and capabilities:</p>
            
            <h3>Coming Soon</h3>
            <ul>
              <li>Advanced customization options</li>
              <li>More cryptocurrency support</li>
              <li>Enhanced 3D printing features</li>
              <li>API for developers</li>
              <li>Mobile app versions</li>
            </ul>

            <h3>Long Term Vision</h3>
            <p>
              Our goal is to become the definitive QR code solution for professionals while maintaining our core values of privacy, security, and ease of use.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who trust QR Toolkit for their QR code needs.
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
                Try Bulk Processing
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}