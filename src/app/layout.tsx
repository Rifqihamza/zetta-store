import type { Metadata } from "next";
import Script from "next/script"; // Tambahkan ini
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import Footer from "@/components/Layouts/Footer";
import { brand } from "@/config/brand";
import { ToastProvider } from "@/components/ui/ToastProvider";
import Image from "next/image";

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

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Gunakan Next Script untuk performa & keamanan */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '424018265674806');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} antialiased`}>
        <noscript>
          <Image
            alt="Facebook"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=424018265674806&ev=PageView&noscript=1"
          />
        </noscript>

        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}