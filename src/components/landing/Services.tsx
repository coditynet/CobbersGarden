import { Scissors, Trees, Shovel, Sprout, PenTool, Droplets, Warehouse, Flower2 } from "lucide-react";
import posthog from "posthog-js";

const services = [
  {
    title: "Rasenpflege",
    description: "Professionelle Pflege für einen gesunden und schönen Rasen",
    icon: Scissors,
    features: ["Rasenmähen", "Vertikutieren", "Düngen & Pflegen", "Unkrautbekämpfung"]
  },
  {
    title: "Pflanzenpflege",
    description: "Umfassende Pflege Ihrer Pflanzen und Beete",
    icon: Sprout,
    features: ["Heckenschnitt", "Staudenpflege", "Beetpflege", "Rosenpflege"]
  },
  {
    title: "Grundstückspflege",
    description: "Professionelle Pflege des gesamten Grundstücks",
    icon: PenTool,
    features: ["Laubentfernung", "Unkrautbeseitigung", "Reinigung", "Winterdienst"]
  },
  {
    title: "Gartenprojekte",
    description: "Umsetzung spezieller Gartenprojekte nach Ihren Wünschen",
    icon: Warehouse,
    features: ["Teichbau", "Zaunbau", "Terrassenbau", "Weggestaltung"]
  },
];

const handleServiceClick = (service: string) => {
  posthog.capture('service_card_clicked', { service });
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Services = () => {
  return (
    <section id="services" className="py-24 relative bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Unsere Leistungen
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.title}
              className="group bg-garden-background rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-garden-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-7 w-7 text-garden-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-garden-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-garden-secondary/80 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-garden-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-garden-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;