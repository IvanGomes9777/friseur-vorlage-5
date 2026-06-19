import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UeberUns from "@/components/UeberUns";
import Leistungen from "@/components/Leistungen";
import Team from "@/components/Team";
import Bewertungen from "@/components/Bewertungen";
import Galerie from "@/components/Galerie";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <main id="top">
      <JsonLd />
      <Navbar />
      <Hero />
      <UeberUns />
      <Leistungen />
      <Team />
      <Bewertungen />
      <Galerie />
      <Kontakt />
      <Footer />
    </main>
  );
}
