"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { computeStatus, type OpenStatus } from "@/lib/openingHours";

/* ---------------------------------------------------------------------------
   Hair Power · Hero (Sektion 2) — Option 10
   Vollbild-Salonfoto · zentriert · Live-Öffnungsstatus · Service-Chips ·
   Doppel-CTA. Entrance-Reveal beim Mount, Slow-Zoom des Hintergrunds.
   Bild via next/image (responsive, AVIF/WebP). 100% responsiv, svh-Höhe.
--------------------------------------------------------------------------- */

// Deep-Links: springen direkt in den passenden Tab der Leistungs-Sektion
const CHIPS: { label: string; href: string }[] = [
  { label: "Damen", href: "#leistungen-damen" },
  { label: "Herren", href: "#leistungen-herren" },
  { label: "Kinder", href: "#leistungen-kinder" },
  { label: "Farbe & Balayage", href: "#leistungen-damen" },
];

function Reveal({
  show,
  delay = 0,
  className = "",
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(computeStatus(new Date()));
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative grid min-h-[78svh] place-items-center overflow-hidden px-6 py-20 text-center text-cream">
      {/* Hintergrund: echtes Salon-Foto + Verdunkelung */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/salon/salon-facade.png"
          alt="Hair Power Friseursalon – Außenansicht mit Efeu-Fassade im Kreuzviertel, Münster"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-slow-zoom motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl">
        <Reveal show={mounted}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                status?.open ? "bg-[#9BE6A0] animate-pulse-ring" : "bg-orange"
              }`}
            />
            {status === null
              ? "Friseur ohne Termin"
              : status.open
                ? `Jetzt geöffnet · bis ${status.until} · ohne Termin`
                : "Ohne Termin · Di–Fr ab 8:30 Uhr"}
          </span>
        </Reveal>

        <Reveal show={mounted} delay={120}>
          <h1 className="mt-6 font-serif text-[clamp(2rem,1.1rem+4vw,3.6rem)] font-medium leading-[1.04] tracking-tight">
            Dein Look. <em className="italic text-orange">Dein Moment.</em>
          </h1>
        </Reveal>

        <Reveal show={mounted} delay={220}>
          <p className="mx-auto mt-4 max-w-[44ch] text-base text-cream/85 sm:text-lg">
            Friseurmeisterbetrieb im Kreuzviertel Münster – seit über 15 Jahren.
            Damen, Herren &amp; Kinder. Einfach vorbeikommen.
          </p>
        </Reveal>

        <Reveal show={mounted} delay={320}>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {CHIPS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="inline-flex min-h-[40px] items-center rounded-full border border-white/25 bg-white/10 px-4 text-sm font-semibold backdrop-blur-sm transition-colors duration-200 hover:bg-terra/70"
              >
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal show={mounted} delay={420}>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href="#kontakt"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-terra px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brownDark"
            >
              Termin buchen
            </a>
            <a
              href="#leistungen"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/50 px-6 font-semibold text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              Preise ansehen
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
