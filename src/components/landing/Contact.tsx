import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-garden-background via-white/50 to-white" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-6xl font-playfair font-bold text-garden-primary text-center mb-20">
          <span className="relative">
            Kontakt
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-garden-accent" />
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
          {[
            { icon: Phone, title: "Telefon", content: "+49 123 456789" },
            { icon: Mail, title: "E-Mail", content: "info@cobbers-garden.de" },
            { icon: MapPin, title: "Adresse", content: "Gartenstraße 1, 12345 Berlin" }
          ].map((item) => (
            <div 
              key={item.title}
              className="group bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-garden-primary/10 to-garden-accent/10 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                <item.icon className="h-8 w-8 text-garden-primary group-hover:text-garden-accent transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-garden-primary text-center mb-4 group-hover:text-garden-accent transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-garden-secondary/80 text-center">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          {[
            { icon: Facebook, link: "https://facebook.com", label: "Facebook" },
            { icon: Instagram, link: "https://instagram.com", label: "Instagram" },
            { icon: Linkedin, link: "https://linkedin.com", label: "LinkedIn" }
          ].map((social) => (
            <a
              key={social.label}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
                <social.icon className="h-6 w-6 text-garden-primary group-hover:text-garden-accent transition-colors duration-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;