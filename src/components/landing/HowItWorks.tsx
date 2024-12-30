import { CalendarCheck, Sparkles, CreditCard } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "1. Termin wählen",
    description: "Wählen Sie einen passenden Termin für Ihre Rasenpflege aus"
  },
  {
    icon: Sparkles,
    title: "2. Service genießen",
    description: "Unsere Experten kümmern sich professionell um Ihren Rasen"
  },
  {
    icon: CreditCard,
    title: "3. Einfach bezahlen",
    description: "Bequeme Bezahlung nach zufriedenstellendem Service"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-garden-primary text-center mb-16">
          So funktioniert's
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 w-full h-0.5 bg-garden-accent/30 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 w-3 h-3 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-garden-accent" />
                </div>
              )}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-garden-background flex items-center justify-center">
                <step.icon className="h-12 w-12 text-garden-primary" />
              </div>
              <h3 className="text-2xl font-bold text-garden-primary mb-3">{step.title}</h3>
              <p className="text-garden-secondary/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 