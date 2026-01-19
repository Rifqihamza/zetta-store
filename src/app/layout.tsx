import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Layouts/Footer";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.slogan}`,
    template: `%s | ${brand.name}`
  },
  description: brand.description,
  keywords: ["digital assets", "website templates", "UI components", "design resources", "developer tools", "Sanity CMS"],
  authors: [{ name: "CodersProject" }],
  creator: "CodersProject",
  publisher: "CodersProject",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zetta-store.vercel.app",
    title: `${brand.name} — ${brand.slogan}`,
    description: brand.description,
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.slogan}`,
    description: brand.description,
    creator: "@codersproject",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
