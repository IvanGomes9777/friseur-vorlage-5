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
  metadataBase: new URL("https://salon-muster.de"),
  title: {
    default: "Salon Muster · Friseur Musterstadt Innenstadt – ohne Termin",
    template: "%s",
  },
  description:
    "Salon Muster by Maria – Friseurmeisterbetrieb im Innenstadt Musterstadt. Damen, Herren & Kinder, ohne Termin. Schnitt, Farbe, Balayage. Musterstraße 12.",
  keywords: [
    "Friseur Musterstadt",
    "Friseur Innenstadt",
    "Friseur ohne Termin Musterstadt",
    "Balayage Musterstadt",
    "Herrenfriseur Musterstadt",
    "Kinderfriseur Musterstadt",
    "Salon Muster Musterstadt",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true },
  openGraph: {
    title: "Salon Muster · Friseur Musterstadt – ohne Termin",
    description:
      "Friseurmeisterbetrieb im Innenstadt. Frisuren für Dich – ehrlich, typgerecht. Einfach vorbeikommen.",
    url: "/",
    siteName: "Salon Muster",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=70",
        width: 1200,
        height: 630,
        alt: "Salon Muster Friseursalon im Innenstadt Musterstadt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Muster · Friseur Musterstadt – ohne Termin",
    description:
      "Friseurmeisterbetrieb im Innenstadt Musterstadt. Frisuren für Dich – einfach vorbeikommen.",
    images: ["https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=70"],
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
