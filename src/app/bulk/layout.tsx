import type { Metadata } from 'next';
import { HowToSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Bulk QR Code Generator | CSV Batch Processing | priv QR',
  description: 'Generate hundreds of QR codes from CSV files with validation reports and ZIP downloads. Perfect for events, inventory, and business applications.',
  keywords: 'bulk qr code generator, csv qr code batch, mass qr generation, batch qr processing, csv to qr code, business qr codes, event qr codes',
  openGraph: {
    title: 'Bulk QR Code Generator | CSV Batch Processing',
    description: 'Generate hundreds of QR codes from CSV files with validation reports. Perfect for business and events.',
    type: 'website',
  },
  twitter: {
    title: 'Bulk QR Code Generator | CSV Batch Processing',
    description: 'Generate hundreds of QR codes from CSV files with validation reports. Perfect for business and events.',
  },
  alternates: {
    canonical: '/bulk',
  },
};

const bulkHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate QR Codes in Bulk from CSV Files",
  "description": "Step-by-step guide to batch processing QR codes from CSV files with validation",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Prepare CSV File",
      "text": "Create a CSV file with headers like 'content', 'filename', 'type'. Each row represents one QR code to generate."
    },
    {
      "@type": "HowToStep",
      "name": "Upload CSV File",
      "text": "Select and upload your CSV file. The system will validate the format and show a preview of your data."
    },
    {
      "@type": "HowToStep",
      "name": "Configure Settings",
      "text": "Choose QR code size, error correction level, and output format (PNG/SVG) for your batch generation."
    },
    {
      "@type": "HowToStep",
      "name": "Process Batch",
      "text": "Start the batch processing. All QR codes are generated locally in your browser using Web Workers for performance."
    },
    {
      "@type": "HowToStep",
      "name": "Download Results",
      "text": "Download the generated QR codes as a ZIP file along with a validation report showing any errors or warnings."
    }
  ],
  "totalTime": "PT5M",
  "supply": [
    "CSV file with QR code data",
    "Content for QR codes (URLs, text, etc.)"
  ],
  "tool": [
    "priv QR Bulk Generator",
    "CSV editor (Excel, Google Sheets, etc.)"
  ]
};

export default function BulkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema data={bulkHowToSchema} />
      {children}
    </>
  );
}