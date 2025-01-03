"use client";
import { useState, useEffect, useRef } from "react";
//import { Button } from "@/components/ui/button";
import Image from "next/image";
import posthog from "posthog-js";

const SECTIONS = [
  { id: "home", label: "Accueil" },
  { id: "services", label: "Nos Réalisations" },
  { id: "booking", label: "Devis" },
  { id: "contact", label: "Contact" },
] as const;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle body scroll locking
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside of menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Initial scroll check
  useEffect(() => {
    const checkInitialScroll = () => {
      setIsScrolled(window.scrollY > 2);

      // Calculate initial scroll progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);

      // Find initial active section
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

    checkInitialScroll();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(progress);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    posthog.capture("navigation_clicked", { section: sectionId });
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const sectionTop = section.offsetTop - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsMobileMenuOpen(false);
      }, 500);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white shadow-md py-4"
          : "bg-transparent py-6"
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
              src="/assets/img/cobbers_logo_full.png"
              alt="Cobbers Garden Logo"
              width={isScrolled || isMobileMenuOpen ? 220 : 280}
              height={isScrolled || isMobileMenuOpen ? 48 : 72}
              className={`${
                isScrolled || isMobileMenuOpen
                  ? "brightness-100"
                  : "brightness-0 invert"
              }`}
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium font-opensans transition-all duration-300 relative py-1 
                  ${isScrolled || isMobileMenuOpen ? "text-sm" : "text-base"} 
                  ${
                    isScrolled || isMobileMenuOpen
                      ? "text-garden-primary hover:text-garden-accent"
                      : "text-white hover:text-garden-accent"
                  } 
                  ${
                    activeSection === item.id
                      ? `after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                         after:bg-garden-accent after:transition-transform after:duration-300 
                         after:transform-gpu after:scale-x-100 
                         ${isScrolled || isMobileMenuOpen ? "text-garden-accent" : "text-garden-accent brightness-125"}`
                      : "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-garden-accent after:transition-transform after:duration-300 after:transform-gpu after:scale-x-0 hover:after:scale-x-100"
                  }`}>
                {item.label}
              </button>
            ))}
          </div>

          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            className="md:hidden p-2 relative w-10 h-10 flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300 
                ${isMobileMenuOpen ? "rotate-45 top-3" : "top-1"}
                ${!isScrolled && !isMobileMenuOpen ? "bg-white" : "bg-garden-primary"}`}
              />
              <span
                className={`absolute left-0 block w-full h-0.5 top-3 transition-all duration-200
                ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}
                ${!isScrolled && !isMobileMenuOpen ? "bg-white" : "bg-garden-primary"}`}
              />
              <span
                className={`absolute left-0 block w-full h-0.5 transform transition-all duration-300
                ${isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"}
                ${!isScrolled && !isMobileMenuOpen ? "bg-white" : "bg-garden-primary"}`}
              />
            </div>
          </button>
        </div>

        <div
          ref={menuRef}
          className={`md:hidden absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
          style={{
            top: "100%",
            transformOrigin: "top",
          }}>
          <div className="container mx-auto px-4 py-4">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-garden-accent bg-garden-background scale-105"
                    : "text-garden-primary hover:text-garden-accent hover:bg-garden-background hover:scale-105"
                }`}>
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
