import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main id="top">
      <Navbar />

      {/* Platzhalter-Hero, damit die Navbar im Kontext / beim Scrollen sichtbar ist.
          Die echte Hero-Section bauen wir als nächste Sektion. */}
      <section className="grid min-h-[70svh] place-items-center bg-gradient-to-b from-cream to-cream2 px-6 text-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-terra">
            Friseurmeisterbetrieb · Münster Kreuzviertel
          </p>
          <h1 className="mx-auto max-w-[18ch] font-serif text-[clamp(1.8rem,1rem+4vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-ink">
            Frisuren für Dich – ehrlich, typgerecht, Kreuzviertel.
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-inkSoft">
            Meisterbetrieb seit über 15 Jahren. Friseur ohne Termin – einfach
            vorbeikommen.
          </p>
        </div>
      </section>

      {/* Anker-Platzhalter für die folgenden Sektionen */}
      {[
        ["leistungen", "Leistungen"],
        ["team", "Team"],
        ["galerie", "Galerie"],
        ["bewertungen", "Bewertungen"],
        ["kontakt", "Kontakt"],
      ].map(([id, label], i) => (
        <section
          key={id}
          id={id}
          className={`grid min-h-[60svh] place-items-center text-inkSoft ${
            i % 2 ? "bg-cream" : "bg-cream2"
          }`}
        >
          {label} – folgt als nächste Sektion
        </section>
      ))}
    </main>
  );
}
