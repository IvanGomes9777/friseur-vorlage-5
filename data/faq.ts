/* Salon Muster · FAQ — Beispiel-Antworten (Platzhalter).
   Vor Livegang an die echten Gegebenheiten anpassen (Komponente + Schema lesen daraus). */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Brauche ich einen Termin?",
    a: "Nein – Salon Muster arbeitet ohne Termine. Komm einfach vorbei, ganz ohne Anmeldung. Die Wartezeiten sind in der Regel kurz.",
  },
  {
    q: "Wann habt ihr geöffnet?",
    a: "Dienstag bis Freitag von 08:30–18:00 Uhr und Samstag von 08:00–13:00 Uhr. Montag ist Ruhetag, Sonntag geschlossen.",
  },
  {
    q: "Wo kann ich parken – und mein Fahrrad abstellen?",
    a: "Parkplätze findest du direkt am Salon in der Innenstadt. Auch dein Fahrrad kannst du sicher direkt am Haarsalon abstellen.",
  },
  {
    q: "Wie komme ich mit Bus & Bahn zu euch?",
    a: "Mehrere Bus- und Bahnlinien halten in unmittelbarer Nähe. Der Eingang ist ebenerdig und barrierefrei.",
  },
  {
    q: "Schneidet ihr auch Kinder?",
    a: "Ja! Bei uns gibt es einen eigenen Wartebereich mit Spielecke und altersgerechte Schnitte. Haarschnitt bis 14 Jahre ab 18,00 €.",
  },
  {
    q: "Was kostet ein Haarschnitt?",
    a: "Damen Waschen·Schneiden·Föhnen ab 39,00 €, Herren ab 27,00 €, Kinder bis 14 Jahre 18,00 €. Alle Preise findest du im Bereich „Leistungen“.",
  },
  {
    q: "Macht ihr auch Farbe und Balayage?",
    a: "Ja – Färben, Strähnen, Tönen, Grauhaarabdeckung und Balayage (ab 135 €). Wir stimmen Farbe und Produkt auf deinen Hautton und Haartyp ab, auf Wunsch ammoniakfrei.",
  },
  {
    q: "Wie kann ich bezahlen?",
    a: "Du kannst bequem bar oder mit Karte bezahlen.",
  },
];
