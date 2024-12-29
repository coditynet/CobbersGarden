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
              className="group relative overflow-hidden rounded-xl bg-white p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-garden-primary to-garden-accent opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative h-full bg-white rounded-lg p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-garden-primary/10 to-garden-accent/10 rounded-bl-[6rem] -z-10" />
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-garden-primary to-garden-accent rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative bg-white rounded-xl p-4">
                      <service.icon className="h-12 w-12 text-garden-primary group-hover:text-garden-accent transition-colors duration-300" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-bold text-garden-primary text-center mb-4 group-hover:text-garden-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-garden-secondary text-center">
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