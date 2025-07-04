'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Cpu,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  Router,
  Home,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/magicui/text-effect';

interface Field {
  name: string;
  description: string;
  example?: string;
}

interface Platform {
  name: string;
  steps: string[];
}

interface Issue {
  problem: string;
  solution: string;
}

interface ContentItem {
  type: string;
  title: string;
  text?: string;
  features?: string[];
  fields?: Field[];
  steps?: string[];
  platforms?: Platform[];
  issues?: Issue[];
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
    title: 'What is Matter?',
    icon: Cpu,
    content: [
      {
        type: 'overview',
        title: 'Understanding Matter Protocol',
        text: 'Matter (formerly Project CHIP) is an industry-unifying standard for smart home devices. It enables secure, reliable, and seamless cross-platform connectivity between devices from different manufacturers.'
      },
      {
        type: 'features',
        title: 'Key Benefits',
        features: [
          'Works with Apple HomeKit, Google Home, Amazon Alexa, and more',
          'Local control without internet dependency',
          'Enhanced security with encrypted communications',
          'Simple setup via QR code scanning'
        ]
      }
    ]
  },
  {
    id: 'components',
    title: 'QR Code Components',
    icon: Settings,
    content: [
      {
        type: 'fields',
        title: 'Required Information',
        fields: [
          {
            name: 'Vendor ID (VID)',
            description: 'Unique identifier assigned by the Connectivity Standards Alliance (CSA). Use 0xFFF1-0xFFF4 for testing.',
            example: '0xFFF1'
          },
          {
            name: 'Product ID (PID)',
            description: 'Identifies specific product model from the vendor. Must be registered with CSA for production.',
            example: '0x8001'
          },
          {
            name: 'Setup PIN',
            description: '8-digit code for device pairing. Avoid patterns like 12345678 or 00000000.',
            example: '20202021'
          },
          {
            name: 'Discriminator',
            description: '12-bit value (0-4095) to differentiate devices during commissioning.',
            example: '3840'
          }
        ]
      },
      {
        type: 'optional',
        title: 'Optional Parameters',
        fields: [
          {
            name: 'Version Info',
            description: 'Include Matter specification version for compatibility checking'
          },
          {
            name: 'NFC Support',
            description: 'Generate NDEF payload for NFC tag programming'
          },
          {
            name: 'Discovery Capabilities',
            description: 'Specify BLE, WiFi, or Thread support'
          }
        ]
      }
    ]
  },
  {
    id: 'step-by-step',
    title: 'Step-by-Step Guide',
    icon: Router,
    content: [
      {
        type: 'steps',
        title: 'Generating Matter QR Codes',
        steps: [
          'Navigate to the Matter/IoT page from the main menu',
          'Enter your Vendor ID (VID) - use test range 0xFFF1-0xFFF4 for development',
          'Enter your Product ID (PID) - any hex value like 0x8001',
          'Generate a secure Setup PIN - 8 digits, avoid sequential numbers',
          'Set Discriminator value between 0-4095 (e.g., 3840)',
          'Enable "Validate VID/PID" to check against CSA database',
          'Select additional options like version info or NFC payload',
          'Click "Generate Secure Matter QR" button',
          'Test the QR code with your smart home app'
        ]
      },
      {
        type: 'validation',
        title: 'Validation Process',
        text: 'The generator validates your inputs against Matter specifications and CSA requirements. It checks PIN complexity, VID/PID validity, and ensures discriminator is within range.'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Testing Your QR Code',
    icon: Smartphone,
    content: [
      {
        type: 'platforms',
        title: 'Compatible Platforms',
        platforms: [
          {
            name: 'Apple Home',
            steps: ['Open Home app', 'Tap + button', 'Scan Matter QR code', 'Follow setup prompts']
          },
          {
            name: 'Google Home',
            steps: ['Open Google Home', 'Tap + button', 'Select "Set up device"', 'Choose "Matter-enabled device"', 'Scan QR code']
          },
          {
            name: 'Amazon Alexa',
            steps: ['Open Alexa app', 'Go to Devices', 'Tap + button', 'Select "Add Device"', 'Choose Matter', 'Scan code']
          }
        ]
      },
      {
        type: 'troubleshooting',
        title: 'Common Issues',
        issues: [
          {
            problem: 'QR code not recognized',
            solution: 'Ensure you\'re using a Matter-compatible app version and the QR code size is at least 30mm²'
          },
          {
            problem: 'Invalid PIN error',
            solution: 'Avoid sequential (12345678) or repeated (11111111) patterns. Use random 8-digit numbers.'
          },
          {
            problem: 'VID/PID validation fails',
            solution: 'For testing, use VIDs in range 0xFFF1-0xFFF4. Production VIDs must be registered with CSA.'
          }
        ]
      }
    ]
  }
];

const bestPractices = [
  {
    icon: Shield,
    title: 'Security',
    tips: [
      'Generate unique PINs for each device',
      'Store PINs securely during manufacturing',
      'Never use default or predictable PINs'
    ]
  },
  {
    icon: Home,
    title: 'Production',
    tips: [
      'Register VID/PID with CSA before production',
      'Test with multiple ecosystems',
      'Include printed QR codes on device packaging'
    ]
  }
];

export default function MatterGuidePage() {
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
          Matter/IoT QR Code Guide
        </TextEffect>
        
        <p className="text-lg text-gray-900">
          Learn how to generate Matter-compliant QR codes for seamless IoT device 
          commissioning across all major smart home platforms.
        </p>
      </motion.div>

      {/* Compatibility Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Smartphone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Universal Compatibility</h3>
                <p className="text-sm text-gray-900">
                  Matter QR codes work with Apple HomeKit, Google Home, Amazon Alexa, 
                  Samsung SmartThings, and other Matter-certified platforms. One code, 
                  all ecosystems.
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <section.icon className="w-6 h-6 text-blue-600" />
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

                    {item.type === 'fields' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-4">
                          {item.fields?.map((field: Field, idx: number) => (
                            <div key={idx} className="border-l-4 border-brand-200 pl-4">
                              <h4 className="font-semibold text-gray-900">{field.name}</h4>
                              <p className="text-sm text-gray-900 mt-1">{field.description}</p>
                              {field.example && (
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                                  Example: {field.example}
                                </code>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'optional' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-3">
                          {item.fields?.map((field: Field, idx: number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-brand-400 rounded-full mt-2 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-gray-900">{field.name}:</span>
                                <span className="text-gray-900 ml-2">{field.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'steps' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ol className="space-y-3">
                          {item.steps?.map((step: string, idx: number) => (
                            <li key={idx} className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                              </span>
                              <span className="text-gray-900">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </>
                    )}

                    {item.type === 'validation' && (
                      <>
                        <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                        <p className="text-gray-900">{item.text}</p>
                      </>
                    )}

                    {item.type === 'platforms' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-4">
                          {item.platforms?.map((platform: Platform, idx: number) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                              <ol className="space-y-1 text-sm">
                                {platform.steps.map((step: string, stepIdx: number) => (
                                  <li key={stepIdx} className="text-gray-900">
                                    {stepIdx + 1}. {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'troubleshooting' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-4">
                          {item.issues?.map((issue: Issue, idx: number) => (
                            <div key={idx}>
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{issue.problem}</p>
                                  <p className="text-sm text-gray-900 mt-1">{issue.solution}</p>
                                </div>
                              </div>
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

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <practice.icon className="w-5 h-5 text-brand-600" />
                    <h3 className="font-semibold text-gray-900">{practice.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {practice.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                        <span className="text-brand-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
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
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Matter QR Codes?</h3>
              <p className="text-gray-900 mb-6">
                Generate CSA-compliant QR codes for your IoT devices with full validation and testing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/matter">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Go to Matter Generator
                  </button>
                </Link>
                <Link href="/guides">
                  <button className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Explore Other Guides
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}