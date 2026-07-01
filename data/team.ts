/* Salon Muster · Team — zentrale Datenquelle.
   ⚠️ Beispiel-Portraits von Unsplash (Platzhalter aus dem Web). Später durch
   eigene Fotos in public/team/ ersetzen und die remotePatterns in
   next.config.mjs anpassen. */

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

const PORTRAIT = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=750&q=70`;

export const TEAM_LEAD: TeamMember & { quote: string } = {
  name: "Maria Musterfrau",
  role: "Inhaberin · Friseurmeisterin",
  image: PORTRAIT("photo-1494790108377-be9c29b29330"),
  alt: "Beispielfoto: Inhaberin und Friseurmeisterin von Salon Muster",
  quote: "Style zu Mensch, passender Look und Zufriedenheit – darum geht es uns.",
};

export const TEAM: TeamMember[] = [
  {
    name: "Lisa Beispiel",
    role: "Hairstylistin",
    image: PORTRAIT("photo-1438761681033-6461ffad8d80"),
    alt: "Beispielfoto: Hairstylistin bei Salon Muster",
  },
  {
    name: "Anna Muster",
    role: "Leiterin Service",
    image: PORTRAIT("photo-1544005313-94ddf0286df2"),
    alt: "Beispielfoto: Leiterin Service bei Salon Muster",
  },
  {
    name: "Tom Beispiel",
    role: "Hairstylist",
    image: PORTRAIT("photo-1500648767791-00dcc994a43e"),
    alt: "Beispielfoto: Hairstylist bei Salon Muster",
  },
];
