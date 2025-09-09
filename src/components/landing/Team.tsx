"use client";

import { Facebook, Instagram, Linkedin, MapPin, Award } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jérémy Bels",
    role: "Arboriste grimpeur",
    image: "/assets/img/team/Jeremy.jpg",
    description: "Paysagiste avec plus de 10 ans d'expérience",
    experience: "10+ ans",
    specialty: "Direction & Élagage",
    social: {
      instagram:
        "https://www.instagram.com/cob_garden/?igsh=ejhwbmU3MXIzZTRt&utm_source=qr#",
    },
  },
  {
    name: "Jonathan Pruvost",
    role: "Arboriste grimpeur",
    image: "/assets/img/team/Jonathan.jpg",
    description: "Expert cordiste",
    experience: "8+ ans",
    specialty: "Travaux en hauteur",
    social: {},
  },
  {
    name: "Tristan Damie",
    role: "Apprenti élagueur",
    image: "/assets/img/team/Tristan.jpg",
    description: "Homme de pied",
    experience: "2+ ans",
    specialty: "Assistance terrain",
    social: {},
  },
];

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
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  },
};

const Team = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-garden-background/30 to-white">
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
              Notre Équipe
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block rounded-full" />
            </span>
          </h2>
          <p className="text-garden-secondary/80 text-lg max-w-2xl mx-auto mt-6">
            Une équipe de professionnels passionnés, dédiée à transformer vos espaces verts avec expertise et créativité.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-garden-background/50 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-garden-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-garden-primary/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-500" />
              
              {/* Award icon decoration */}
              <div className="absolute top-6 right-6 text-garden-accent/20 group-hover:text-garden-accent/40 transition-colors duration-300">
                <Award className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Image */}
                <motion.div 
                  variants={imageVariants}
                  className="relative w-40 h-40 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-garden-accent/20 to-garden-primary/20 group-hover:from-garden-accent/30 group-hover:to-garden-primary/30 transition-all duration-300 blur-sm" />
                  <div className="relative w-full h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover ring-4 ring-white group-hover:ring-garden-accent/30 transition-all duration-300 shadow-lg"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Experience badge */}
                  <div className="absolute -bottom-2 -right-2 bg-garden-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg group-hover:bg-garden-accent transition-colors duration-300">
                    {member.experience}
                  </div>
                </motion.div>

                {/* Member Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-playfair font-bold text-garden-primary group-hover:text-garden-primary/90 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-garden-accent font-semibold text-lg">
                      {member.role}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-garden-secondary/70 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{member.specialty}</span>
                    </div>
                  </div>
                  
                  <p className="text-garden-secondary/80 leading-relaxed px-2">
                    {member.description}
                  </p>
                </div>

                {/* Social Links */}
                {Object.keys(member.social).length > 0 && (
                  <div className="mt-6 pt-6 border-t border-garden-background/50">
                    <div className="flex justify-center gap-4">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="group/icon w-10 h-10 bg-garden-background rounded-full flex items-center justify-center hover:bg-garden-accent transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          {platform === "facebook" && (
                            <Facebook className="w-5 h-5 text-garden-primary group-hover/icon:text-white transition-colors" />
                          )}
                          {platform === "instagram" && (
                            <Instagram className="w-5 h-5 text-garden-primary group-hover/icon:text-white transition-colors" />
                          )}
                          {platform === "linkedin" && (
                            <Linkedin className="w-5 h-5 text-garden-primary group-hover/icon:text-white transition-colors" />
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-garden-accent to-garden-primary/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Team;