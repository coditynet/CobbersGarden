import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-24 pb-16 min-h-screen flex items-center bg-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-garden-primary mb-6 animate-grass-wave">
            Ihr Garten verdient das Beste
          </h1>
          <p className="text-xl md:text-2xl text-garden-secondary mb-8 font-inter">
            Professionelle Rasenpflege von Cobbers Garden - Wir machen Ihren
            Rasen zum Schmuckstück
          </p>
          <Button className="bg-garden-primary hover:bg-garden-accent text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105">
            Jetzt Termin buchen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
