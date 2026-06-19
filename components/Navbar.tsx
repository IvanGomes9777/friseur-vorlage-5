"use client";

import { useEffect, useRef, useState } from "react";
import { computeStatus, type OpenStatus } from "@/lib/openingHours";

/* ---------------------------------------------------------------------------
   Hair Power · Navbar — Konzept 05 "Salon Luxe Dark"
   Dunkle Ink-Bar mit warmem Gold/Orange-Akzent, zentrierte Serifen-Wortmarke.
   · Spotlight folgt dem Cursor (nur Maus, nur ohne reduce-motion)
   · Goldene Trennlinie wächst beim Laden auf volle Breite
   · Shrink-on-Scroll · Live-Öffnungsstatus · Scroll-Spy
   · Mobile: Fullscreen-Overlay mit eigenem Schließen-Button
   100% responsiv · Touch-Targets ≥ 44px · prefers-reduced-motion respektiert
--------------------------------------------------------------------------- */

const LINKS = [
  { label: "Über uns", href: "#ueber" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Team", href: "#team" },
  { label: "Galerie", href: "#galerie" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Kontakt", href: "#kontakt" },
];

// Durchlaufende Service-Leiste (echte USPs/Preise aus dem Salon)
const MARQUEE = [
  "Friseur ohne Termin",
  "Balayage ab 135 €",
  "Herren ab 16 €",
  "Kinder mit Spielecke",
  "Grauabdeckung",
  "Hochsteckfrisuren ab 45 €",
  "4,3 ★ · 254 Rezensionen",
];

type Status = OpenStatus;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [activeId, setActiveId] = useState<string>("");
  const [lineGrown, setLineGrown] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Status & Scroll erst nach Mount → keine Hydration-Mismatches
  useEffect(() => {
    setStatus(computeStatus(new Date()));
    // Hysterese gegen "Shrink-Jitter": zum Einklappen > 150px nötig, zum
    // Ausklappen erst wieder < 60px. Das Totband (90px) ist größer als die
    // beim Einklappen entfernte Leistenhöhe (Utility + Marquee ≈ 88px) und
    // verhindert das Auf-/Zu-Flackern an der Schwelle. State ändert sich nur
    // bei echtem Wechsel (gleicher Wert → React rendert nicht neu).
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y >= 60 : y > 150));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Goldlinie nach erstem Frame aufwachsen lassen
    const id = requestAnimationFrame(() => setLineGrown(true));
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(id);
    };
  }, []);

  // Body-Scroll sperren, solange das Mobile-Menü offen ist
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ESC schließt das Menü
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-Spy: aktive Sektion hervorheben
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Spotlight, das dem Cursor folgt (nur Maus, nur ohne reduce-motion)
  const onBarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = barRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.background = `radial-gradient(440px circle at ${
      e.clientX - r.left
    }px ${e.clientY - r.top}px, rgba(244,164,96,0.16), transparent 60%), #2A211B`;
  };
  const onBarLeave = () => {
    if (barRef.current) barRef.current.style.background = "#2A211B";
  };

  return (
    <header className="sticky top-0 z-50 bg-ink text-cream">
      {/* ---------- Slim Utility-Strip ---------- */}
      <div
        className={`overflow-hidden border-b border-white/5 bg-[#211913] transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[0.76rem] tracking-wide text-cream/70">
          <span className="inline-flex items-center gap-2">
            <StatusDot status={status} />
            <StatusLabel status={status} />
          </span>
          <span className="hidden sm:inline">📍 Grevener Str. 63 · Kreuzviertel</span>
          <a href="tel:+492515340748" className="font-semibold text-orange hover:underline">
            0251 5340748
          </a>
          <span className="hidden md:inline">
            Friseur <b className="font-semibold text-cream">ohne Termin</b>
          </span>
        </div>
      </div>

      {/* ---------- Hauptnavigation (Dark + Spotlight) ---------- */}
      <div ref={barRef} onMouseMove={onBarMove} onMouseLeave={onBarLeave} style={{ background: "#2A211B" }}>
        <div
          className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-5 transition-all duration-500 lg:grid-cols-3 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Links (nur Desktop) */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation links">
            {LINKS.slice(0, 3).map((l) => (
              <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
            ))}
          </nav>

          {/* Wortmarke – mobil links, ab lg zentriert */}
          <a
            href="#top"
            className="justify-self-start text-center leading-none lg:col-start-2 lg:justify-self-center"
          >
            <span
              className={`block font-serif font-semibold tracking-[0.06em] text-cream transition-all duration-500 ${
                scrolled ? "text-lg" : "text-xl sm:text-2xl"
              }`}
            >
              HAIR POWER
            </span>
            <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.4em] text-orange">
              Friseurmeister · Münster
            </span>
          </a>

          {/* Rechte Seite */}
          <div className="flex items-center justify-end gap-5 lg:col-start-3">
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation rechts">
              {LINKS.slice(3, 5).map((l) => (
                <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
              ))}
            </nav>
            <a
              href="#kontakt"
              className="hidden min-h-[44px] items-center rounded-full border border-orange/60 px-5 text-sm font-semibold text-orange transition-colors duration-200 hover:bg-orange hover:text-ink sm:inline-flex"
            >
              Kontakt
            </a>
            {/* Hamburger (nur Mobile) */}
            <button
              type="button"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <Burger open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Goldene Trennlinie – wächst beim Laden auf */}
        <div
          aria-hidden="true"
          className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-orange to-transparent transition-[width] duration-700 ease-out motion-reduce:transition-none"
          style={{ width: lineGrown ? "100%" : "0%" }}
        />
      </div>

      {/* ---------- Durchlaufende Service-Leiste (fährt beim Scrollen weg) ---------- */}
      <div
        aria-hidden="true"
        className={`overflow-hidden border-b border-white/5 bg-[#211913] transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="group flex overflow-hidden py-2">
          <div className="flex shrink-0 animate-marquee whitespace-nowrap text-[0.72rem] uppercase tracking-[0.22em] text-cream/55 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <MarqueeRun />
            <MarqueeRun />
          </div>
        </div>
      </div>

      {/* ---------- Mobile Fullscreen-Overlay ---------- */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} status={status} />
    </header>
  );
}

/* ----------------------------- Sub-Komponenten ---------------------------- */

function MarqueeRun() {
  // Eine Sequenz; im DOM zweifach gerendert → nahtloser -50%-Loop
  return (
    <>
      {MARQUEE.map((item) => (
        <span key={item} className="mx-5 inline-flex items-center gap-3">
          {item}
          <span className="text-orange">✦</span>
        </span>
      ))}
    </>
  );
}

function NavLink({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={`group relative py-1 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors ${
        active ? "text-orange" : "text-cream/70 hover:text-orange"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-orange transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-6" aria-hidden="true">
      <span
        className={`absolute left-0 h-0.5 w-full rounded bg-cream transition-all duration-300 ${
          open ? "top-1.5 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-cream transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-full rounded bg-cream transition-all duration-300 ${
          open ? "top-1.5 -rotate-45" : "top-3"
        }`}
      />
    </span>
  );
}

function StatusDot({ status }: { status: Status | null }) {
  if (!status) return <span className="h-2 w-2 rounded-full bg-sage" />;
  return (
    <span
      className={`h-2 w-2 rounded-full ${
        status.open ? "bg-[#9BE6A0] animate-pulse-ring" : "bg-[#E6A09B]"
      }`}
    />
  );
}

function StatusLabel({ status }: { status: Status | null }) {
  if (!status) return <span className="opacity-80">Öffnungszeiten ansehen</span>;
  return status.open ? (
    <span>
      <b className="font-semibold text-cream">Jetzt geöffnet</b> · bis {status.until}
    </span>
  ) : (
    <span>
      <b className="font-semibold text-cream">Geschlossen</b> · Di–Fr ab 8:30
    </span>
  );
}

function MobileMenu({
  open,
  onClose,
  activeId,
  status,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  status: Status | null;
}) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ height: "100dvh" }}
    >
      {/* Schließen-Button (X) – oben rechts */}
      <button
        type="button"
        aria-label="Menü schließen"
        onClick={onClose}
        className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 hover:text-orange"
      >
        <span className="relative block h-5 w-5" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 rounded bg-current" />
          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 rounded bg-current" />
        </span>
      </button>

      <nav className="flex h-full flex-col justify-center gap-1 px-8 pt-24" aria-label="Mobile Navigation">
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            aria-current={activeId === l.href.slice(1) ? "true" : undefined}
            className={`flex items-baseline gap-4 py-2 font-serif text-[clamp(1.6rem,1rem+4vw,2.4rem)] transition-all duration-500 hover:text-orange motion-reduce:transition-none ${
              activeId === l.href.slice(1) ? "text-orange" : "text-cream"
            }`}
            style={{
              transitionDelay: open ? `${0.08 + i * 0.06}s` : "0s",
              transform: open ? "translateX(0)" : "translateX(-18px)",
              opacity: open ? 1 : 0,
            }}
          >
            <span className="font-sans text-xs font-semibold tracking-widest text-terra">
              {String(i + 1).padStart(2, "0")}
            </span>
            {l.label}
          </a>
        ))}

        <a
          href="#kontakt"
          onClick={onClose}
          className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-3 rounded-full border border-orange/60 px-6 py-3 font-sans text-base font-semibold text-orange transition-colors duration-200 hover:bg-orange hover:text-ink"
        >
          Einfach vorbeikommen →
        </a>

        <div className="mt-10 font-sans text-sm leading-relaxed text-cream/60">
          <span className="inline-flex items-center gap-2">
            <StatusDot status={status} />
            <StatusLabel status={status} />
          </span>
          <br />
          Grevener Str. 63 · 48149 Münster
          <br />
          <a href="tel:+492515340748" className="text-orange hover:underline">
            0251 5340748
          </a>
        </div>
      </nav>
    </div>
  );
}
