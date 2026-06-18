import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Leistungen from "@/components/Leistungen";
import Team from "@/components/Team";
import Bewertungen from "@/components/Bewertungen";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Navbar />
      <Hero />
      <Leistungen />
      <Team />
      <Bewertungen />

      {/* Galerie folgt als nächste Sektion */}
      <section
        id="galerie"
        className="grid min-h-[60svh] scroll-mt-28 place-items-center bg-cream text-inkSoft"
      >
        Galerie – folgt als nächste Sektion
      </section>

      <Kontakt />
      <Footer />
    </main>
  );
}
