/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Schmidt",
    location: "Berlin",
    image: "https://i.pravatar.cc/100?img=1",
    text: "Absolut professioneller Service. Mein Rasen sieht jetzt besser aus als je zuvor!",
    rating: 5
  },
  {
    name: "Sandra Weber",
    location: "Hamburg",
    image: "https://i.pravatar.cc/100?img=2",
    text: "Zuverlässig, pünktlich und sehr kompetent. Kann ich nur weiterempfehlen.",
    rating: 5
  },
  {
    name: "Thomas Müller",
    location: "München",
    image: "https://i.pravatar.cc/100?img=3",
    text: "Endlich muss ich mich nicht mehr selbst um den Rasen kümmern. Super Service!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Das sagen unsere Kunden
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent" />
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-garden-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-garden-primary">{testimonial.name}</h3>
                  <p className="text-garden-secondary/80 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
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