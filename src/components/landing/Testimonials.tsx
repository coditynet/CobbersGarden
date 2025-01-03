/* eslint-disable react/no-unescaped-entities */

import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Charline Knobloch",
    image: "/assets/img/reviews/review1.png",
    text: "Jeremy et son équipe ont réalisés notre terrasse, notre palissade et notre jardin. Il a réussi à être à l'écoute de nos envies et nous a apporté de bons conseils. Nous sommes ravis de notre extérieur et du travail effectué. Merci pour ta sympathie et ta disponibilité. Je recommande les yeux fermés !!",
    rating: 5,
  },
  {
    name: "Frederic Ferreira",
    image: "/assets/img/reviews/review2.png",
    text: "Je recommande vivement COBBERS GARDEN et Jeremy Bels. Cobbers Garden est une société sérieuse, ponctuelle, professionnelle, appliquée dont les réalisations sont impeccables.",
    rating: 5,
  },
  {
    name: "Thibault Cauche",
    image: "/assets/img/reviews/review3.png",
    text: "Monsieur BELS Jérémy est une personne disponible, réactive, sérieuse, ... nous recommandons vivement cette entreprise !!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Voici ce que disent nos clients
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-garden-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    draggable={false}
                    className="rounded-full object-cover select-none"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-garden-primary">
                    {testimonial.name}
                  </h3>
                  <div className="flex text-yellow-400 mt-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-garden-secondary leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
