"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Scissors, Trees, PenTool, Droplets } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define the service type
type Service = {
  title: string;
  description: string;
  mediaFiles: string[];
  fallbackImage: string;
  icon: LucideIcon;
  features: string[];
};

const services: Service[] = [
  {
    title: "Rasenpflege",
    description:
      "Professionelle Pflege für einen gesunden und vitalen Rasen das ganze Jahr über",
    mediaFiles: [
      "/assets/videos/lawn-care.mp4",
      // Add more video paths here
    ],
    fallbackImage: "/assets/img/FallbackImage.png",
    icon: Scissors,
    features: [
      "Präzises Rasenmähen",
      "Professionelles Vertikutieren",
      "Nährstoffreiche Düngung",
      "Nachhaltige Pflege",
    ],
  },
  {
    title: "Baumpflege",
    description:
      "Fachgerechte Baumpflege für gesunde und sichere Bäume in Ihrem Garten",
    mediaFiles: [
      "/assets/videos/working/workvideo1.mp4",
      "/assets/videos/working/workvideo2.mp4",
      "/assets/videos/working/workvideo3.mp4",
    ],
    fallbackImage: "/assets/img/FallbackImage.png",
    icon: Trees,
    features: [
      "Formschnitt & Pflege",
      "Totholzentfernung",
      "Kronenpflege",
      "Baumsanierung",
    ],
  },
  {
    title: "Gartengestaltung",
    description: "Kreative Gestaltung und Neuanlage von Gartenlandschaften",
    mediaFiles: [
      // Add more video paths here
    ],
    fallbackImage: "/assets/img/FallbackImage.png",
    icon: PenTool,
    features: [
      "Individuelle Planung",
      "Naturnahe Gestaltung",
      "Pflanzkonzepte",
      "Terrassengestaltung",
    ],
  },
  {
    title: "Teichbau",
    description:
      "Professionelle Anlage und Pflege von Wassergärten und Teichen",
    mediaFiles: [],
    fallbackImage: "/assets/img/FallbackImage.png",
    icon: Droplets,
    features: ["Teichplanung", "Filteranlagen", "Teichpflege"],
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
      <div className="relative aspect-video w-full overflow-hidden bg-garden-background/20">
        {/* Always show fallback image first */}
        {service.fallbackImage && (
          <Image
            src={service.fallbackImage}
            alt={service.title}
            fill
            className="object-cover"
            priority // This ensures the image loads immediately
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
              className={`absolute inset-0 w-full h-full object-cover ${
                isHighQualityLoaded ? "opacity-0" : "opacity-100"
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
              className={`absolute inset-0 w-full h-full object-cover ${
                isHighQualityLoaded ? "opacity-100" : "opacity-0"
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

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-garden-primary/10 flex items-center justify-center flex-shrink-0">
            <service.icon className="h-6 w-6 text-garden-primary" />
          </div>
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
            Unsere Leistungen
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
