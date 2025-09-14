"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "./ListTestimonial";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 1, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-garden-background/30" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary mb-4">
            <span className="relative">
              Voici ce que disent nos clients
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block rounded-full" />
            </span>
          </h2>
          <p className="text-garden-secondary/80 text-lg max-w-2xl mx-auto mt-6">
            La satisfaction de nos clients est notre priorité. Découvrez leurs expériences avec Cobbers Garden.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-garden-background/50 relative overflow-hidden group"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-garden-accent/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-garden-accent/20 group-hover:text-garden-accent/40 transition-colors duration-300">
                <Quote className="h-8 w-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      draggable={false}
                      className="rounded-full object-cover select-none ring-4 ring-garden-background/50 group-hover:ring-garden-accent/30 transition-all duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-garden-primary text-lg mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-garden-secondary/60 text-sm mb-2">
                      {testimonial.location}
                    </p>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: 0.5 + (i * 0.1),
                            duration: 0.3,
                            ease: "backOut"
                          }}
                        >
                          <Star className="h-5 w-5 fill-current drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-garden-secondary leading-relaxed relative">
                  <span className="text-garden-accent/40 text-4xl font-serif absolute -top-2 -left-1">"</span>
                  <p className="pl-6 italic">
                    {testimonial.text}
                  </p>
                  <span className="text-garden-accent/40 text-4xl font-serif absolute -bottom-6 right-2">"</span>
                </blockquote>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-garden-accent to-garden-primary/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;