/* Salon Muster · Bewertungen — zentrale Datenquelle.
   ⚠️ Beispiel-Rezensionen (Platzhalter). Vor Livegang durch echte, freigegebene
   Bewertungen ersetzen (bei Google-Reviews Vorname/Initial, DSGVO-konform). */

export type Review = { text: string; name: string; when?: string };

export const REVIEW_META = {
  rating: "4,9",
  count: 87,
  /** Google-Link zum Bewertung-Schreiben / Profil */
  reviewUrl: "https://www.google.com/maps",
};

export const REVIEWS_A: Review[] = [
  { text: "Top beraten und genau so geschnitten wie gewünscht! Bin gerne wieder hier.", name: "Sarah", when: "vor 2 Monaten" },
  { text: "Mit superschönen Strähnen und frischem Haarschnitt glücklich zur Tür hinaus.", name: "Nina", when: "vor 1 Monat" },
  { text: "Wirklich toller Haarschnitt – rundum gut aufgehoben und freundlich beraten.", name: "Jonas Beispiel", when: "vor 3 Monaten" },
  { text: "Absolut begeistert! Das Ergebnis hat meine Erwartungen übertroffen.", name: "Markus Muster", when: "vor 2 Monaten" },
];

export const REVIEWS_B: Review[] = [
  { text: "Keine langen Wartezeiten, die Frisur sitzt auch immer super.", name: "Patrick Beispiel" },
  { text: "Erster Haarschnitt unseres Sohnes – das Team war liebevoll & kindgerecht.", name: "Julia B.", when: "vor 2 Monaten" },
  { text: "Ich habe mich sofort verstanden und professionell aufgehoben gefühlt.", name: "Lena M." },
  { text: "Man kann immer ohne Termin vorbeikommen – ich musste nie lange warten :)", name: "Sarah", when: "vor 2 Monaten" },
];
