import type { Metadata } from 'next';
import { HowToSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Crypto QR Code Generator | Bitcoin, Ethereum, Lightning | priv QR',
  description: 'Generate secure cryptocurrency QR codes for Bitcoin (BIP-21), Ethereum (EIP-681), and Lightning Network (BOLT-11) payments. Privacy-first, works offline, completely free.',
  keywords: 'bitcoin qr code, ethereum qr code, lightning invoice qr, crypto payment qr, BIP-21 qr generator, EIP-681 qr code, BOLT-11 qr generator, cryptocurrency qr codes',
  openGraph: {
    title: 'Crypto QR Code Generator | Bitcoin, Ethereum, Lightning',
    description: 'Generate secure cryptocurrency QR codes with industry-standard compliance. Privacy-first, offline-capable, completely free.',
    type: 'website',
  },
  twitter: {
    title: 'Crypto QR Code Generator | Bitcoin, Ethereum, Lightning',
    description: 'Generate secure cryptocurrency QR codes with industry-standard compliance. Privacy-first, offline-capable, completely free.',
  },
  alternates: {
    canonical: '/crypto',
  },
};

const cryptoHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate Cryptocurrency QR Codes",
  "description": "Step-by-step guide to generating secure Bitcoin, Ethereum, and Lightning Network QR codes",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Cryptocurrency Type",
      "text": "Choose between Bitcoin (BIP-21), Ethereum (EIP-681), or Lightning Network (BOLT-11) payment formats."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Payment Details",
      "text": "Input the recipient address, amount (optional), and any additional parameters like memo or gas limit."
    },
    {
      "@type": "HowToStep",
      "name": "Validate Format",
      "text": "The system automatically validates your input against the respective cryptocurrency standards."
    },
    {
      "@type": "HowToStep",
      "name": "Generate QR Code",
      "text": "Click generate to create your cryptocurrency payment QR code. All processing happens locally in your browser."
    },
    {
      "@type": "HowToStep",
      "name": "Download and Use",
      "text": "Download the QR code in PNG or SVG format and share it for payments."
    }
  ],
  "totalTime": "PT2M",
  "supply": [
    "Valid cryptocurrency address",
    "Payment amount (optional)",
    "Modern web browser"
  ],
  "tool": [
    "priv QR Crypto Generator",
    "Web browser with JavaScript enabled"
  ]
};

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema data={cryptoHowToSchema} />
      {children}
    </>
  );
}