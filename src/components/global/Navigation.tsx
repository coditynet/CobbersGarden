import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-playfair font-bold text-garden-primary">
            Cobbers Garden
          </div>
          <div className="hidden md:flex space-x-8 font-inter">
            <a
              href="#home"
              className="text-garden-primary hover:text-garden-accent transition-colors">
              Startseite
            </a>
            <a
              href="#services"
              className="text-garden-primary hover:text-garden-accent transition-colors">
              Leistungen
            </a>
            <a
              href="#booking"
              className="text-garden-primary hover:text-garden-accent transition-colors">
              Buchung
            </a>
            <a
              href="#contact"
              className="text-garden-primary hover:text-garden-accent transition-colors">
              Kontakt
            </a>
          </div>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
