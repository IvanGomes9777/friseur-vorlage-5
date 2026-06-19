"use client";

import { useState } from "react";
import { FAQS } from "@/data/faq";
import { useInView } from "@/lib/useInView";

/* Hair Power · FAQ (letzte Sektion vor dem Footer).
   Akkordeon (zugänglich) + FAQPage-Schema für Rich Results. */

export default function FAQ() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-cream px-6 py-14 sm:py-20 lg:px-10">
      <FaqJsonLd />
      <div
        ref={ref}
        className={`mx-auto max-w-5xl transition-all duration-700 ease-out motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
          Häufige Fragen
        </p>
        <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink">
          Gut zu wissen
        </h2>

        <div className="mt-8 border-y border-ink/10">
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
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-serif text-lg font-medium text-ink"
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
                    <p className="pb-5 text-inkSoft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-inkSoft">
          Noch eine Frage?{" "}
          <a
            href="#kontakt"
            className="font-semibold text-brownDark underline-offset-2 hover:underline"
          >
            Schreib uns
          </a>{" "}
          oder ruf an:{" "}
          <a href="tel:+492515340748" className="font-semibold text-brownDark underline-offset-2 hover:underline">
            0251 5340748
          </a>
          .
        </p>
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
