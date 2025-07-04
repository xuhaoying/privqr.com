'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bitcoin, 
  Zap, 
  Coins,
  AlertCircle,
  CheckCircle2,
  Copy,
  Shield,
  BookOpen,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/magicui/text-effect';

interface ContentItem {
  type: string;
  title: string;
  text?: string;
  steps?: string[];
  code?: string;
  tips?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: ContentItem[];
}

const sections: Section[] = [
  {
    id: 'bitcoin',
    title: 'Bitcoin (BTC)',
    icon: Bitcoin,
    content: [
      {
        type: 'overview',
        title: 'Overview',
        text: 'Bitcoin QR codes allow instant payment setup by encoding wallet addresses and optional payment amounts. Recipients can scan the code with any Bitcoin wallet app to initiate transfers.'
      },
      {
        type: 'steps',
        title: 'How to Generate',
        steps: [
          'Navigate to the Crypto page from the main menu',
          'Select "Bitcoin (BTC)" from the cryptocurrency dropdown',
          'Enter the recipient\'s Bitcoin address (starts with 1, 3, or bc1)',
          'Optionally enter the amount in BTC (e.g., 0.001)',
          'Add a label/message if desired (appears in wallet apps)',
          'Click "Generate Bitcoin QR" button',
          'Download or share the generated QR code'
        ]
      },
      {
        type: 'example',
        title: 'Example',
        code: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001&label=Donation'
      },
      {
        type: 'tips',
        title: 'Best Practices',
        tips: [
          'Always double-check the address before generating',
          'Test with small amounts first',
          'Include labels for better transaction tracking',
          'Use bech32 addresses (bc1...) for lower fees'
        ]
      }
    ]
  },
  {
    id: 'ethereum',
    title: 'Ethereum (ETH)',
    icon: Coins,
    content: [
      {
        type: 'overview',
        title: 'Overview',
        text: 'Ethereum QR codes support both ETH transfers and ERC20 token transactions. They use the EIP-681 standard for encoding payment requests.'
      },
      {
        type: 'steps',
        title: 'How to Generate',
        steps: [
          'Select "Ethereum (ETH)" from the cryptocurrency dropdown',
          'Enter the recipient\'s Ethereum address (0x...)',
          'Choose transaction type: ETH or ERC20 Token',
          'For ETH: Enter amount in ETH',
          'For ERC20: Enter token contract address and amount',
          'Optionally specify gas limit for complex transactions',
          'Generate and download the QR code'
        ]
      },
      {
        type: 'example',
        title: 'Example',
        code: 'ethereum:0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7?value=1e18'
      },
      {
        type: 'warning',
        title: 'Important Notes',
        text: 'ERC20 transfers require the scanner to support token transactions. Always verify the token contract address to avoid sending to wrong contracts.'
      }
    ]
  },
  {
    id: 'lightning',
    title: 'Lightning Network',
    icon: Zap,
    content: [
      {
        type: 'overview',
        title: 'Overview',
        text: 'Lightning Network QR codes enable instant, low-fee Bitcoin micropayments. They encode payment invoices that expire after a set time.'
      },
      {
        type: 'steps',
        title: 'How to Generate',
        steps: [
          'Select "Lightning Network" from the dropdown',
          'Choose invoice type: Fixed amount or Flexible',
          'Enter the Lightning invoice (starts with lnbc...)',
          'For new invoices, enter amount in satoshis',
          'Set expiry time (default: 1 hour)',
          'Add description for the payment',
          'Generate the QR code immediately as invoices expire'
        ]
      },
      {
        type: 'example',
        title: 'Example',
        code: 'lightning:lnbc100n1p3...'
      },
      {
        type: 'tips',
        title: 'Lightning Tips',
        tips: [
          'Generate QR codes only when ready to receive payment',
          'Shorter expiry times reduce payment failure risk',
          'Include clear descriptions for easier reconciliation',
          'Test with small amounts (a few sats) first'
        ]
      }
    ]
  }
];

const commonIssues = [
  {
    question: 'Why isn\'t my QR code scanning?',
    answer: 'Ensure sufficient contrast between the QR code and background. Make the QR code at least 2x2 inches for reliable scanning.'
  },
  {
    question: 'Can I reuse the same QR code?',
    answer: 'Bitcoin and Ethereum addresses can be reused, but it\'s recommended to generate new addresses for privacy. Lightning invoices cannot be reused.'
  },
  {
    question: 'Is it safe to share QR codes publicly?',
    answer: 'Sharing receive addresses is safe, but be aware that blockchain transactions are public. Never share private keys as QR codes.'
  }
];

export default function CryptoGuidePage() {
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
          Crypto QR Code Guide
        </TextEffect>
        
        <p className="text-lg text-gray-900">
          Complete guide to generating cryptocurrency payment QR codes for Bitcoin, 
          Ethereum, Lightning Network, and other digital assets.
        </p>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-brand-50 border-brand-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-brand-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Security First</h3>
                <p className="text-sm text-gray-900">
                  All QR codes are generated locally in your browser using industry-standard 
                  formats. No private data is sent to servers. Always verify addresses before 
                  sending funds.
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
              <div className="p-2 bg-orange-100 rounded-lg">
                <section.icon className="w-6 h-6 text-orange-600" />
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

                    {item.type === 'example' && (
                      <>
                        <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm break-all">
                          {item.code}
                        </div>
                      </>
                    )}

                    {item.type === 'tips' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.tips?.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-900">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {item.type === 'warning' && (
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-900">{item.text}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Common Issues */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{issue.question}</h3>
                  <p className="text-gray-900">{issue.answer}</p>
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
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate?</h3>
              <p className="text-gray-900 mb-6">
                Start creating secure cryptocurrency QR codes with our privacy-first generator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/crypto">
                  <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Go to Crypto Generator
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