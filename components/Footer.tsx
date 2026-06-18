import Link from "next/link";
import { SITE } from "@/data/site";

const NAV = [
  { label: "Über uns", href: "/#ueber" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Team", href: "/#team" },
  { label: "Bewertungen", href: "/#bewertungen" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold tracking-[0.04em]">
            HAIR POWER
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-terra">
            The Art of Hair Power
          </p>
          <p className="mt-4 max-w-[30ch] text-sm text-cream/70">
            Friseurmeisterbetrieb im Kreuzviertel Münster – Damen, Herren &amp;
            Kinder, ohne Termin.
          </p>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cream/50">
            Entdecken
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-cream/80 hover:text-orange">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cream/50">
            Kontakt
          </h2>
          <address className="mt-3 space-y-1 text-sm not-italic text-cream/80">
            <p>
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}
            </p>
            <p>
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-orange">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-orange">
                {SITE.email}
              </a>
            </p>
            <p>
              <a
                href={SITE.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange"
              >
                Route planen →
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
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
