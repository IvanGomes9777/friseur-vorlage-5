import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// DSGVO: next/font lädt & self-hostet die Schriften zur Build-Zeit –
// KEIN Runtime-Request an Google-Server.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hair Power · Friseur Münster Kreuzviertel – ohne Termin",
  description:
    "Hair Power by Katja – Friseurmeisterbetrieb im Kreuzviertel Münster. Damen, Herren & Kinder, ohne Termin. Schnitt, Farbe, Balayage. Grevener Str. 63.",
  metadataBase: new URL("https://friseur-hairpower.de"),
  openGraph: {
    title: "Hair Power · Friseur Münster – ohne Termin",
    description:
      "Friseurmeisterbetrieb im Kreuzviertel. Frisuren für Dich – ehrlich, typgerecht. Einfach vorbeikommen.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
