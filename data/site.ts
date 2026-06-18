/* Hair Power · zentrale Standort-/Kontaktdaten (eine Quelle der Wahrheit). */

const ADDRESS_QUERY = "Grevener Str. 63, 48149 Münster";

export const SITE = {
  name: "Hair Power",
  owner: "Katja Schaffeld",
  street: "Grevener Str. 63",
  zip: "48149",
  city: "Münster",
  district: "York Center · Kreuzviertel",
  phone: "0251 5340748",
  phoneHref: "+492515340748",
  email: "info@friseur-hairpower.de",
  reviewUrl: "https://share.google/z6j39BpDfGPUfs6bE",
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
