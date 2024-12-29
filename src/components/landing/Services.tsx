import { Scissors, Sun, Clock, Calendar } from "lucide-react";

const services = [
  {
    title: "Rasenmähen",
    description: "Präzises Mähen für einen perfekt gepflegten Rasen",
    icon: Scissors,
  },
  {
    title: "Rasenpflege",
    description: "Umfassende Pflege für gesundes Wachstum",
    icon: Sun,
  },
  {
    title: "Flexible Termine",
    description: "Terminplanung nach Ihren Wünschen",
    icon: Clock,
  },
  {
    title: "Regelmäßiger Service",
    description: "Wöchentliche oder monatliche Pflege",
    icon: Calendar,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-garden-background">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-playfair font-bold text-garden-primary text-center mb-16 relative">
          <span className="relative z-10">Unsere Leistungen</span>
          <div className="absolute w-24 h-2 bg-garden-accent bottom-0 left-1/2 transform -translate-x-1/2" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-garden-background p-1 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-full backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-garden-primary/10 to-garden-accent/10 rounded-bl-[4rem] -z-10 transition-transform duration-300 group-hover:scale-110" />
                <service.icon className="h-14 w-14 text-garden-primary mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-garden-accent" />
                <h3 className="text-2xl font-playfair font-bold text-garden-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-garden-secondary font-inter leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;