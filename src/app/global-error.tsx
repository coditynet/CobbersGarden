"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-garden-background flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
              <h1 className="text-3xl font-playfair font-bold text-garden-primary mb-4">
                500 - Server error
              </h1>
              <p className="text-garden-secondary mb-8">
                Nous sommes désolés, mais un problème est survenu de notre côté. Notre équipe a été automatiquement informée.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Recharger la page
                </Button>
                <Link href="/">
                  <Button className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    page d'accueil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}