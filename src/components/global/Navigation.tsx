"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import posthog from "posthog-js";

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Leistungen' },
  { id: 'booking', label: 'Termin buchen' },
  { id: 'contact', label: 'Kontakt' },
] as const;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);

      // Find current section
      const currentPosition = window.scrollY + 100;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop && 
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    posthog.capture('navigation_clicked', { section: sectionId });
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const sectionTop = section.offsetTop - offset;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
    }`}>
      {isScrolled && (
        <div className="h-1 absolute bottom-0 left-0 w-full bg-gray-200/20">
          <div 
            className="h-full bg-garden-accent transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="transition-all duration-300 overflow-hidden">
            <Image
              src="/assets/img/logo_full.png"
              alt="Cobbers Garden Logo"
              width={isScrolled ? 220 : 280}
              height={isScrolled ? 48 : 72}
              className={` ${
                isScrolled 
                  ? 'brightness-100' 
                  : '[filter:drop-shadow(0_100px_0_rgb(255,255,255))] -translate-y-[100px]'
              }`}
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-base font-medium font-opensans transition-all relative py-1 ${
                  isScrolled 
                    ? 'text-garden-primary hover:text-garden-accent' 
                    : 'text-white hover:text-garden-accent'
                } ${
                  activeSection === item.id 
                    ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-garden-accent after:transition-transform after:duration-300 after:transform-gpu after:scale-x-100' 
                    : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-garden-accent after:transition-transform after:duration-300 after:transform-gpu after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;