import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "priv QR - Professional QR Code Generator",
  description: "Zero dependencies, offline, privacy-first QR code generator for professionals. Generate crypto, Matter IoT, and bulk QR codes instantly.",
  keywords: "QR code, generator, crypto, bitcoin, ethereum, lightning, Matter, IoT, bulk, offline, privacy, free QR generator, professional QR codes",
  authors: [{ name: "priv QR Team" }],
  creator: "priv QR",
  publisher: "priv QR",
  robots: "index, follow",
  applicationName: "priv QR",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL('https://qrtoolkit.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: { url: '/logo.png', sizes: '180x180' },
  },
  openGraph: {
    title: "priv QR - Professional QR Code Generator",
    description: "Generate professional QR codes offline with zero dependencies. Privacy-first QR generation for crypto, IoT, and bulk processing.",
    type: "website",
    locale: "en_US",
    url: "https://qrtoolkit.vercel.app",
    siteName: "priv QR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "priv QR - Professional QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "priv QR - Professional QR Code Generator",
    description: "Privacy-first QR code generator with crypto, IoT, and bulk processing features",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
