import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import { OrganizationSchema, WebAppSchema } from "@/components/seo/StructuredData";

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
  metadataBase: new URL('https://privqr.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-icon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/logo-transparent.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/logo-transparent.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: { url: '/logo-transparent.svg', sizes: '180x180', type: 'image/svg+xml' },
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#10d9a3',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "priv QR - Professional QR Code Generator",
    description: "Generate professional QR codes offline with zero dependencies. Privacy-first QR generation for crypto, IoT, and bulk processing.",
    type: "website",
    locale: "en_US",
    url: "https://privqr.com",
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
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MEXWW1VQ76"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MEXWW1VQ76');
            `,
          }}
        />
        <OrganizationSchema />
        <WebAppSchema />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
