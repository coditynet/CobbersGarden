/* eslint-disable @next/next/no-img-element */

import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

const Hero = () => {
  const scrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    posthog.capture("hero_cta_clicked");
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="pt-24 pb-16 min-h-screen flex items-center relative bg-cover bg-center bg-scroll bg-fixed"
      style={{
        backgroundImage:
          "url('https://utfs.io/f/kMIk3iLGS9Lg8es1hFw3jRwMFNolU8ZpaSyhT2uYtIVHifc9')",
      }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl backdrop-blur-sm bg-white/10 p-8 rounded-lg mr-4 sm:mr-0">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#F2FCE2] mb-6 ">
            Jardinier elagueur au coeur des Weppes 
          </h1>
          <h2 className="text-xl md:text-2xl text-[#F2FCE2] mb-8 font-inter">
            Services professionnels d'élagage et d'entretien d'arbres à Lille.<br />
          </h2>
          <Button
            onClick={scrollToBooking}
            className="bg-garden-primary hover:bg-garden-accent text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Nous Contacter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-white/90 mr-4 sm:mr-0">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-4"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span>5/5 Etoiles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
