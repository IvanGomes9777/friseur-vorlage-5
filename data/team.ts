/* Hair Power · Team — zentrale Datenquelle (Fotos in public/team/). */

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

export const TEAM_LEAD: TeamMember & { quote: string } = {
  name: "Katja Schaffeld",
  role: "Inhaberin · Friseurmeisterin",
  image: "/team/katja-casual.png",
  alt: "Katja Schaffeld, Inhaberin und Friseurmeisterin von Hair Power",
  quote: "Style zu Mensch, passender Look und Zufriedenheit – darum geht es uns.",
};

export const TEAM: TeamMember[] = [
  {
    name: "Melanie Köhler",
    role: "Hairstylistin",
    image: "/team/melanie.png",
    alt: "Melanie Köhler, Hairstylistin bei Hair Power",
  },
  {
    name: "Heike",
    role: "Leiterin Service",
    image: "/team/heike.png",
    alt: "Heike, Leiterin Service bei Hair Power",
  },
  {
    name: "Lars Tembrink",
    role: "Hairstylist",
    image: "/team/lars.png",
    alt: "Lars Tembrink, Hairstylist bei Hair Power",
  },
];
