"use client";

import { SITE } from "@/data/site";
import { useInView } from "@/lib/useInView";
import MapEmbed from "@/components/MapEmbed";
import ContactForm from "@/components/ContactForm";

/* Hair Power · Kontakt (Sektion 6) — Option 5 "Big CTA"
   Dunkler Info-Block links (Adresse + Route-Link + Öffnungszeiten + Karte),
   Formular rechts. */

export default function Kontakt() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="kontakt" className="scroll-mt-28 bg-cream2 px-6 py-14 sm:py-20 lg:px-10">
      <div
        ref={ref}
        className={`mx-auto grid max-w-screen-2xl overflow-hidden rounded-3xl border border-ink/10 transition-all duration-700 ease-out motion-reduce:transition-none lg:grid-cols-[1.05fr_0.95fr] ${
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {/* Linke, dunkle Seite */}
        <div className="bg-ink p-7 text-cream sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
            Kontakt &amp; Anfahrt
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.7rem,1rem+2.4vw,2.6rem)] font-medium leading-tight">
            Komm vorbei – mitten im Kreuzviertel.
          </h2>

          <div className="mt-7 space-y-4">
            <InfoRow icon="📍">
              <b className="font-semibold">{SITE.street}</b>
              <span className="block text-sm text-cream/70">
                {SITE.zip} {SITE.city} · {SITE.district}
              </span>
              <a
                href={SITE.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-orange underline-offset-2 hover:underline"
              >
                Route planen →
              </a>
            </InfoRow>

            <InfoRow icon="📞">
              <a href={`tel:${SITE.phoneHref}`} className="font-semibold hover:underline">
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="block text-sm text-cream/70 hover:underline"
              >
                {SITE.email}
              </a>
            </InfoRow>

            <InfoRow icon="🕐">
              <b className="font-semibold">Öffnungszeiten</b>
              <span className="mt-1 block space-y-0.5 text-sm text-cream/70">
                {SITE.hours.map((h) => (
                  <span key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </span>
                ))}
              </span>
            </InfoRow>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange/20 px-3.5 py-2 text-sm font-semibold text-orange">
            <span className="h-2 w-2 rounded-full bg-orange" />
            Friseur ohne Termin – einfach reinkommen
          </span>

          <div className="mt-6">
            <MapEmbed />
          </div>
        </div>

        {/* Rechte Seite: Formular */}
        <div className="bg-cream2 p-7 sm:p-10">
          <h3 className="font-serif text-xl font-medium text-ink">
            Schreib uns
          </h3>
          <p className="mt-1 mb-5 text-sm text-inkSoft">
            Fragen, Wünsche oder ein Anliegen für einen besonderen Anlass? Wir
            antworten gern.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-white/12 text-base"
      >
        {icon}
      </span>
      <div className="leading-snug">{children}</div>
    </div>
  );
}
