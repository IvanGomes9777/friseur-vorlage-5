import { SITE } from "@/data/site";

/* schema.org HairSalon (LocalBusiness) – für Rich Results / lokales SEO.
   Geo-Koordinaten sind genähert; vor Livegang ggf. exakt setzen. */

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://friseur-hairpower.de/#salon",
    name: "Hair Power",
    description:
      "Friseurmeisterbetrieb im Kreuzviertel Münster – Damen, Herren & Kinder, ohne Termin. Schnitt, Farbe, Balayage.",
    url: "https://friseur-hairpower.de",
    image: "https://friseur-hairpower.de/salon/salon-facade.png",
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
      "@type": "GeoCoordinates",
      latitude: 51.974,
      longitude: 7.625,
    },
    areaServed: { "@type": "City", name: "Münster" },
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
      ratingValue: "4.3",
      reviewCount: "254",
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
