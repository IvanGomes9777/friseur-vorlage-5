"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

/* ---------------------------------------------------------------------------
   Salon Muster · Über uns (Sektion 3) — Mix aus Konzept 34 + 35
   Aufbau & Text von #34: Kennzahlen, die hochzählen (Odometer) + Werte-Marquee.
   Effekt von #35: Cursor-Bilderspur aus echten Salon-/Team-Fotos im Hintergrund.
   Dunkle Bühne (kohärent zu Navbar/Hero) · GPU-only · prefers-reduced-motion.
--------------------------------------------------------------------------- */

const STATS: { to: number; suffix: string; dec: number; label: string }[] = [
  { to: 15, suffix: "+", dec: 0, label: "Jahre Meisterbetrieb" },
  { to: 254, suffix: "", dec: 0, label: "Google-Bewertungen" },
  { to: 4.3, suffix: " ★", dec: 1, label: "Schnitt aus 254 Rezensionen" },
];

const VALUES = [
  "Meisterhandwerk",
  "Ohne Termine",
  "Faire Preise",
  "Natürlich schön",
  "Persönliche Beratung",
  "Barrierefrei",
];

// Beispiel-Bilder (Web-Platzhalter) für die Cursor-Spur
const TRAIL = [
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=70",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=750&q=70",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=750&q=70",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=750&q=70",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=70",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=600&q=70",
];

const EO = "cubic-bezier(0.23,1,0.32,1)";

export default function UeberUns() {
  const { ref: statsRef, inView } = useInView<HTMLDivElement>(0.4);
  const sectionRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // Cursor-Bilderspur (#35) – distanz-basiert, nur Maus & ohne reduce-motion
  useEffect(() => {
    const host = sectionRef.current;
    const layer = trailRef.current;
    if (!host || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const pool = [...TRAIL, ...TRAIL].map((src) => {
      const im = document.createElement("img");
      im.src = src;
      im.alt = "";
      im.setAttribute("aria-hidden", "true");
      im.draggable = false;
      im.className =
        "pointer-events-none absolute h-40 w-32 rounded-xl object-cover shadow-2xl will-change-transform";
      im.style.opacity = "0";
      im.style.transform = "translate(-50%,-50%) scale(.7)";
      layer.appendChild(im);
      return im;
    });

    let idx = 0;
    let lx: number | null = null;
    let ly: number | null = null;
    const STEP = 55;

    const spawn = (x: number, y: number) => {
      const im = pool[idx % pool.length];
      idx++;
      im.style.left = `${x}px`;
      im.style.top = `${y}px`;
      im.style.transition = "none";
      im.style.opacity = "1";
      im.style.transform = `translate(-50%,-50%) scale(1) rotate(${(Math.random() * 12 - 6).toFixed(1)}deg)`;
      void im.offsetWidth; // Reflow → Transition greift sicher
      im.style.transition = `opacity .9s ${EO}, transform .9s ${EO}`;
      im.style.opacity = "0";
      im.style.transform = "translate(-50%,-50%) scale(.72)";
    };

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (lx === null || ly === null) {
        lx = x;
        ly = y;
        spawn(x, y);
        return;
      }
      const dx = x - lx;
      const dy = y - ly;
      const dist = Math.hypot(dx, dy);
      if (dist >= STEP) {
        const steps = Math.min(4, Math.floor(dist / STEP));
        for (let i = 1; i <= steps; i++) spawn(lx + dx * (i / steps), ly + dy * (i / steps));
        lx = x;
        ly = y;
      }
    };

    host.addEventListener("mousemove", onMove);
    return () => {
      host.removeEventListener("mousemove", onMove);
      pool.forEach((im) => im.remove());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ueber"
      className="relative scroll-mt-28 overflow-hidden bg-ink px-6 py-20 text-cream sm:py-24 lg:px-10"
    >
      {/* Cursor-Bilderspur-Ebene (hinter dem Inhalt) */}
      <div ref={trailRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-screen-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
          Worauf ihr euch verlasst
        </p>
        <h2 className="mx-auto mt-3 max-w-[22ch] font-serif text-[clamp(1.7rem,1rem+2.6vw,2.8rem)] font-medium leading-tight">
          Zahlen, die für sich sprechen
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] font-serif text-lg italic text-orange/90">
          „Style zu Mensch, passender Look und Zufriedenheit."
        </p>

        {/* Odometer-Kennzahlen */}
        <div ref={statsRef} className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[clamp(2.6rem,8vw,4.4rem)] font-semibold leading-none tabular-nums text-orange">
                <Counter to={s.to} dec={s.dec} run={inView} />
                {s.suffix}
              </div>
              <p className="mt-3 text-sm text-cream/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Werte-Marquee */}
      <div className="relative z-10 mt-16 overflow-hidden border-y border-white/10 py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-serif text-xl italic text-cream/45 motion-reduce:animate-none">
          <ValueRun />
          <ValueRun />
        </div>
      </div>

      <p className="relative z-10 mt-6 text-center text-xs text-cream/40 motion-reduce:hidden">
        ↗ Beweg die Maus über diesen Bereich
      </p>
    </section>
  );
}

function ValueRun() {
  return (
    <>
      {VALUES.map((v) => (
        <span key={v} className="mx-6 inline-flex items-center gap-3">
          {v}
          <span className="text-orange/70">✦</span>
        </span>
      ))}
    </>
  );
}

function Counter({ to, dec, run }: { to: number; dec: number; run: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / 1300, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return <>{val.toFixed(dec).replace(".", ",")}</>;
}
