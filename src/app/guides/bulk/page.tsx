'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Grid3x3,
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/magicui/text-effect';

interface ContentItem {
  type: string;
  title: string;
  text?: string;
  example?: string;
  features?: string[];
  types?: { type: string; format: string; example: string; }[];
  tips?: string[];
  steps?: string[];
  settings?: { name: string; description: string; recommendation: string; }[];
  examples?: { title: string; description: string; template: string; }[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: ContentItem[];
}

const sections: Section[] = [
  {
    id: 'overview',
    title: 'Bulk QR Generation Overview',
    icon: Grid3x3,
    content: [
      {
        type: 'overview',
        title: 'What is Bulk Generation?',
        text: 'Bulk QR code generation allows you to create hundreds or thousands of QR codes at once from structured data. Perfect for inventory management, event tickets, product labeling, and marketing campaigns.'
      },
      {
        type: 'features',
        title: 'Key Features',
        features: [
          'Generate up to 10,000 QR codes in one batch',
          'Support for CSV and Excel file formats',
          'Customizable templates for different use cases',
          'Real-time progress tracking',
          'Batch download as ZIP file',
          'Automatic error validation'
        ]
      }
    ]
  },
  {
    id: 'file-preparation',
    title: 'Preparing Your Data',
    icon: FileSpreadsheet,
    content: [
      {
        type: 'csv-format',
        title: 'CSV File Format',
        text: 'Your CSV file should have headers in the first row, with each subsequent row representing one QR code.',
        example: `type,data,label
url,https://example.com/product1,Product 1
text,SKU-12345,Inventory Item
email,contact@example.com,Support Email
phone,+1234567890,Customer Service`
      },
      {
        type: 'supported-types',
        title: 'Supported QR Code Types',
        types: [
          { type: 'URL', format: 'Any valid HTTP/HTTPS URL', example: 'https://example.com' },
          { type: 'Text', format: 'Plain text up to 2000 characters', example: 'Product description' },
          { type: 'Email', format: 'Email address with optional subject/body', example: 'user@example.com' },
          { type: 'Phone', format: 'Phone number with country code', example: '+1234567890' },
          { type: 'SMS', format: 'Phone number with optional message', example: '+1234567890,Hello' },
          { type: 'WiFi', format: 'SSID,Password,Security', example: 'MyWiFi,password123,WPA' }
        ]
      },
      {
        type: 'tips',
        title: 'Data Preparation Tips',
        tips: [
          'Remove any special characters that might cause encoding issues',
          'Ensure URLs are properly formatted with http:// or https://',
          'Keep labels short and descriptive for easy identification',
          'Test with a small batch (10-20 codes) first',
          'Use UTF-8 encoding for international characters'
        ]
      }
    ]
  },
  {
    id: 'step-by-step',
    title: 'Step-by-Step Process',
    icon: Package,
    content: [
      {
        type: 'steps',
        title: 'How to Generate Bulk QR Codes',
        steps: [
          'Navigate to the Bulk page from the main menu',
          'Download the CSV template for your use case',
          'Fill in your data following the template format',
          'Save the file as CSV (UTF-8 encoded)',
          'Click "Upload CSV" and select your file',
          'Review the preview to ensure data is correct',
          'Configure QR code settings (size, error correction)',
          'Click "Generate All QR Codes"',
          'Wait for processing (≈100 codes/second)',
          'Download the ZIP file containing all QR codes'
        ]
      },
      {
        type: 'settings',
        title: 'Configuration Options',
        settings: [
          {
            name: 'QR Code Size',
            description: 'Default 300x300px, adjustable from 100-1000px',
            recommendation: 'Use 300px for print, 150px for digital'
          },
          {
            name: 'Error Correction',
            description: 'L (7%), M (15%), Q (25%), H (30%)',
            recommendation: 'Use M for general use, H for printed materials'
          },
          {
            name: 'File Format',
            description: 'PNG, SVG, or both',
            recommendation: 'PNG for immediate use, SVG for scalability'
          },
          {
            name: 'Naming Pattern',
            description: 'Use {label}, {index}, or custom pattern',
            recommendation: '{label}_{index} for unique identifiers'
          }
        ]
      }
    ]
  },
  {
    id: 'use-cases',
    title: 'Common Use Cases',
    icon: Zap,
    content: [
      {
        type: 'examples',
        title: 'Real-World Applications',
        examples: [
          {
            title: 'Event Management',
            description: 'Generate unique QR tickets for attendees',
            template: 'Event name, Attendee name, Ticket ID, Seat number'
          },
          {
            title: 'Inventory Tracking',
            description: 'Create QR labels for products and assets',
            template: 'SKU, Product name, Location, Purchase date'
          },
          {
            title: 'Marketing Campaigns',
            description: 'Unique QR codes for tracking campaign performance',
            template: 'Campaign URL, Source, Medium, Content ID'
          },
          {
            title: 'Restaurant Menus',
            description: 'Table-specific QR codes for digital menus',
            template: 'Menu URL, Table number, Location'
          }
        ]
      }
    ]
  }
];

const troubleshooting = [
  {
    issue: 'Upload fails with "Invalid format" error',
    solution: 'Ensure your CSV uses UTF-8 encoding and has proper headers. Check for extra commas or special characters.'
  },
  {
    issue: 'Some QR codes are missing',
    solution: 'Check for empty rows in your CSV. Each row must have required data fields filled.'
  },
  {
    issue: 'ZIP download is slow',
    solution: 'Large batches (>1000 codes) may take time. The process runs locally, so performance depends on your device.'
  },
  {
    issue: 'QR codes look blurry when printed',
    solution: 'Increase the size to at least 300px and use High error correction level for print materials.'
  }
];

export default function BulkGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guides
        </Link>
        
