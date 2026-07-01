/* Salon Muster · zentrale Standort-/Kontaktdaten (eine Quelle der Wahrheit).
   ⚠️ Beispieldaten (Platzhalter) – vor Livegang durch echte Angaben ersetzen. */

const ADDRESS_QUERY = "Musterstraße 12, 12345 Musterstadt";

export const SITE = {
  name: "Salon Muster",
  owner: "Maria Musterfrau",
  street: "Musterstraße 12",
  zip: "12345",
  city: "Musterstadt",
  district: "Innenstadt · Zentrum",
  phone: "01234 567890",
  phoneHref: "+491234567890",
  email: "info@salon-muster.de",
  reviewUrl: "https://www.google.com/maps",
  /** Öffnet direkt den Google-Maps-Routenplaner zum Salon. */
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(ADDRESS_QUERY),
  /** Eingebettete Karte – erst nach Consent (Klick) geladen. */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(ADDRESS_QUERY) +
    "&z=15&output=embed",
  hours: [
    { day: "Montag", time: "Ruhetag" },
    { day: "Dienstag – Freitag", time: "08:30 – 18:00" },
    { day: "Samstag", time: "08:00 – 13:00" },
    { day: "Sonntag", time: "geschlossen" },
  ],
} as const;
