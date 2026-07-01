/* Salon Muster · Galerie / Lookbook — zentrale Datenquelle.
   ⚠️ Aktuell Unsplash-Platzhalter. Echte Kundenfotos brauchen vorab eine
   schriftliche Einwilligung (DSGVO). Später durch Fotos in public/galerie/
   ersetzen und die remotePatterns in next.config.mjs entfernen. */

export type GalleryCategory =
  | "damen"
  | "herren"
  | "farbe"
  | "kinder"
  | "hochzeit";

export const GALLERY_FILTERS: { id: "alle" | GalleryCategory; label: string }[] =
  [
    { id: "alle", label: "Alle" },
    { id: "damen", label: "Damen" },
    { id: "herren", label: "Herren" },
    { id: "farbe", label: "Farbe" },
    { id: "kinder", label: "Kinder" },
    { id: "hochzeit", label: "Hochzeit" },
  ];

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`;

export const GALLERY: GalleryItem[] = [
  { src: U("photo-1521590832167-7bcbfaa6381f"), alt: "Damen-Haarschnitt", category: "damen" },
  { src: U("photo-1522336572468-97b06e8ef143"), alt: "Balayage / Farbe", category: "farbe" },
  { src: U("photo-1503951914875-452162b0f3f1"), alt: "Herren-Schnitt", category: "herren" },
  { src: U("photo-1519741497674-611481863552"), alt: "Hochzeitsfrisur", category: "hochzeit" },
  { src: U("photo-1580618672591-eb180b1a973f"), alt: "Damen-Styling", category: "damen" },
  { src: U("photo-1560869713-7d0a29430803"), alt: "Strähnen / Farbe", category: "farbe" },
  { src: U("photo-1599351431202-1e0f0137899a"), alt: "Herren-Look", category: "herren" },
  { src: U("photo-1595152772835-219674b2a8a6"), alt: "Hochsteckfrisur", category: "hochzeit" },
  { src: U("photo-1605497788044-5a32c7078486"), alt: "Kinder-Haarschnitt", category: "kinder" },
  { src: U("photo-1560066984-138dadb4c035"), alt: "Frischer Schnitt für Kids", category: "kinder" },
];
