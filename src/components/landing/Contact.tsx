import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-garden-background to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-playfair font-bold text-garden-primary text-center mb-16 relative">
          <span className="relative z-10">Kontakt</span>
          <div className="absolute w-24 h-2 bg-garden-accent bottom-0 left-1/2 transform -translate-x-1/2" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          {[
            { icon: Phone, title: "Telefon", content: "+49 123 456789" },
            { icon: Mail, title: "E-Mail", content: "info@cobbers-garden.de" },
            { icon: MapPin, title: "Adresse", content: "Gartenstraße 1, 12345 Berlin" }
          ].map((item) => (
            <div 
              key={item.title}
              className="group relative overflow-hidden rounded-xl bg-white p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-garden-primary to-garden-accent opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative h-full bg-white rounded-lg p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-garden-primary/10 to-garden-accent/10 rounded-bl-[6rem] -z-10" />
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-garden-primary to-garden-accent rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative bg-white rounded-xl p-4">
                      <item.icon className="h-12 w-12 text-garden-primary group-hover:text-garden-accent transition-colors duration-300" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-bold text-garden-primary text-center mb-4 group-hover:text-garden-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-garden-secondary text-center">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-playfair font-bold text-garden-primary text-center mb-10">
            Folgen Sie uns
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
                className="group relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-garden-primary to-garden-accent rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-white rounded-xl p-4">
                    <social.icon className="h-8 w-8 text-garden-primary group-hover:text-garden-accent transition-colors duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;