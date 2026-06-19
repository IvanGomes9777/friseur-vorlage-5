"use client";

import Image from "next/image";
import { TEAM, TEAM_LEAD } from "@/data/team";
import { useInView } from "@/lib/useInView";

/* ---------------------------------------------------------------------------
   Hair Power · Team (Sektion 4) — Option 2 "Featured Inhaberin + Team"
   Katja groß mit Zitat, restliches Team als Reihe.
   Hover-Effekt: Foto-Zoom + Graustufen→Farbe + diagonaler Shine-Sweep.
--------------------------------------------------------------------------- */

/** Wiederverwendbarer Shine-Sweep, der bei Hover über das Foto fährt. */
function Shine() {
  return (
    <span className="pointer-events-none absolute top-0 -left-[60%] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 ease-out group-hover:left-[120%] motion-reduce:hidden" />
  );
}

export default function Team() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const reveal = (delay = 0) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section id="team" className="scroll-mt-28 bg-cream px-6 py-9 sm:py-12 lg:px-10">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Kopf */}
        <div {...reveal()}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
            Unser Team
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink">
            „by Katja" – und das ganze Team
          </h2>
        </div>

        {/* Featured: Katja */}
        <div
          {...reveal(80)}
          className={`${reveal(80).className} mt-6 grid gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-cream2 sm:grid-cols-[0.8fr_1.2fr] sm:items-stretch`}
        >
          <div className="group relative aspect-[4/3] overflow-hidden sm:aspect-auto">
            <Image
              src={TEAM_LEAD.image}
              alt={TEAM_LEAD.alt}
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <Shine />
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-terra">
              {TEAM_LEAD.role}
            </p>
            <h3 className="mt-1.5 font-serif text-2xl font-medium text-ink sm:text-3xl">
              {TEAM_LEAD.name}
            </h3>
            <p className="mt-4 border-l-2 border-terra pl-4 font-serif text-lg italic text-brownDark">
              {TEAM_LEAD.quote}
            </p>
          </div>
        </div>

        {/* Team-Reihe */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <article
              key={m.name}
              {...reveal(160 + i * 90)}
              className={`${reveal(160 + i * 90).className} group overflow-hidden rounded-2xl border border-ink/10 bg-cream2 transition-shadow duration-300 hover:shadow-[0_18px_50px_-22px_rgba(42,33,27,0.4)]`}
            >
              <div className="relative h-56 overflow-hidden sm:h-64">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top grayscale-[0.25] transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <Shine />
              </div>
              <div className="p-4">
                <h4 className="font-serif text-lg font-medium text-ink">
                  {m.name}
                </h4>
                <p className="relative inline-block text-sm text-inkSoft">
                  {m.role}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-terra transition-all duration-300 group-hover:w-full" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
