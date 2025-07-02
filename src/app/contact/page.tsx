import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { RelatedContent } from '@/components/seo/RelatedContent';

export const metadata = {
  title: 'Contact Us | priv QR',
  description: 'Get in touch with the priv QR team. We\'re here to help with questions, feedback, and support.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">Get in Touch</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                We&apos;d love to hear from you! Whether you have questions, feedback, or need support, we&apos;re here to help.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-800 dark:border-gray-600"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>
                
                <ShimmerButton
                  background="rgba(16, 217, 163, 1)"
                  className="w-full text-white"
                >
                  Send Message
                </ShimmerButton>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                * This is a demo form. For actual contact, please use the methods listed on the right.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                📧 Email Support
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For general inquiries and support:
              </p>
              <p className="font-medium">support@privqr.com</p>
              
              <p className="text-gray-600 mb-2 mt-4">
                For privacy-related questions:
              </p>
              <p className="font-medium">privacy@privqr.com</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                💻 GitHub
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Report bugs, request features, or contribute to development:
              </p>
              <a 
                href="https://github.com/xuhaoying/privqr.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:text-brand-800"
              >
                github.com/xuhaoying/privqr.com
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                📚 Documentation
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Before contacting us, check our comprehensive documentation:
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="/docs/USER_GUIDE.md" className="text-brand-600 hover:text-brand-800">
                    User Guide
                  </a>
                </li>
                <li>
                  <a href="/docs/CRYPTO_GUIDE.md" className="text-brand-600 hover:text-brand-800">
                    Crypto QR Guide
                  </a>
                </li>
                <li>
                  <a href="/docs/BULK_GUIDE.md" className="text-brand-600 hover:text-brand-800">
                    Bulk Processing Guide
                  </a>
                </li>
                <li>
                  <a href="/docs/TROUBLESHOOTING.md" className="text-brand-600 hover:text-brand-800">
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                🕒 Response Times
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>General inquiries:</strong> 24-48 hours
                </li>
                <li>
                  <strong>Bug reports:</strong> 1-3 business days
                </li>
                <li>
                  <strong>Feature requests:</strong> 1 week
                </li>
                <li>
                  <strong>Privacy concerns:</strong> Same day
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                🌍 Community
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Join our community for discussions, tips, and peer support:
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-brand-600 hover:text-brand-800">
                    GitHub Discussions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-brand-600 hover:text-brand-800">
                    Discord Community (Coming Soon)
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-brand-50 border-brand-200">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-800">
                💡 Quick Help
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-brand-700 text-sm">
                <strong>Common Questions:</strong>
              </p>
              <ul className="text-sm text-brand-600 space-y-1 mt-2">
                <li>• All data processing happens in your browser</li>
                <li>• Daily limit: 50 QR codes, Batch limit: 20</li>
                <li>• Works completely offline after first load</li>
                <li>• Supports Bitcoin, Ethereum, Lightning payments</li>
                <li>• Free and open source forever</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <RelatedContent currentPage="/contact" />
    </div>
  );
}