import { MessageCircle, NotepadText, Users, Truck } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Prise de contact",
    description: "Visite des des lieux pour évaluer les besoins",
  },
  {
    icon: NotepadText,
    title: "Devis",
    description: "Un devis détaillé et transparent",
  },
  {
    icon: Users,
    title: "Equipe",
    description: "Des professionnels de qualité dans un esprit familial",
  },
  {
    icon: Truck,
    title: "Intervention",
    description: "Des interventions soignées et sécurisées",
  },
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
              <h3 className="text-xl font-bold text-garden-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-garden-secondary/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
