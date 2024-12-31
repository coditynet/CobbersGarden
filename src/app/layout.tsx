import type { Metadata } from "next";
import { Open_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from '@/providers/posthog'
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Cobbers Garden",
  description: "Professionelle Gartenpflege",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${openSans.variable} ${playfair.variable} ${caveat.variable} font-opensans`}>
        <CSPostHogProvider>
          <main>{children}</main>
          <Toaster />
        </CSPostHogProvider>
      </body>
    </html>
  );
}
