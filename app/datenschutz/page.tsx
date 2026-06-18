import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung · Hair Power",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/" className="text-sm font-semibold text-terra hover:underline">
        ← Zurück
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">
        Datenschutzerklärung
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-semibold">Verantwortlicher</h2>
          <p className="mt-2 text-inkSoft">
            {SITE.name} – {SITE.owner}, {SITE.street}, {SITE.zip} {SITE.city} ·{" "}
            {SITE.email}
          </p>
        </section>

        <section>
          <h2 className="font-semibold">Auf dieser Website eingesetzt</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-inkSoft">
            <li>
              <b>Hosting / Server-Logs</b> (Art. 6 Abs. 1 lit. f) – technisch
              notwendig.
            </li>
            <li>
              <b>Schriftarten</b> – lokal via <code>next/font</code> gehostet,
              kein Google-Request.
            </li>
            <li>
              <b>Kontaktformular</b> – zur Bearbeitung deiner Anfrage (Art. 6
              Abs. 1 lit. b/f).
            </li>
            <li>
              <b>Google Maps</b> – wird <i>erst nach aktivem Klick</i> geladen
              (Consent), kein vorheriger Datenabruf.
            </li>
            <li>
              <b>Google-Bewertungen</b> – Verlinkung auf das Google-Profil
              (kein eingebettetes Tracking).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold">Deine Rechte</h2>
          <p className="mt-2 text-inkSoft">
            Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
            Widerspruch sowie Beschwerde bei einer Aufsichtsbehörde.
          </p>
        </section>

        <section className="rounded-xl border border-terra/30 bg-terra/5 p-4 text-inkSoft">
          <p className="font-semibold text-brownDark">
            ⚠️ Entwurf – finale Fassung über Generator/Anwalt
          </p>
          <p className="mt-2">
            Die vollständige, rechtsverbindliche Datenschutzerklärung wird vor
            dem Livegang über einen seriösen Generator (z. B. eRecht24 /
            datenschutz-generator.de) erstellt und exakt an die tatsächlich
            eingesetzten Dienste angepasst. Keine Rechtsberatung.
          </p>
        </section>
      </div>
    </main>
  );
}
