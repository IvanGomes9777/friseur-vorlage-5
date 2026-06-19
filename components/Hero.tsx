"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { computeStatus, type OpenStatus } from "@/lib/openingHours";

/* ---------------------------------------------------------------------------
   Hair Power · Hero (Sektion 2) — Konzept 08 "Scroll-Scrub Reveal"
   Gepinnte Bühne: beim Scrollen skaliert das echte Salonfoto langsam auf
   (scale 1.22 → 1), der Verdunkler weicht und der Inhalt parallaxt sanft.
   Alles an die Scroll-Position gekoppelt (kein Autoplay).
   Bild via next/image (AVIF/WebP) · 100% responsiv · prefers-reduced-motion.
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

  const trackRef = useRef<HTMLDivElement>(null); // hohe Scroll-Bühne
  const imgRef = useRef<HTMLDivElement>(null); // wird skaliert
  const overlayRef = useRef<HTMLDivElement>(null); // Verdunkler (Opazität)
  const contentRef = useRef<HTMLDivElement>(null); // Parallax
  const hintRef = useRef<HTMLDivElement>(null); // Scroll-Hinweis

  useEffect(() => {
    setStatus(computeStatus(new Date()));
    const id = requestAnimationFrame(() => setMounted(true));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Statischer, gut lesbarer Endzustand – kein Scrubbing
      if (imgRef.current) imgRef.current.style.transform = "scale(1)";
      if (overlayRef.current) overlayRef.current.style.opacity = "0.5";
      return () => cancelAnimationFrame(id);
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const track = trackRef.current;
      if (!track) return;
      const vh = window.innerHeight;
      const total = track.offsetHeight - vh;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total));
      if (imgRef.current) imgRef.current.style.transform = `scale(${(1.22 - 0.22 * p).toFixed(4)})`;
      if (overlayRef.current) overlayRef.current.style.opacity = (0.72 - 0.42 * p).toFixed(3);
      if (contentRef.current) contentRef.current.style.transform = `translateY(${(-36 * p).toFixed(1)}px)`;
      if (hintRef.current) hintRef.current.style.opacity = (1 - Math.min(1, p * 3)).toFixed(2);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    // Hohe „Bühne": gibt dem Sticky-Inhalt Scroll-Weg fürs Scrubbing
    <div ref={trackRef} className="relative h-[180vh]">
      <section className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden px-6 text-center text-cream">
        {/* Hintergrund: echtes Salon-Foto (wird beim Scrollen skaliert) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            ref={imgRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: "scale(1.22)" }}
          >
            <Image
              src="/salon/salon-facade.png"
              alt="Hair Power Friseursalon – Außenansicht mit Efeu-Fassade im Kreuzviertel, Münster"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Verdunkler – Opazität wird gescrubbt */}
          <div ref={overlayRef} className="absolute inset-0 bg-ink" style={{ opacity: 0.72 }} />
          {/* Konstanter Verlauf für sichere Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
        </div>

        <div ref={contentRef} className="mx-auto max-w-4xl will-change-transform">
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
            <h1 className="mt-5 font-serif text-[clamp(1.9rem,1.1rem+3.4vw,3.2rem)] font-medium leading-[1.04] tracking-tight">
              Dein Look. <em className="italic text-orange">Dein Moment.</em>
            </h1>
          </Reveal>

          <Reveal show={mounted} delay={220}>
            <p className="mx-auto mt-3 max-w-[44ch] text-base text-cream/85 sm:text-lg">
              Friseurmeisterbetrieb im Kreuzviertel Münster – seit über 15 Jahren.
              Damen, Herren &amp; Kinder. Einfach vorbeikommen.
            </p>
          </Reveal>

          <Reveal show={mounted} delay={320}>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
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
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
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

        {/* Scroll-Hinweis (blendet beim Scrollen aus) */}
        <div
          ref={hintRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-cream/60"
        >
          ↓ scrollen
        </div>
      </section>
    </div>
  );
}
