import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leistungen from "@/components/Leistungen";
import Team from "@/components/Team";
import Bewertungen from "@/components/Bewertungen";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <Leistungen />
      <Team />
      <Bewertungen />

      {/* Anker-Platzhalter für die folgenden Sektionen */}
      {[
        ["galerie", "Galerie"],
        ["kontakt", "Kontakt"],
      ].map(([id, label], i) => (
        <section
          key={id}
          id={id}
          className={`grid min-h-[60svh] scroll-mt-28 place-items-center text-inkSoft ${
            i % 2 ? "bg-cream2" : "bg-cream"
          }`}
        >
          {label} – folgt als nächste Sektion
        </section>
      ))}
    </main>
  );
}
