import type { Metadata } from "next";
import { Open_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from '@/providers/posthog'
import { Toaster } from "@/components/ui/toaster";
import JsonLd from "@/components/global/JsonLd";
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { CookieBanner } from '@/components/global/CookieBanner';

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Cobbers Garden",
  description: "Professionelle Gartenpflege",
  metadataBase: new URL('https://cobbersgarden.de'),
  openGraph: {
    title: 'Cobbers Garden',
    description: 'Professionelle Gartenpflege',
    url: 'https://cobbersgarden.de',
    siteName: 'Cobbers Garden',
    images: [
      {
        url: 'https://cobbersgarden.de/assets/img/logo_full.png',
        width: 1200,  
        height: 630,
      },
      {
        url: 'https://cobbersgarden.de/assets/img/hero_bg.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <JsonLd />
      </head>
      <body className={`${openSans.variable} ${playfair.variable} ${caveat.variable} font-opensans`}>
        <ErrorBoundary>
          <CSPostHogProvider>
            <main>{children}</main>
            <Toaster />
            <CookieBanner />
          </CSPostHogProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
