/* eslint-disable @next/next/no-img-element */
import { Facebook, Instagram, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Jérémy Bels",
    role: "Arboriste grimpeur",
    image: "/assets/img/team/Jeremy.jpg",
    description: "Paysagiste avec plus de 10 ans d'expérience",
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
    social: {},
  },
  {
    name: "Tristan Damie",
    role: "Apprenti élagueur",
    image: "/assets/img/team/Tristan.jpg",
    description: "Homme de pied",
    social: {},
  },
];

const Team = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Notre Équipe
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group bg-garden-background rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-garden-primary/10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-playfair font-bold text-garden-primary mb-2">
                {member.name}
              </h3>
              <p className="text-garden-accent font-medium mb-3">
                {member.role}
              </p>
              <p className="text-garden-secondary/80 mb-6">
                {member.description}
              </p>

              <div className="flex justify-center gap-4">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/icon">
                    {platform === "facebook" && (
                      <Facebook className="w-5 h-5 text-garden-primary hover:text-garden-accent transition-colors" />
                    )}
                    {platform === "instagram" && (
                      <Instagram className="w-5 h-5 text-garden-primary hover:text-garden-accent transition-colors" />
                    )}
                    {platform === "linkedin" && (
                      <Linkedin className="w-5 h-5 text-garden-primary hover:text-garden-accent transition-colors" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
