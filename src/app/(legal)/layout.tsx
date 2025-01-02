import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-garden-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
        {children}
      </div>
    </div>
  );
} 