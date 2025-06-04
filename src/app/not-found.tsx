import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-garden-background via-white to-garden-background">
      <div className="text-center px-4">
        <h1 className="text-9xl font-playfair font-bold text-garden-primary mb-4">
          404
        </h1>
        <div className="w-32 h-1 bg-garden-accent mx-auto mb-8" />
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-garden-primary mb-4">
          Baum konnte nicht gefällt werden
        </h2>
        <p className="text-garden-secondary mb-8 max-w-md mx-auto">
          Die gesuchte Seite existiert leider nicht. Vielleicht wurde sie verschoben oder gelöscht.
        </p>
        <Link href="/">
          <Button className="bg-garden-primary hover:bg-garden-accent text-white px-8 py-6 rounded-xl transition-all duration-300 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Startseite
          </Button>
        </Link>
      </div>
    </div>
  );
} 