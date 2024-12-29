import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-garden-background to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-playfair font-bold text-garden-primary text-center mb-16 relative">
          <span className="relative z-10">Kontakt</span>
          <div className="absolute w-24 h-2 bg-garden-accent bottom-0 left-1/2 transform -translate-x-1/2" />
        </h2>
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {[
            { icon: Phone, title: "Telefon", content: "+49 123 456789" },
            { icon: Mail, title: "E-Mail", content: "info@cobbers-garden.de" },
            { icon: MapPin, title: "Adresse", content: "Gartenstraße 1, 12345 Berlin" }
          ].map((item, index) => (
            <div 
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-garden-background p-1 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-full backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-garden-primary/10 to-garden-accent/10 rounded-bl-[4rem] -z-10 transition-transform duration-300 group-hover:scale-110" />
                <item.icon className="h-12 w-12 text-garden-primary mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-garden-accent" />
                <h3 className="font-playfair text-2xl font-bold mb-4 text-garden-primary">{item.title}</h3>
                <p className="font-inter text-lg text-garden-secondary">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-playfair font-bold text-garden-primary text-center mb-10 relative">
            <span className="relative z-10">Folgen Sie uns</span>
            <div className="absolute w-16 h-1.5 bg-garden-accent bottom-0 left-1/2 transform -translate-x-1/2" />
          </h3>
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
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-garden-primary to-garden-accent text-white transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <social.icon className="h-8 w-8" />
                </div>
                <span className="text-garden-primary font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;