        <TextEffect
          preset="fade-in-blur"
          as="h1"
          className="text-4xl lg:text-5xl font-bold mb-4"
        >
          Bulk QR Code Guide
        </TextEffect>
        
        <p className="text-lg text-gray-900">
          Master the art of generating thousands of QR codes efficiently with our 
          bulk processing feature. Perfect for large-scale deployments.
        </p>
      </motion.div>

      {/* Performance Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast Processing</h3>
                <p className="text-sm text-gray-900">
                  Generate up to 100 QR codes per second, all processed locally in your browser. 
                  No server uploads means your data stays private and processing is instant.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            id={section.id}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <section.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            </div>

            <div className="space-y-6">
              {section.content.map((item: ContentItem, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    {item.type === 'overview' && (
                      <>
                        <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                        <p className="text-gray-900">{item.text}</p>
                      </>
                    )}

                    {item.type === 'features' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.features?.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-900">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.type === 'csv-format' && (
                      <>
                        <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                        <p className="text-gray-900 mb-4">{item.text}</p>
                        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">{item.example}</pre>
                        </div>
                      </>
                    )}

                    {item.type === 'supported-types' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-3">
                          {item.types?.map((type: { type: string; format: string; example: string; }, idx: number) => (
                            <div key={idx} className="border-l-4 border-purple-200 pl-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">{type.type}</span>
                              </div>
                              <p className="text-sm text-gray-900">{type.format}</p>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                {type.example}
                              </code>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'tips' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.tips?.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-500 mt-1">•</span>
                              <span className="text-gray-900">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.type === 'steps' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ol className="space-y-3">
                          {item.steps?.map((step: string, idx: number) => (
                            <li key={idx} className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                              </span>
                              <span className="text-gray-900">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </>
                    )}

                    {item.type === 'settings' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-4">
                          {item.settings?.map((setting: { name: string; description: string; recommendation: string; }, idx: number) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900">{setting.name}</h4>
                              <p className="text-sm text-gray-900 mt-1">{setting.description}</p>
                              <p className="text-sm text-purple-600 mt-2">
                                💡 {setting.recommendation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'examples' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="grid gap-4">
                          {item.examples?.map((example: { title: string; description: string; template: string; }, idx: number) => (
                            <div key={idx} className="border rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                              <p className="text-sm text-gray-900 mb-2">{example.description}</p>
                              <p className="text-xs text-gray-900 bg-gray-100 px-3 py-2 rounded">
                                Template: {example.template}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Troubleshooting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            {troubleshooting.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.issue}</h3>
                      <p className="text-gray-900">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Bulk Generation</h3>
              <p className="text-gray-900 mb-6">
                Ready to generate QR codes at scale? Download our templates and get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bulk">
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Go to Bulk Generator
                  </button>
                </Link>
                <a href="/templates/bulk-template.csv" download>
                  <button className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Template
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}