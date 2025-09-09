import type { Metadata } from "next";
import { Open_Sans, Playfair_Display, Caveat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { CSPostHogProvider } from "@/providers/posthog";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/global/ErrorBoundary";
import { CookieBanner } from "@/components/global/CookieBanner";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: {
    template: "%s | Cobbers Garden",
    default: "Cobbers Garden",
  },
  description:
    "Elagage professionnel a Fromelles, Weppes. Forte experience.",
  applicationName: "Cobbers Garden",
  authors: [{ name: "Cobbers Garden", url: "https://cobbersgarden.fr/" }],
  generator: "Next.js",
  keywords: [
"Cobbers Garden",
"Cobber garden",
"Elagage",
"Elagueur",
"Élagueur",
"Arboriste",
"Weppes",
"Fromelles",
"Abattage",
"Sauvetage chat arbre",
"Sauvetage drone arbre",
"Coupe arbres",
"Taille d'arbres",
"Arboriste grimpeur",
"Élagage Lille",
"Élagueur Lille",
"Elagueur Nord",
"Jeremy Bels"
],
  referrer: "origin-when-cross-origin",
  creator: "Codity",
  publisher: "Cobbers Garden",
  metadataBase: new URL("https://cobbersgarden.fr/"),
  openGraph: {
    title: "Cobbers Garden",
    description:
      "Arboristes grimpeurs qualifiés et les spécialistes pour l'entretien de vos arbres",
    url: "https://cobbersgarden.fr/",
    siteName: "Cobbers Garden",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/assets/images/hero_bg3.jpg",
        width: 983,
        height: 700,
        alt: "Cobbers Garden",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${openSans.variable} ${playfair.variable} ${caveat.variable} font-opensans`}>
        <ErrorBoundary>
          <ClerkProvider>
            <CSPostHogProvider>
              <main>{children}</main>
              <Toaster />
              <CookieBanner />
            </CSPostHogProvider>
          </ClerkProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
