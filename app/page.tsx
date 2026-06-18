import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />

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
