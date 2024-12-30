import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Rufen Sie uns an",
    content: "+49 123 456789",
    description: "Mo-Fr: 8:00-18:00 Uhr",
    action: "tel:+49123456789",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Mail,
    title: "Schreiben Sie uns",
    content: "info@cobbers-garden.de",
    description: "Wir antworten innerhalb von 24h",
    action: "mailto:info@cobbers-garden.de",
    color: "from-green-500 to-green-600"
  },
  {
    icon: MapPin,
    title: "Besuchen Sie uns",
    content: "Gartenstraße 1",
    description: "12345 Berlin",
    action: "https://maps.google.com",
    color: "from-red-500 to-red-600"
  }
];

const socialMedia = [
  { icon: Facebook, label: "Facebook", link: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", link: "https://instagram.com" },
  { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com" }
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
            <span className="relative">
              Kontaktieren Sie uns
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent" />
            </span>
          </h2>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.action}
                className="group block"
                {...(info.action && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <div className="bg-white rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-garden-primary mb-3">
                    {info.title}
                  </h3>
                  <p className="text-xl text-garden-primary font-medium mb-2">
                    {info.content}
                  </p>
                  <p className="text-garden-secondary">
                    {info.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Media */}
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-playfair font-bold text-garden-primary mb-8">
              Folgen Sie uns auf Social Media
            </h3>
            <div className="flex justify-center gap-8">
              {socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={social.label}
                >
                  <div className="w-14 h-14 rounded-full bg-garden-background flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <social.icon className="w-7 h-7 text-garden-primary group-hover:text-garden-accent transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;