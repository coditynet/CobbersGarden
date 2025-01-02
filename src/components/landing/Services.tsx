"use client";
import { useState, useRef } from "react";
//import posthog from "posthog-js";

const services = [
  {
    title: "Rasenpflege",
    description:
      "Professionelle Pflege für einen gesunden und vitalen Rasen das ganze Jahr über",
    mediaFiles: [
      "/assets/videos/lawn-care.mp4",
      // Add more video paths here
    ],
    fallbackImage: "/assets/img/FallbackImage.png",
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
    features: [
      "Teichplanung",
      "Filteranlagen",
      "Wasserpflanzen",
      "Teichpflege",
    ],
  },
];

const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
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

  // Get low quality version of video URL
  const getLowQualityUrl = (url: string) => {
    return url.replace(".mp4", "-low.mp4");
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden">
        {service.mediaFiles?.[currentMediaIndex]?.endsWith(".mp4") ? (
          <>
            {/* Low quality video that plays immediately */}
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
                src={getLowQualityUrl(service.mediaFiles[currentMediaIndex])}
                type="video/mp4"
              />
            </video>

            {/* High quality video that loads in the background */}
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
        ) : service.fallbackImage ? (
          <div className="w-full h-full bg-garden-background/20" >
          
             </div>  // Placeholder while image loads
        ) : (
          <div className="w-full h-full bg-garden-background/20" /> // Default placeholder
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
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
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 relative bg-garden-background/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          Unsere Leistungen
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
