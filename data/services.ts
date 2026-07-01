/* ---------------------------------------------------------------------------
   Salon Muster · Leistungen & Preise — zentrale Datenquelle
   ⚠️ Beispielpreise (Platzhalter) – vor Livegang durch die echte Preisliste
   ersetzen. Änderungen NUR hier pflegen – Komponenten lesen automatisch daraus.
--------------------------------------------------------------------------- */

export type PriceItem = { name: string; price: string; note?: string };
export type ServiceGroup = { title?: string; items: PriceItem[] };
export type InfoBox = {
  title: string;
  items: { heading: string; text: string }[];
};

export type ServiceCategory = {
  id: string;
  label: string;
  intro?: string;
  groups: ServiceGroup[];
  infoBox?: InfoBox;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "damen",
    label: "Damen",
    intro:
      "Individuell und modebewusst – traditionelle Technik in Schnitt und Farbe, kombiniert mit aktuellen Trends.",
    infoBox: {
      title: "Damenhaar aus Meisterhand",
      items: [
        {
          heading: "Schnitt & Styling",
          text: "Waschen, Schneiden, Föhnen – individuell auf Haarstruktur, Gesichtsform und deinen Stil abgestimmt, inklusive Pflegeberatung.",
        },
        {
          heading: "Farbe, Strähnen & Balayage",
          text: "Grauabdeckung, Aufhellung oder natürliche Highlights – Wurzelfarbe, Balayage, Ombré. Auf Hautton & Haartyp abgestimmt, auf Wunsch ammoniakfrei.",
        },
      ],
    },
    groups: [
      {
        title: "Schnitt & Styling",
        items: [
          { name: "Waschen · Schneiden · Föhnen / Legen", price: "39,00 €" },
          { name: "Waschen · Schneiden / selber Föhnen", price: "33,00 €" },
          { name: "Anfeuchten · Schneiden", price: "27,00 €" },
          { name: "Waschen · Föhnen / Legen", price: "ab 25,00 €" },
          { name: "Pony schneiden", price: "8,00 €" },
          { name: "Permanent Styling", price: "ab 39,00 €", note: "bis Haarlänge 10 cm" },
          { name: "Dauerwelle", price: "ab 49,00 €" },
          { name: "Hochsteckfrisur", price: "ab 45,00 €", note: "nach Aufwand" },
          { name: "Haarpflege · Kur (Intensiv)", price: "9,00 €" },
          { name: "Glätten", price: "ab 15,00 €", note: "extra" },
        ],
      },
      {
        title: "Farbe & Tönung",
        items: [
          { name: "Haarfärbung (Neu)", price: "ab 39,00 €" },
          { name: "Haarfärbung (Ansatz)", price: "ab 35,00 €", note: "bis 2 cm" },
          { name: "Tönung (Normal / Intensiv)", price: "ab 27,00 €" },
          { name: "Balayage", price: "ab 135,00 €", note: "unsere Spezialität" },
          { name: "Pastelltoncoloration", price: "ab 25,00 €" },
        ],
      },
      {
        title: "Strähnen",
        items: [
          { name: "Foliensträhnen (Oberkopf)", price: "ab 45,00 €" },
          { name: "Foliensträhnen (Ganzer Kopf)", price: "ab 55,00 €" },
          { name: "Foliensträhnen lang", price: "ab 61,00 €" },
        ],
      },
      {
        title: "Augenbrauen & Wimpern",
        items: [
          { name: "Augenbrauen zupfen", price: "10,00 €" },
          { name: "Augenbrauen färben", price: "11,00 €" },
          { name: "Wimpern färben", price: "11,00 €" },
        ],
      },
    ],
  },
  {
    id: "herren",
    label: "Herren",
    intro:
      "Typgerechte, pflegeleichte Business-Frisuren – Schnitt, Pflege, Strähnen, Tönen und Grauhaarabdeckung.",
    infoBox: {
      title: "Dein Gentleman-Barbier",
      items: [
        {
          heading: "Individuell für den Herrn",
          text: "Ob Business oder Freizeit – typgerechte, pflegeleichte Schnitte samt Waschen, Föhnen und Bartpflege. Personalisierung & Beratung sind unser Markenzeichen.",
        },
        {
          heading: "Farbe & mehr",
          text: "Strähnen, Tönen und Grauhaarabdeckung – dezent und natürlich, abgestimmt auf deinen Typ.",
        },
      ],
    },
    groups: [
      {
        title: "Schnitt & Bart",
        items: [
          { name: "Anfeuchten · Schneiden", price: "20,00 €" },
          { name: "Waschen · Schneiden · Föhnen", price: "27,00 €" },
          { name: "Kompletter Maschinenschnitt", price: "16,00 €" },
          { name: "Konturenschnitt", price: "15,00 €" },
          { name: "Bart schneiden", price: "8,00 €" },
        ],
      },
      {
        title: "Farbe & Strähnen",
        items: [
          { name: "Haarfärbung", price: "ab 35,00 €" },
          { name: "Strähnen (Lichtreflexe / Spitzen / Hauben)", price: "ab 21,00 €" },
          { name: "Foliensträhnen", price: "ab 45,00 €" },
        ],
      },
    ],
  },
  {
    id: "kinder",
    label: "Kinder",
    intro:
      "Kinderfriseur für junge Leute – trendig, modern, selbstbewusst. Altersgerecht, individuell und zeitgemäß. New Style, Top Style & Pflege bis 14 Jahre.",
    infoBox: {
      title: "Kinderfriseur mit Spielecke",
      items: [
        {
          heading: "Eigener Wartebereich mit Spielecke",
          text: "Bei uns wird der Friseurbesuch entspannt: eigene Spielecke und die neuesten Trends – damit die Kleinen chic und cool nach Hause gehen.",
        },
        {
          heading: "Beratung & Pflege",
          text: "Altersgerechter, individueller Schnitt mit klasse Beratung. Wir zeigen, wie ihr die Frisur zuhause am besten pflegt und kämmt.",
        },
      ],
    },
    groups: [
      {
        items: [
          { name: "Haarschnitt bis 14 Jahre", price: "18,00 €" },
          { name: "Waschen · Schneiden · Föhnen", price: "ab 25,00 €" },
        ],
      },
    ],
  },
];

/** Eigener Block für besondere Anlässe / Hochzeit (beschreibend statt Preisliste). */
export const OCCASIONS = {
  kicker: "Besondere Anlässe",
  title: "Frisuren für Deinen schönsten Tag",
  paragraphs: [
    "Hochzeits-Frisuren: Ob Hochsteckfrisur, offene Haare schön verziert oder eine geflochtene Frisur – je nach Art der Hochzeit und passend zum Kleid kreieren wir Deinen perfekten Look.",
    "Theater oder Business: klassisch, romantische Flechtfrisuren oder ein moderner Schnitt mit Blumen oder Perlen. Wir finden, was zu Dir und Deinem Anlass passt.",
    "Übrigens auch für Weihnachtsfeiern, Geburtstage oder Abschlussfeiern.",
  ],
  priceHint: "Hochsteckfrisur ab 45 € · nach Aufwand",
};
