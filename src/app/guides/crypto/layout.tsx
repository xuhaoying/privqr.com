import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto QR Code Guide | priv QR',
  description: 'Learn how to generate secure cryptocurrency payment QR codes for Bitcoin, Ethereum, Lightning Network, and more.',
};

export default function CryptoGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}