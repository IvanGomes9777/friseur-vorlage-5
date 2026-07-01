import { SITE } from "@/data/site";

/* schema.org HairSalon (LocalBusiness) – für Rich Results / lokales SEO.
   Geo-Koordinaten sind genähert; vor Livegang ggf. exakt setzen. */

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://salon-muster.de/#salon",
    name: SITE.name,
    description:
      "Friseurmeisterbetrieb in der Innenstadt – Damen, Herren & Kinder, ohne Termin. Schnitt, Farbe, Balayage.",
    url: "https://salon-muster.de",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=70",
    telephone: "+49" + SITE.phoneHref.replace(/^\+49/, ""),
    email: SITE.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Bar, Karte",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      postalCode: SITE.zip,
      addressLocality: SITE.city,
      addressCountry: "DE",
    },
    geo: {
      // Beispiel-Koordinaten (Platzhalter) – vor Livegang exakt setzen.
      "@type": "GeoCoordinates",
      latitude: 52.52,
      longitude: 13.405,
    },
    areaServed: { "@type": "City", name: SITE.city },
    hasMap: SITE.mapsDirectionsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
    },
    sameAs: [SITE.reviewUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
