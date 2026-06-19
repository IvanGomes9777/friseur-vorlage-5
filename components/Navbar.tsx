"use client";

import { useEffect, useState } from "react";
import { computeStatus, type OpenStatus } from "@/lib/openingHours";

/* ---------------------------------------------------------------------------
   Hair Power · Navbar
   Desktop (≥ lg): Option 1 – Utility-Bar + zentriertes Wortmark + Shrink-on-Scroll
                   + "Termin buchen"-Button
   Mobile (< lg) : Option 5 – Hamburger öffnet warmes Fullscreen-Overlay
   100% responsiv · Touch-Targets ≥ 44px · dvh-Höhen · fluide Typo
--------------------------------------------------------------------------- */

const LINKS = [
  { label: "Über uns", href: "#ueber" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Team", href: "#team" },
  { label: "Galerie", href: "#galerie" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Kontakt", href: "#kontakt" },
];

type Status = OpenStatus;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  // Status erst nach Mount setzen → keine Hydration-Mismatches
  useEffect(() => {
    setStatus(computeStatus(new Date()));
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Scroll-Spy: aktive Sektion im Menü hervorheben
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

  return (
    <header className="sticky top-0 z-50">
      {/* ---------- Utility-Bar ---------- */}
      <div className="bg-brown text-[0.78rem] tracking-wide text-cream/90">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 lg:px-10">
          <span className="inline-flex items-center gap-2">
            <StatusDot status={status} />
            <StatusLabel status={status} />
          </span>
          <span className="hidden sm:inline">📍 Grevener Str. 63, Kreuzviertel</span>
          <a
            href="tel:+492515340748"
            className="font-semibold text-white hover:underline"
          >
            0251 5340748
          </a>
          <span className="hidden md:inline">
            Friseur <b className="font-semibold text-white">ohne Termin</b>
          </span>
        </div>
      </div>

      {/* ---------- Hauptnavigation ---------- */}
      <nav
        aria-label="Hauptnavigation"
        className={`bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_-16px_rgba(42,33,27,0.45)]" : ""
        }`}
      >
        <div
          className={`mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-4 px-5 transition-all duration-300 lg:grid-cols-3 lg:px-10 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          {/* Links (nur Desktop) */}
          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.slice(0, 3).map((l) => (
              <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
            ))}
          </div>

          {/* Logo – mobil links, ab lg zentriert */}
          <a href="#top" className="justify-self-start lg:col-start-2 lg:justify-self-center">
            <Wordmark scrolled={scrolled} />
          </a>

          {/* Rechte Seite */}
          <div className="flex items-center justify-end gap-5 lg:col-start-3">
            <div className="hidden items-center gap-7 lg:flex">
              {LINKS.slice(3).map((l) => (
                <NavLink key={l.href} {...l} active={activeId === l.href.slice(1)} />
              ))}
            </div>
            <a
              href="#kontakt"
              className="hidden min-h-[44px] items-center rounded-xl bg-ink px-5 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-terra sm:inline-flex"
            >
              Termin buchen
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
      </nav>

      {/* ---------- Mobile Fullscreen-Overlay ---------- */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </header>
  );
}

/* ----------------------------- Sub-Komponenten ---------------------------- */

function Wordmark({ scrolled }: { scrolled: boolean }) {
  return (
    <span className="block leading-none">
      <span
        className={`block font-serif font-semibold tracking-[0.04em] text-ink transition-all duration-300 ${
          scrolled ? "text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        HAIR POWER
      </span>
      <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.34em] text-terra">
        The Art of Hair Power
      </span>
    </span>
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
      className={`group relative py-1 text-[0.95rem] font-medium transition-colors ${
        active ? "text-ink" : "text-ink/70 hover:text-ink"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-0.5 bg-terra transition-all duration-300 ${
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
        className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
          open ? "top-1.5 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
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
      <b className="font-semibold text-white">Jetzt geöffnet</b> · bis {status.until}
    </span>
  ) : (
    <span>
      <b className="font-semibold text-white">Geschlossen</b> · Di–Fr ab 8:30
    </span>
  );
}

function MobileMenu({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
}) {
  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ height: "100dvh" }}
    >
      <nav className="flex h-full flex-col justify-center gap-1 px-8 pt-24">
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            aria-current={activeId === l.href.slice(1) ? "true" : undefined}
            className={`flex items-baseline gap-4 py-2 font-serif text-[clamp(1.6rem,1rem+4vw,2.4rem)] transition-all duration-500 hover:text-orange ${
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
          className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-3 rounded-xl bg-terra px-6 py-3 font-sans text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
        >
          Termin buchen →
        </a>
        <div className="mt-10 font-sans text-sm leading-relaxed text-cream/60">
          Grevener Str. 63 · 48149 Münster
          <br />
          <a href="tel:+492515340748" className="hover:text-cream">
            0251 5340748
          </a>
        </div>
      </nav>
    </div>
  );
}
