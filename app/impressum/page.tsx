import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Impressum · Hair Power",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/" className="text-sm font-semibold text-terra hover:underline">
        ← Zurück
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">Impressum</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-semibold">Angaben gemäß § 5 DDG</h2>
          <p className="mt-2 text-inkSoft">
            {SITE.name} – Inhaberin {SITE.owner}
            <br />
            {SITE.street}
            <br />
            {SITE.zip} {SITE.city}
          </p>
        </section>

        <section>
          <h2 className="font-semibold">Kontakt</h2>
          <p className="mt-2 text-inkSoft">
            Telefon: {SITE.phone}
            <br />
            E-Mail: {SITE.email}
          </p>
        </section>

        <section className="rounded-xl border border-terra/30 bg-terra/5 p-4 text-inkSoft">
          <p className="font-semibold text-brownDark">
            ⚠️ Entwurf – noch zu vervollständigen
          </p>
          <p className="mt-2">
            Vor dem Livegang ergänzt der Betreiber die pflichtigen Angaben über
            einen seriösen Generator (z. B. eRecht24) bzw. mit der zuständigen
            Kammer: u. a. <b>Handwerkskammer Münster</b> (zuständige Kammer),
            Berufsbezeichnung „Friseurmeisterin" (verliehen in Deutschland),
            ggf. Umsatzsteuer-ID nach § 27a UStG sowie der Verweis auf die
            berufsrechtlichen Regelungen. Diese Seite ist keine Rechtsberatung.
          </p>
        </section>
      </div>
    </main>
  );
}
