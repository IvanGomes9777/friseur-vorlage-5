"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";

/* Hair Power · Über uns / "Wer wir sind" (nach Hero).
   Inhalt verdichtet aus dem Salon-Text. Foto: Salon-Fassade.
   Drei Zielgruppen-Karten + USP-Badges. */

const USPS = ["Meisterbetrieb", "Ohne Termine", "Faire Preise", "Barrierefrei"];

const AUDIENCES = [
  {
    icon: "🚲",
    title: "Junge Leute & Studenten",
    text: "Ohne Termin – komm einfach mit der Leeze vorbei. Coole Farben, Schnitte und persönliche Beratung zu erschwinglichen Preisen.",
  },
  {
    icon: "👵",
    title: "Seniorinnen & Senioren",
    text: "Ebenerdiger Eingang an der Catharina-Müller-Str., kurze Wartezeiten ohne Anmeldung und Bushaltestellen direkt vor der Tür.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Für Jung & Alt",
    text: "Die Frisur kennt keine Generationsgrenze – typgerechte Looks für die ganze Familie, fair kalkuliert.",
  },
];

export default function UeberUns() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const reveal = (delay = 0) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section id="ueber" className="scroll-mt-28 bg-cream px-6 py-14 sm:py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Foto */}
          <div {...reveal()} className={`${reveal().className} relative`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_18px_50px_-22px_rgba(42,33,27,0.4)]">
              <Image
                src="/salon/salon-facade.png"
                alt="Hair Power Salon im York Center am Kreuzviertel, Münster"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {USPS.map((u) => (
                <span
                  key={u}
                  className="rounded-full bg-cream2 px-3.5 py-1.5 text-xs font-semibold text-brownDark"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <p {...reveal(60)} className={`${reveal(60).className} text-xs font-semibold uppercase tracking-[0.22em] text-terra`}>
              Wer wir sind
            </p>
            <h2
              {...reveal(120)}
              className={`${reveal(120).className} mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink`}
            >
              Friseurmeisterbetrieb im Kreuzviertel – ohne Termine
            </h2>
            <p {...reveal(180)} className={`${reveal(180).className} mt-4 font-serif text-lg italic text-brownDark`}>
              „Style zu Mensch, passender Look und Zufriedenheit."
            </p>
            <div {...reveal(240)} className={`${reveal(240).className} mt-4 space-y-4 text-inkSoft`}>
              <p>
                Dein Friseur Hair Power im York Center am Kreuzviertel ist
                zentral gelegen, gemütlich und entspannend – und weit mehr als
                ein Salon. Hier bekommst du den Kopf frei. Wir stehen für
                Qualität, Authentizität und die fachliche Kunst des Schneidens,
                Färbens und Verwöhnens – mit persönlicher Beratung, die deine
                Wünsche in den Mittelpunkt stellt.
              </p>
              <p>
                Als Expertinnen und Experten für Haarpflege und natürliche
                Highlights begeistern wir uns für Schnitte für langes, dünnes und
                lockiges Haar. Für Herren lieben wir die traditionelle,
                geradlinige Herrenfrisur. Moderner und klassischer Stil
                harmonieren – einfach, natürlich, frisch und elegant.
              </p>
            </div>
          </div>
        </div>

        {/* Zielgruppen-Karten */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <article
              key={a.title}
              {...reveal(120 + i * 90)}
              className={`${reveal(120 + i * 90).className} rounded-2xl border border-ink/10 bg-cream2 p-6`}
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-xl bg-terra/14 text-xl"
              >
                {a.icon}
              </span>
              <h3 className="mt-3 font-serif text-lg font-medium text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-inkSoft">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
