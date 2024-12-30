import { Shield, Star, Clock, ThumbsUp } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Versichert & Zuverlässig",
    description: "Alle unsere Gärtner sind versichert und sorgfältig ausgewählt"
  },
  {
    icon: Star,
    title: "Qualitätsgarantie",
    description: "Professionelle Ausrüstung und geschultes Personal"
  },
  {
    icon: Clock,
    title: "Flexible Termine",
    description: "Wählen Sie Ihren Wunschtermin - auch kurzfristig möglich"
  },
  {
    icon: ThumbsUp,
    title: "100% Zufriedenheit",
    description: "Über 1.000 zufriedene Kunden in Ihrer Region"
  }
];

const Benefits = () => {
  return (
    <section className="py-16 bg-garden-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-garden-primary" />
              </div>
              <h3 className="text-xl font-bold text-garden-primary mb-2">{benefit.title}</h3>
              <p className="text-garden-secondary/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 