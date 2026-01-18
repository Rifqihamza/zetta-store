import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Layouts/Footer";

export const metadata: Metadata = {
  title: {
    default: "Nexora Store | Premium Digital Assets & Templates",
    template: "%s | Nexora Store"
  },
  description: "Premium digital assets and website templates designed to help creators and developers build faster and smarter. Explore our curated collection of high-quality assets.",
  keywords: ["digital assets", "website templates", "UI components", "design resources", "developer tools", "Sanity CMS"],
  authors: [{ name: "CodersProject" }],
  creator: "CodersProject",
  publisher: "CodersProject",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexora-store.vercel.app",
    title: "Nexora Store | Premium Digital Assets & Templates",
    description: "Premium digital assets and website templates for creators and developers",
    siteName: "Nexora Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Store | Premium Digital Assets & Templates",
    description: "Premium digital assets and website templates for creators and developers",
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
