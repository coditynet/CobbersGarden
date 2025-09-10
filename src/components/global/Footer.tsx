"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-garden-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
              <div className="overflow-hidden">
              </div>
            <h3 className="text-2xl font-bold mb-6">Cobbers Garden</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/blogs"
                  className="text-white/90 hover:text-garden-accent text-lg underline"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liens rapides</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("team")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                  Équipe
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("testimonials")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                  Références
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-white/90 text-lg">
                <a
                  href="tel:+491234567890"
                  className="hover:text-garden-accent transition-colors">
                  +33660335399
                </a>
              </li>
              <li className="text-white/90 text-lg">
                <a
                  href="mailto:info@cobbersgarden.de"
                  className="hover:text-garden-accent transition-colors">
                  cobbersgarden@gmail.com
                </a>
              </li>
              <li className="text-white/90 text-lg">59249 Fromelles</li>
            </ul>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-white/90 text-lg">
                © {new Date().getFullYear()} Cobbers Garden. Tous droits
                réservés.
              </p>
              <p className="text-white/70 text-lg">
                Created by Elias & Timothée
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/legal-notice"
                className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                Mentions Légales
              </Link>
              <Link
                href="/privacy"
                className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                Confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-white/90 hover:text-garden-accent transition-colors text-lg">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
