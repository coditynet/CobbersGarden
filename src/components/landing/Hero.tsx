import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="pt-24 pb-16 min-h-screen flex items-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl backdrop-blur-sm bg-white/10 p-8 rounded-lg">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-[#F2FCE2] mb-6 animate-grass-wave">
            Ihr Garten verdient das Beste
          </h1>
          <p className="text-xl md:text-2xl text-[#F2FCE2] mb-8 font-inter">
            Professionelle Rasenpflege von Cobbers Garden - Wir machen Ihren Rasen zum Schmuckstück
          </p>
          <Button className="bg-garden-primary hover:bg-garden-accent text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Jetzt Termin buchen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;