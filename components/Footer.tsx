"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { computeStatus, type OpenStatus } from "@/lib/openingHours";

/* ---------------------------------------------------------------------------
   Hair Power · Footer — Konzept 05 "Minimal zentriert"
   Zentriertes Logo, Live-Öffnungsstatus, eine Nav-Zeile, Kontakt inline,
   Recht-Leiste (Impressum/Datenschutz). Ruhig & aufgeräumt.
--------------------------------------------------------------------------- */

const NAV = [
  { label: "Über uns", href: "/#ueber" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Team", href: "/#team" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Bewertungen", href: "/#bewertungen" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [status, setStatus] = useState<OpenStatus | null>(null);

  // Live-Status erst nach Mount → keine Hydration-Mismatches
  useEffect(() => {
    setStatus(computeStatus(new Date()));
  }, []);

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-3xl px-6 py-14 text-center">
        {/* Logo */}
        <Image
          src="/brand/hair-power-logo.png"
          alt="Hair Power · Friseur Münster by Katja"
          width={232}
          height={123}
          className="mx-auto h-16 w-auto rounded-xl bg-white p-2.5"
        />

        {/* Live-Öffnungsstatus */}
        <div className="mt-4 flex justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold ${
              status?.open ? "text-[#9BE6A0]" : "text-orange"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status?.open ? "bg-[#9BE6A0] animate-pulse-ring" : "bg-orange"
              }`}
            />
            {status === null
              ? "Friseur ohne Termin"
              : status.open
                ? `Jetzt geöffnet · bis ${status.until}`
                : "Geschlossen · Di–Fr ab 8:30"}
          </span>
        </div>

        <p className="mt-5 max-w-[40ch] mx-auto text-sm text-cream/70">
          Friseurmeisterbetrieb im Kreuzviertel Münster – Damen, Herren &amp;
          Kinder, ohne Termin.
        </p>

        {/* Navigation (eine Zeile) */}
        <nav
          aria-label="Footer-Navigation"
          className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-cream/80 transition-colors hover:text-orange"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Kontakt inline */}
        <address className="mt-6 space-y-1 text-sm not-italic text-cream/80">
          <p>
            {SITE.street} · {SITE.zip} {SITE.city} · {SITE.district}
          </p>
          <p>
            <a href={`tel:${SITE.phoneHref}`} className="text-cream hover:text-orange">
              {SITE.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${SITE.email}`} className="text-cream hover:text-orange">
              {SITE.email}
            </a>
          </p>
          <p>
            <a
              href={SITE.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange hover:underline"
            >
              Route planen →
            </a>
          </p>
        </address>
      </div>

      {/* Recht-Leiste */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hair Power · Katja Schaffeld. Alle Rechte vorbehalten.</p>
          <nav aria-label="Rechtliches" className="flex gap-5">
            <Link href="/impressum" className="hover:text-cream">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-cream">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
