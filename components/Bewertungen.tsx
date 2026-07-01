"use client";

import { REVIEWS_A, REVIEWS_B, REVIEW_META, type Review } from "@/data/reviews";
import { useInView } from "@/lib/useInView";

/* ---------------------------------------------------------------------------
   Salon Muster · Bewertungen (Sektion 5) — Option 3 "Marquee-Wall"
   Zwei endlos laufende Reihen (Hover pausiert), Rating-Block + CTA-Button
   zum Bewerten (Google). Reduced-Motion: Animation aus.
--------------------------------------------------------------------------- */

export default function Bewertungen() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const reveal = (delay = 0) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      id="bewertungen"
      className="scroll-mt-28 overflow-hidden bg-cream2 py-14 sm:py-20"
    >
      {/* Kopf + Rating + CTA */}
      <div
        ref={ref}
        className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6"
      >
        <div {...reveal()}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
            Was unsere Gäste sagen
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink">
            Eure Gäste lieben Salon Muster
          </h2>
        </div>

        <div {...reveal(80)} className={`${reveal(80).className} flex items-center gap-5`}>
          <div className="flex items-center gap-3">
            <span className="font-serif text-4xl font-semibold text-brownDark">
              {REVIEW_META.rating}
            </span>
            <div>
              <Stars />
              <p className="text-sm text-inkSoft">
                {REVIEW_META.count} Google-Bewertungen
              </p>
            </div>
          </div>
          <a
            href={REVIEW_META.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-terra"
          >
            <StarIcon /> Bewertung abgeben
          </a>
        </div>
      </div>

      {/* Laufband-Reihen (volle Breite) */}
      <div className="group mt-8 flex flex-col gap-4">
        <Row items={REVIEWS_A} />
        <Row items={REVIEWS_B} reverse />
      </div>

      {/* Footer-Link */}
      <div className="mx-auto mt-8 max-w-6xl px-6 text-center">
        <a
          href={REVIEW_META.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brownDark underline-offset-4 hover:underline"
        >
          Alle Bewertungen auf Google ansehen →
        </a>
      </div>
    </section>
  );
}

function Row({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  // Verdoppeln für nahtlose Endlos-Schleife (-50% Translate).
  const list = [...items, ...items];
  return (
    <div
      className={`flex w-max gap-4 ${
        reverse ? "animate-marquee-rev" : "animate-marquee"
      } group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
    >
      {list.map((r, i) => (
        <ReviewCard key={i} {...r} />
      ))}
    </div>
  );
}

function ReviewCard({ text, name, when }: Review) {
  return (
    <figure className="flex w-[300px] flex-none flex-col rounded-2xl border border-ink/10 bg-cream p-5">
      <Stars />
      <blockquote className="mt-3 grow text-sm leading-relaxed text-ink">
        „{text}"
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-terra text-sm font-bold text-white">
          {name.charAt(0)}
        </span>
        <span className="text-sm">
          <b className="font-semibold text-ink">{name}</b>
          <span className="block text-xs text-inkSoft">
            Google{when ? ` · ${when}` : ""}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <span className="text-[#F0A500]" aria-label="5 von 5 Sternen">
      {"★★★★★"}
    </span>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}
