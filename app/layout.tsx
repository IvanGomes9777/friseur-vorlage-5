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
  metadataBase: new URL("https://friseur-hairpower.de"),
  title: {
    default: "Hair Power · Friseur Münster Kreuzviertel – ohne Termin",
    template: "%s",
  },
  description:
    "Hair Power by Katja – Friseurmeisterbetrieb im Kreuzviertel Münster. Damen, Herren & Kinder, ohne Termin. Schnitt, Farbe, Balayage. Grevener Str. 63.",
  keywords: [
    "Friseur Münster",
    "Friseur Kreuzviertel",
    "Friseur ohne Termin Münster",
    "Balayage Münster",
    "Herrenfriseur Münster",
    "Kinderfriseur Münster",
    "Hair Power Münster",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true },
  openGraph: {
    title: "Hair Power · Friseur Münster – ohne Termin",
    description:
      "Friseurmeisterbetrieb im Kreuzviertel. Frisuren für Dich – ehrlich, typgerecht. Einfach vorbeikommen.",
    url: "/",
    siteName: "Hair Power",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/salon/salon-facade.png",
        width: 1200,
        height: 630,
        alt: "Hair Power Friseursalon im Kreuzviertel Münster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Power · Friseur Münster – ohne Termin",
    description:
      "Friseurmeisterbetrieb im Kreuzviertel Münster. Frisuren für Dich – einfach vorbeikommen.",
    images: ["/salon/salon-facade.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
