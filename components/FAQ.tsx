"use client";

import { useState } from "react";
import { FAQS } from "@/data/faq";
import { useInView } from "@/lib/useInView";

/* ---------------------------------------------------------------------------
   Salon Muster · FAQ (Sektion 9) — Konzept 05 "Split mit Intro/CTA"
   Links bleibt eine Einladung + Walk-In-CTA stehen (sticky), rechts das
   zugängliche Accordion. FAQPage-Schema für Rich Results bleibt erhalten.
--------------------------------------------------------------------------- */

export default function FAQ() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [open, setOpen] = useState<number | null>(0);

  const reveal = (delay = 0) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section id="faq" className="scroll-mt-28 bg-cream2 px-6 py-9 sm:py-12 lg:px-10">
      <FaqJsonLd />
      <div ref={ref} className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        {/* Linke Seite: Intro + CTA (sticky) */}
        <div className="md:sticky md:top-8 md:self-start">
          <p {...reveal()} className={`${reveal().className} text-xs font-semibold uppercase tracking-[0.22em] text-terra`}>
            Häufige Fragen
          </p>
          <h2
            {...reveal(80)}
            className={`${reveal(80).className} mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink`}
          >
            Alles, was du wissen musst.
          </h2>
          <p {...reveal(140)} className={`${reveal(140).className} mt-4 max-w-[40ch] text-inkSoft`}>
            Und wenn deine Frage nicht dabei ist: Komm einfach vorbei – ganz ohne
            Termin – oder ruf uns an.
          </p>
          <div {...reveal(200)} className={`${reveal(200).className} mt-5 flex flex-wrap gap-3`}>
            <a
              href="#kontakt"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-terra px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brownDark"
            >
              Vorbeikommen
            </a>
            <a
              href="tel:+491234567890"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-ink/15 px-6 font-semibold text-ink transition-colors duration-200 hover:bg-ink/5"
            >
              01234 567890
            </a>
          </div>
        </div>

        {/* Rechte Seite: Accordion */}
        <div {...reveal(120)} className={`${reveal(120).className} border-y border-ink/10`}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-ink/10 last:border-b-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left font-serif text-lg font-medium text-ink"
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-xl text-terra transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      ＋
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-inkSoft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
