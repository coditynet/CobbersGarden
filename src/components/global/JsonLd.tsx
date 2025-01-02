import { Organization, WithContext } from "schema-dts";

const JsonLd = () => {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://cobbersgarden.de",
    name: "Cobbers Garden",
    image: "https://cobbersgarden.de/assets/img/logo_full.png",
    description: "Professionelle Gartenpflege und Rasenmähen in Ihrer Region",
    url: "https://cobbersgarden.de",
    telephone: "+49 123 456 7890",
    email: "info@cobbersgarden.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Musterstraße 123",
      addressLocality: "Musterstadt",
      postalCode: "12345",
      addressCountry: "DE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "YOUR_LATITUDE",
      longitude: "YOUR_LONGITUDE"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00"
      }
    ],
    sameAs: [
      "https://facebook.com/cobbersgarden",
      "https://instagram.com/cobbersgarden"
    ],
    priceRange: "€€",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "YOUR_LATITUDE",
        longitude: "YOUR_LONGITUDE"
      },
      geoRadius: "50000"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gartenpflege Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rasenpflege",
            description: "Professionelle Pflege für einen gesunden und schönen Rasen"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pflanzenpflege",
            description: "Umfassende Pflege Ihrer Pflanzen und Beete"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Grundstückspflege",
            description: "Professionelle Pflege des gesamten Grundstücks"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gartenprojekte",
            description: "Umsetzung spezieller Gartenprojekte nach Ihren Wünschen"
          }
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd; 