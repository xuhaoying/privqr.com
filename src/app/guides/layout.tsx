import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Guides | priv QR',
  description: 'Comprehensive guides for using priv QR\'s features including crypto QR codes, Matter/IoT pairing, bulk generation, and 3D printing.',
  openGraph: {
    title: 'User Guides | priv QR',
    description: 'Learn how to use all features of priv QR with our detailed guides',
    type: 'website',
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}