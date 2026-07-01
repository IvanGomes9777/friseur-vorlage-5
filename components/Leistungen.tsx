"use client";

import { useEffect, useState } from "react";
import {
  SERVICE_CATEGORIES,
  OCCASIONS,
  type PriceItem,
} from "@/data/services";
import { useInView } from "@/lib/useInView";

/* ---------------------------------------------------------------------------
   Salon Muster · Leistungen (Sektion 3) — Option 1 "Tabbed Preisliste"
   Tabs Damen/Herren/Kinder · Leader-Dots · Gruppen je Tab ·
   Anlässe/Hochzeit-Block · Scroll-Reveal · datengetrieben aus data/services.ts
--------------------------------------------------------------------------- */

export default function Leistungen() {
  const [active, setActive] = useState(SERVICE_CATEGORIES[0].id);
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const cat = SERVICE_CATEGORIES.find((c) => c.id === active)!;

  // Deep-Link: #leistungen-<kategorie> (z. B. aus den Hero-Chips) öffnet den
  // passenden Tab und scrollt hierher – beim Laden und bei jeder Hash-Änderung.
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace(/^#/, "");
      const prefix = "leistungen-";
      if (!h.startsWith(prefix)) return;
      const id = h.slice(prefix.length);
      if (!SERVICE_CATEGORIES.some((c) => c.id === id)) return;
      setActive(id);
      requestAnimationFrame(() =>
        document
          .getElementById("leistungen")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`;

  return (
    <section id="leistungen" className="scroll-mt-28 bg-cream2 px-6 py-14 sm:py-20">
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Kopf */}
        <div className={reveal()}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
            Unsere Leistungen
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink">
            Klare Preise, ehrlich kalkuliert.
          </h2>
          <p className="mt-3 max-w-[52ch] text-inkSoft">
            Friseurmeisterbetrieb in der Innenstadt – komm einfach ohne Termin
            vorbei.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Leistungs-Kategorien"
          className={`mt-7 inline-flex flex-wrap gap-1.5 rounded-full bg-cream p-1.5 ${reveal()}`}
          style={{ transitionDelay: "80ms" }}
        >
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                active === c.id
                  ? "bg-white text-ink shadow-[0_4px_14px_-8px_rgba(42,33,27,0.5)]"
                  : "text-inkSoft hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Panel (re-mountet bei Tab-Wechsel → fade-in) */}
        <div key={active} className="mt-8 animate-fade-in">
          {cat.intro && (
            <p className="mb-7 max-w-[58ch] font-serif text-lg italic text-brownDark">
              {cat.intro}
            </p>
          )}

          <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {cat.groups.map((g, gi) => (
              <div key={gi} className={cat.groups.length === 1 ? "sm:col-span-2" : ""}>
                {g.title && (
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-terra">
                    {g.title}
                  </h3>
                )}
                <div>
                  {g.items.map((item) => (
                    <Row key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {cat.infoBox && (
            <div className="mt-8 rounded-2xl border border-terra/25 bg-terra/5 p-6 sm:p-7">
              <h3 className="font-serif text-lg font-medium text-ink">
                {cat.infoBox.title}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {cat.infoBox.items.map((it) => (
                  <div key={it.heading}>
                    <p className="text-sm font-semibold text-brownDark">
                      {it.heading}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-inkSoft">
                      {it.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-inkSoft">
                Entspann dich, während wir uns nach allen Regeln der Kunst um
                dein Haar kümmern – ganz ohne Termin.
              </p>
            </div>
          )}

          <p className="mt-8 text-sm text-inkSoft">
            „ab"-Preise sind Richtwerte – der genaue Preis hängt von Haarlänge
            &amp; Aufwand ab. Wir beraten Dich gerne vorab.
          </p>
        </div>

        {/* Anlässe / Hochzeit */}
        <div
          className={`mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-brown to-brownDark p-7 text-cream sm:p-9 ${reveal()}`}
          style={{ transitionDelay: "120ms" }}
        >
          <div className="grid items-center gap-7 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                {OCCASIONS.kicker}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium sm:text-3xl">
                {OCCASIONS.title}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-cream/85">
                {OCCASIONS.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
              <p className="font-serif text-lg">{OCCASIONS.priceHint}</p>
              <a
                href="#kontakt"
                className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-cream px-6 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03]"
              >
                Beratung anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ name, price, note }: PriceItem) {
  return (
    <div className="flex items-baseline gap-3 border-b border-dashed border-ink/15 py-2.5">
      <span className="font-medium text-ink">
        {name}
        {note && (
          <span className="block text-xs font-normal text-inkSoft">{note}</span>
        )}
      </span>
      <span
        aria-hidden="true"
        className="-translate-y-1 flex-1 border-b border-dotted border-ink/25"
      />
      <span className="whitespace-nowrap font-semibold tabular-nums text-brownDark">
        {price}
      </span>
    </div>
  );
}
