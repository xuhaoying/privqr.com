import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Printable QR Code Guide | priv QR',
  description: 'Learn how to create 3D printable QR codes for signage, keychains, and tactile applications. Complete guide with print settings and tips.',
};

export default function ThreeDGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}