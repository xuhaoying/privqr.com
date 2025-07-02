import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Service | priv QR',
  description: 'Terms of Service for priv QR - Usage guidelines and legal terms for our QR code generation service.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <p>
              By accessing and using priv QR (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              priv QR is a free, privacy-focused QR code generation service that provides:
            </p>
            <ul>
              <li>Professional QR code generation for various use cases</li>
              <li>Cryptocurrency payment QR codes (Bitcoin, Ethereum, Lightning Network)</li>
              <li>Matter/IoT device pairing codes</li>
              <li>Bulk QR code generation from CSV files</li>
              <li>3D printable QR code designs</li>
              <li>Client-side processing for maximum privacy</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Permitted Uses</h3>
            <p>You may use our Service for:</p>
            <ul>
              <li>Legitimate business and personal purposes</li>
              <li>Creating QR codes for legal content</li>
              <li>Educational and research purposes</li>
              <li>Open source and commercial projects</li>
            </ul>

            <h3>Prohibited Uses</h3>
            <p>You may not use our Service to:</p>
            <ul>
              <li>Create QR codes containing illegal, harmful, or malicious content</li>
              <li>Generate codes for phishing, fraud, or scam activities</li>
              <li>Distribute malware, viruses, or harmful software</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Generate excessive automated requests that burden our infrastructure</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Limits and Quotas</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Free Tier Limitations</h3>
            <ul>
              <li>Daily limit: 50 QR codes per day</li>
              <li>Batch processing: Maximum 20 QR codes per batch</li>
              <li>File size limits for CSV uploads</li>
            </ul>

            <h3>Fair Use Policy</h3>
            <p>
              We implement usage quotas to ensure fair access for all users. Attempts to circumvent these limits may result in temporary or permanent service restrictions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy and Data</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Client-Side Processing</h3>
            <p>
              All QR code generation occurs in your browser. We do not have access to your QR code content, ensuring complete privacy for sensitive information like:
            </p>
            <ul>
              <li>Cryptocurrency addresses and transaction details</li>
              <li>Personal contact information</li>
              <li>WiFi credentials</li>
              <li>Business or personal data</li>
            </ul>

            <h3>Data Responsibility</h3>
            <p>
              While we prioritize privacy, users are responsible for:
            </p>
            <ul>
              <li>Ensuring their content complies with applicable laws</li>
              <li>Not sharing sensitive information inappropriately</li>
              <li>Understanding the permanent nature of QR codes once distributed</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Your Content</h3>
            <p>
              You retain all rights to the content you input into our Service. By using our Service, you grant us no rights to your content beyond what is necessary to provide the Service.
            </p>

            <h3>Our Service</h3>
            <p>
              The priv QR service, including its code, design, and functionality, is protected by intellectual property rights. Our source code is available under an open source license.
            </p>

            <h3>Generated QR Codes</h3>
            <p>
              QR codes generated through our Service belong to you. You may use them for any lawful purpose without restriction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimers and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Service Availability</h3>
            <p>
              We provide the Service on an &quot;as-is&quot; basis. While we strive for 100% uptime, we cannot guarantee uninterrupted service availability.
            </p>

            <h3>Accuracy and Reliability</h3>
            <p>
              We strive to ensure our QR code generation is accurate, but users should verify generated codes before important use cases, especially for:
            </p>
            <ul>
              <li>Financial transactions</li>
              <li>Critical business applications</li>
              <li>Security-sensitive implementations</li>
            </ul>

            <h3>Third-Party Content</h3>
            <p>
              We are not responsible for content accessed through QR codes generated using our Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              To the maximum extent permitted by law, priv QR shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice, if you breach these Terms. You may discontinue use of the Service at any time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Email: support@qrtoolkit.com</li>
              <li>GitHub: <a href="https://github.com/xuhaoying/privqr.com" target="_blank" rel="noopener noreferrer">github.com/xuhaoying/privqr.com</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}