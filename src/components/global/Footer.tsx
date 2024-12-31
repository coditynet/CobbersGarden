"use client"
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-garden-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="overflow-hidden">
                <Image
                  src="/assets/img/logo.png"
                  alt="Cobbers Garden Logo"
                  width={48}
                  height={48}
                  className="[filter:drop-shadow(0_100px_0_rgb(255,255,255))] -translate-y-[100px]"
                />
              </div>
              <span className="text-2xl font-bold">Cobbers Garden</span>
            </Link>
            <p className="text-lg text-white/90">
              Professionelle Gartenpflege und Rasenmähen in Ihrer Region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg"
                >
                  Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg"
                >
                  Referenzen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="text-white/90 text-lg">
                <a href="tel:+491234567890" className="hover:text-garden-accent transition-colors">
                  +49 123 456 7890
                </a>
              </li>
              <li className="text-white/90 text-lg">
                <a href="mailto:info@cobbersgarden.de" className="hover:text-garden-accent transition-colors">
                  info@cobbersgarden.de
                </a>
              </li>
              <li className="text-white/90 text-lg">
                Musterstraße 123<br />
                12345 Musterstadt
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Öffnungszeiten</h3>
            <ul className="space-y-4">
              <li className="text-white/90 text-lg">
                Mo - Fr: 8:00 - 18:00
              </li>
              <li className="text-white/90 text-lg">
                Sa: 9:00 - 14:00
              </li>
              <li className="text-white/90 text-lg">
                So: Geschlossen
              </li>
            </ul>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-white/90 text-lg">
                © {new Date().getFullYear()} Cobbers Garden. Alle Rechte vorbehalten.
              </p>
              <p className="text-white/70 text-lg">
                Created with ♥ by <a href="https://github.com/yourusername" className="hover:text-garden-accent transition-colors">Your Name</a>
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
