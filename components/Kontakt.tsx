"use client";

import { SITE } from "@/data/site";
import { useInView } from "@/lib/useInView";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";

/* ---------------------------------------------------------------------------
   Hair Power · Kontakt (Sektion 8) — Konzept 02 "Karte + Floating-Card"
   Große Consent-gated Karte als Bühne, darüber eine schwebende Kontakt-Card
   (Adresse · Route · Telefon · Zeiten · „ohne Termin"). Formular darunter.
--------------------------------------------------------------------------- */

export default function Kontakt() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="kontakt" className="scroll-mt-28 bg-cream2 px-6 py-9 sm:py-12 lg:px-10">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Karten-Bühne mit schwebender Card */}
        <div className="relative overflow-hidden rounded-3xl border border-ink/10">
          <MapEmbed className="h-[clamp(380px,54vh,560px)] w-full" />
          {/* sanfter Verlauf für Lesbarkeit der Card (lässt Mitte frei für den Consent-Button) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
          />

          <div
            className={`absolute inset-x-4 bottom-4 max-w-md rounded-3xl bg-white/90 p-6 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out motion-reduce:transition-none sm:bottom-8 sm:left-8 sm:p-7 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
              Kontakt &amp; Anfahrt
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink">
              {SITE.street}
            </h2>
            <p className="text-sm text-inkSoft">
              {SITE.zip} {SITE.city} · {SITE.district}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={SITE.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-ink px-4 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-terra"
              >
                📍 Route planen
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-ink/15 px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink/5"
              >
                📞 {SITE.phone}
              </a>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-0.5 text-xs text-inkSoft sm:grid-cols-2">
              {SITE.hours.map((h) => (
                <span key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="font-medium text-ink">{h.time}</span>
                </span>
              ))}
            </div>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-terra/12 px-3.5 py-2 text-xs font-semibold text-brownDark">
              <span className="h-2 w-2 rounded-full bg-terra" />
              Friseur ohne Termin – einfach reinkommen
            </span>
          </div>
        </div>

        {/* Formular darunter */}
        <div className="mx-auto mt-8 max-w-xl">
          <h3 className="font-serif text-xl font-medium text-ink">Lieber schreiben?</h3>
          <p className="mb-5 mt-1 text-sm text-inkSoft">
            Fragen, Wünsche oder ein Anliegen für einen besonderen Anlass? Wir
            antworten gern – oder komm einfach ohne Termin vorbei.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
