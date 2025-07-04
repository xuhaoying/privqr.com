import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk QR Code Guide | priv QR',
  description: 'Learn how to efficiently generate thousands of QR codes with our bulk processing feature. Perfect for inventory, events, and marketing campaigns.',
};

export default function BulkGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}