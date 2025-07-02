import type { Metadata } from 'next';
import { HowToSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: '3D Printable QR Code Generator | STL-Ready QR Codes | priv QR',
  description: 'Generate 3D printable QR codes optimized for physical manufacturing. Create STL files with proper thickness and spacing for reliable scanning.',
  keywords: '3d printable qr code, stl qr code, 3d printed qr codes, physical qr codes, manufacturing qr codes, printable qr codes',
  openGraph: {
    title: '3D Printable QR Code Generator | STL-Ready QR Codes',
    description: 'Generate 3D printable QR codes optimized for physical manufacturing and reliable scanning.',
    type: 'website',
  },
  twitter: {
    title: '3D Printable QR Code Generator | STL-Ready QR Codes',
    description: 'Generate 3D printable QR codes optimized for physical manufacturing and reliable scanning.',
  },
  alternates: {
    canonical: '/3d',
  },
};

const threeDHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate 3D Printable QR Codes",
  "description": "Step-by-step guide to creating 3D printable QR codes optimized for physical manufacturing",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter QR Content",
      "text": "Input the text, URL, or data you want to encode in your 3D printable QR code."
    },
    {
      "@type": "HowToStep",
      "name": "Configure 3D Settings",
      "text": "Set the physical dimensions, thickness, and spacing optimized for your 3D printer's capabilities."
    },
    {
      "@type": "HowToStep",
      "name": "Choose Print Parameters",
      "text": "Select layer height and minimum feature size based on your 3D printer's resolution and material."
    },
    {
      "@type": "HowToStep",
      "name": "Generate 3D Model",
      "text": "Create the 3D QR code with proper geometry for reliable scanning after printing."
    },
    {
      "@type": "HowToStep",
      "name": "Download STL File",
      "text": "Download the STL file ready for slicing and 3D printing on your printer."
    },
    {
      "@type": "HowToStep",
      "name": "Print and Test",
      "text": "3D print your QR code and test scanning with various QR code reader apps to ensure readability."
    }
  ],
  "totalTime": "PT10M",
  "supply": [
    "3D printer",
    "Filament or printing material",
    "QR code scanner app"
  ],
  "tool": [
    "priv QR 3D Generator",
    "3D printer slicer software",
    "3D printer"
  ]
};

export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema data={threeDHowToSchema} />
      {children}
    </>
  );
}