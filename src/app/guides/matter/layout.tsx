import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Matter/IoT QR Code Guide | priv QR',
  description: 'Learn how to generate Matter-compliant QR codes for seamless IoT device commissioning across all major smart home platforms.',
};

export default function MatterGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}