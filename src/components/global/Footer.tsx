"use client"
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-garden-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/img/logo.png"
                alt="Cobbers Garden Logo"
                width={40}
                height={40}
                className="w-10 h-10 brightness-200"
              />
              <span className="text-xl font-bold">Cobbers Garden</span>
            </Link>
            <p className="text-sm text-white/80">
              Professionelle Gartenpflege und Rasenmähen in Ihrer Region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-garden-accent transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-garden-accent transition-colors">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-garden-accent transition-colors">
                  Referenzen
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-garden-accent transition-colors">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+49123456789" className="hover:text-garden-accent transition-colors">
                  +49 123 456789
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@cobbers-garden.de" className="hover:text-garden-accent transition-colors">
                  info@cobbers-garden.de
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-garden-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-garden-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/60">
            <div className="space-x-4">
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/agb" className="hover:text-white transition-colors">
                AGB
              </Link>
            </div>
            <div className="text-right md:text-right">
              <p>© {new Date().getFullYear()} Cobbers Garden. Alle Rechte vorbehalten.</p>
              <p className="mt-2 text-xs">
                Entwickelt von{" "}
                <a href="https://github.com/maxcobbers" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-garden-accent transition-colors">
                  Max Cobbers
                </a>
                {" "}und{" "}
                <a href="https://github.com/juliuszlioba" target="_blank" rel="noopener noreferrer"
                  className="hover:text-garden-accent transition-colors">
                  Julius Zlioba
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
