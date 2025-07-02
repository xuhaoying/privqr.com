import type { Metadata } from 'next';
import { HowToSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Matter/IoT QR Code Generator | Smart Device Pairing | priv QR',
  description: 'Generate Matter and Thread device pairing QR codes with CSA Matter 1.x standard compliance. Secure IoT device onboarding made simple.',
  keywords: 'matter qr code, thread qr code, iot device pairing, smart home setup, matter commissioning, thread device setup, csa matter standard',
  openGraph: {
    title: 'Matter/IoT QR Code Generator | Smart Device Pairing',
    description: 'Generate Matter and Thread device pairing QR codes with CSA standard compliance. Secure IoT device onboarding.',
    type: 'website',
  },
  twitter: {
    title: 'Matter/IoT QR Code Generator | Smart Device Pairing',
    description: 'Generate Matter and Thread device pairing QR codes with CSA standard compliance. Secure IoT device onboarding.',
  },
  alternates: {
    canonical: '/matter',
  },
};

const matterHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate Matter/IoT Device Pairing QR Codes",
  "description": "Step-by-step guide to generating Matter and Thread device commissioning QR codes",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Choose Device Protocol",
      "text": "Select between Matter over WiFi, Matter over Thread, or custom IoT protocols for your smart device."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Device Information",
      "text": "Input device discriminator, setup PIN code, vendor ID, and product ID according to CSA Matter specifications."
    },
    {
      "@type": "HowToStep",
      "name": "Configure Network Settings",
      "text": "Add WiFi credentials or Thread network parameters if required for device commissioning."
    },
    {
      "@type": "HowToStep",
      "name": "Generate Pairing Code",
      "text": "Create the Matter-compliant TLV encoded QR code for secure device onboarding."
    },
    {
      "@type": "HowToStep",
      "name": "Commission Device",
      "text": "Use the generated QR code with Matter-compatible apps to add your device to the smart home network."
    }
  ],
  "totalTime": "PT3M",
  "supply": [
    "Matter-compatible device",
    "Device setup PIN and discriminator",
    "WiFi network credentials (if needed)"
  ],
  "tool": [
    "priv QR Matter Generator",
    "Matter-compatible smartphone app"
  ]
};

export default function MatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema data={matterHowToSchema} />
      {children}
    </>
  );
}