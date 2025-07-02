import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeatureLinks } from '@/components/seo/RelatedContent';

export const metadata = {
  title: 'Privacy Policy | priv QR',
  description: 'Privacy policy for priv QR - Learn how we protect your data and ensure complete privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <p>
              At priv QR, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our QR code generation service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Information You Provide</h3>
            <ul>
              <li>QR code content you enter (text, URLs, contact information)</li>
              <li>Cryptocurrency addresses (for crypto QR generation)</li>
              <li>WiFi credentials (for WiFi QR codes)</li>
              <li>Contact information (for contact QR codes)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Usage statistics (number of QR codes generated)</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Access times and pages visited</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Protect Your Data</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Client-Side Processing</h3>
            <p>
              <strong>Your sensitive data never leaves your browser.</strong> All QR code generation happens locally on your device. We do not transmit, store, or have access to:
            </p>
            <ul>
              <li>Your QR code content</li>
              <li>Cryptocurrency addresses or amounts</li>
              <li>Personal contact information</li>
              <li>WiFi passwords or network credentials</li>
            </ul>

            <h3>Local Storage</h3>
            <p>
              We use browser local storage only to:
            </p>
            <ul>
              <li>Track daily usage quotas</li>
              <li>Remember your preferred settings</li>
              <li>Enable offline functionality</li>
            </ul>
            
            <FeatureLinks 
              features={['crypto', 'matter', 'bulk']} 
              title="Privacy-Protected QR Generators" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Analytics</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Essential Cookies</h3>
            <p>We use essential cookies to:</p>
            <ul>
              <li>Maintain your session and preferences</li>
              <li>Remember your usage quota</li>
              <li>Enable core functionality</li>
            </ul>

            <h3>Analytics</h3>
            <p>We may use privacy-focused analytics to understand:</p>
            <ul>
              <li>Which features are most popular</li>
              <li>Overall usage patterns (anonymized)</li>
              <li>Performance and error rates</li>
            </ul>
            <p>All analytics data is aggregated and cannot identify individual users.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Hosting and Infrastructure</h3>
            <p>Our website is hosted on Vercel, which may collect:</p>
            <ul>
              <li>Server logs and access information</li>
              <li>Performance metrics</li>
              <li>Security-related data</li>
            </ul>
            
            <h3>No Data Sharing</h3>
            <p>
              We do not sell, trade, or share your personal information with third parties for marketing purposes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>You have the right to:</p>
            <ul>
              <li>Access information about your data (though we store minimal data)</li>
              <li>Clear your local storage at any time</li>
              <li>Use our service without providing personal information</li>
              <li>Request deletion of any server-side analytics data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Children&apos;s Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul>
              <li>Email: privacy@qrtoolkit.com</li>
              <li>GitHub: <a href="https://github.com/xuhaoying/privqr.com" target="_blank" rel="noopener noreferrer">github.com/xuhaoying/privqr.com</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}