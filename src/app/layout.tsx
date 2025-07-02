import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Toolkit - Professional QR Code Generator",
  description: "Zero dependencies, offline, privacy-first QR code generator for professionals. Generate crypto, Matter IoT, and bulk QR codes instantly.",
  keywords: "QR code, generator, crypto, bitcoin, ethereum, lightning, Matter, IoT, bulk, offline, privacy",
  authors: [{ name: "QR Toolkit Team" }],
  openGraph: {
    title: "QR Toolkit - Professional QR Code Generator",
    description: "Generate professional QR codes offline with zero dependencies",
    type: "website",
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
