"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MousePointerClick } from "lucide-react";

// Define the service type
type Service = {
  title: string;
  description: string;
  mediaFiles: string[];
  fallbackImage: string;
  features: string[];
  link?: string;
};

const services: Service[] = [
  {
    title: "Conseil & diagnostic",
    description:
      "Grâce à nos connaissances approfondies des arbres, nous assurons la santé et la longévité de votre patrimoine arboricole. Ainsi qu'un Suivi sanitaire.",
    mediaFiles: ["/assets/videos/working/Conseil.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
  },
  {
    title: "Taille de soin",
    description:
      "Une taille raisonnée visant à éliminer les branches mortes ou malades pour favoriser la santé et la croissance de l'arbre. ",
    mediaFiles: ["/assets/videos/working/Taille_soins.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
  },
  {
    title: "Abattage ou Démontage",
    description:
      "Pour des raisons de sécurité, l'abattage peut être nécessaire si l'arbre présente des risques de chute, de maladies ou de dégradation.",
    mediaFiles: ["/assets/videos/working/Abattage.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
    link: "/rognage"
  },
  {
    title: "Rognage",
    description:
      "Le rognage consiste à enlever la souche d'un arbre pour éviter la repousse et libérer de l'espace.",
    mediaFiles: ["/assets/videos/working/Rognage.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
  },
  {
    title: "Plantation",
    description: "Couper c'est bien, planter c'est mieux!",
    mediaFiles: ["/assets/videos/working/Plantation.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
  },
  {
    title: "Entretien du jardin",
    description:
      "Taille de haies, Débroussaillage, rabattage et contrat annuel de votre jardin.",
    mediaFiles: ["/assets/videos/working/Entretien.mp4"],
    fallbackImage: "/assets/img/FallBackImage.png",
    features: [],
  },
  {
    title: "Urgence 7/7",
    description: "Nous sauvons vos animaux ou drones coincés dans un arbre.",
    mediaFiles: ["/assets/videos/working/Urgence.mp4"],
    fallbackImage: "/assets/img/FallBackImage.png",
    features: [],
  },
  {
    title: "Ne payez que 50%",
    description:
      "Pour tous vos travaux de petit jardinage profitez de 50% via notre coopérative.",
    mediaFiles: [],
    fallbackImage: "/assets/img/half_price.jpg",
    features: [],
  },
  {
    title: "Clôtures & Palissades",
    description:
      "Installation de clôtures et palissades pour sécuriser et embellir votre jardin.",
    mediaFiles: ["/assets/videos/working/Cloture.mp4"],
    fallbackImage: "/assets/img/FallbackImage.png",
    features: [],
    link: "/clotures-palissades"
  },
];

const ServiceCard = ({ service }: { service: Service }) => {
  const [, setIsMediaLoaded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const highQualityVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    if (service.mediaFiles && service.mediaFiles.length > 1) {
      setCurrentMediaIndex((prev) => (prev + 1) % service.mediaFiles.length);
      setIsHighQualityLoaded(false); // Reset for next video
    }
  };

  // Preload next videos
  useEffect(() => {
    if (service.mediaFiles && service.mediaFiles.length > 1) {
      // Start from next index
      const nextIndex = (currentMediaIndex + 1) % service.mediaFiles.length;
      const preloadVideos = [];

      // Create preload elements for next videos
      for (let i = 0; i < 2; i++) {
        const index = (nextIndex + i) % service.mediaFiles.length;
        const video = document.createElement("video");
        video.src = service.mediaFiles[index];
        video.preload = "auto";
        preloadVideos.push(video);
      }
    }
  }, [currentMediaIndex, service.mediaFiles]);

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row">
        {/* Media container with portrait aspect ratio */}
        <div
          className="relative w-full sm:w-1/3 overflow-hidden bg-garden-background/20"
          style={{ aspectRatio: "3/4" }}>
          {/* Always show fallback image first */}
          {service.fallbackImage && (
            <Image
              src={service.fallbackImage}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Show video on top of fallback image if available */}
          {service.mediaFiles?.[currentMediaIndex]?.endsWith(".mp4") && (
            <>
              <video
                ref={videoRef}
                key={`low-${service.mediaFiles[currentMediaIndex]}`}
                autoPlay
                loop={service.mediaFiles.length === 1}
                muted
                playsInline
                onEnded={handleVideoEnd}
                className={`absolute inset-0 w-full h-full object-cover ${isHighQualityLoaded ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}>
                <source
                  src={service.mediaFiles[currentMediaIndex]}
                  type="video/mp4"
                />
              </video>

              <video
                ref={highQualityVideoRef}
                key={`high-${service.mediaFiles[currentMediaIndex]}`}
                autoPlay
                loop={service.mediaFiles.length === 1}
                muted
                playsInline
                onEnded={handleVideoEnd}
                onLoadedData={() => {
                  setIsHighQualityLoaded(true);
                  setIsMediaLoaded(true);
                }}
                className={`absolute inset-0 w-full h-full object-cover ${isHighQualityLoaded ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}>
                <source
                  src={service.mediaFiles[currentMediaIndex]}
                  type="video/mp4"
                />
              </video>
            </>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content section */}
        <div className="p-6 sm:w-2/3 relative">
        {service.link ? (
          <Link href={service.link || "#"} className="cursor-pointer" >
            <MousePointerClick className={(service.link) ? "absolute top-5 right-5" : "hidden"} />
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-playfair font-bold text-garden-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-garden-secondary/80 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-garden-secondary text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-garden-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ) :
         <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-playfair font-bold text-garden-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-garden-secondary/80 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-garden-secondary text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-garden-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        }
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 relative bg-garden-background/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Nos services
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
