/* Hair Power · Google-Bewertungen — zentrale Datenquelle.
   Echte Rezensionen, mit Vorname/Initial (DSGVO-konform). */

export type Review = { text: string; name: string; when?: string };

export const REVIEW_META = {
  rating: "4,3",
  count: 254,
  /** Google-Link zum Bewertung-Schreiben / Profil */
  reviewUrl: "https://share.google/z6j39BpDfGPUfs6bE",
};

export const REVIEWS_A: Review[] = [
  { text: "Top beraten und so geschnitten wie gewünscht! Bin jahrelange Kundin.", name: "Isabella", when: "vor 9 Monaten" },
  { text: "Bin mit superschönen Strähnen und frischem Haarschnitt glücklich zur Tür hinaus.", name: "Dalli", when: "vor 8 Monaten" },
  { text: "Katja hat mir einen wirklich tollen Haarschnitt gezaubert – rundum gut aufgehoben.", name: "Sonka Wegner", when: "vor 8 Monaten" },
  { text: "Absolut begeistert! Das Ergebnis hat meine Erwartungen übertroffen.", name: "Karsten Luetteke", when: "vor 9 Monaten" },
];

export const REVIEWS_B: Review[] = [
  { text: "Keine langen Wartezeiten, Frisur sitzt auch immer super.", name: "Pascal Schmale" },
  { text: "Erster Haarschnitt unseres Sohnes – Katja war liebevoll & kindgerecht.", name: "Julia B.", when: "vor 9 Monaten" },
  { text: "Ich habe mich sofort verstanden und professionell aufgehoben gefühlt.", name: "La Me" },
  { text: "Man kann immer ohne Termin hinein – ich musste nie lange warten :)", name: "Isabella", when: "vor 9 Monaten" },
];
