import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Impressum · Hair Power",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm font-semibold text-terra hover:underline">
        ← Zurück
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">Impressum</h1>

      <div className="mt-4 rounded-xl border border-terra/30 bg-terra/5 p-4 text-sm text-inkSoft">
        <b className="text-brownDark">Entwurf – bitte vor Livegang prüfen lassen.</b>{" "}
        Dieser Text ist auf die tatsächlichen Gegebenheiten zugeschnitten, ersetzt
        aber keine Rechtsberatung. Die mit [eckigen Klammern] markierten Angaben
        bzw. die finale Fassung bitte über einen seriösen Generator (z. B.
        eRecht24) oder die Handwerkskammer/einen Anwalt bestätigen.
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
        <Section title="Angaben gemäß § 5 DDG">
          {SITE.name} – Inhaberin {SITE.owner}
          <br />
          {SITE.street}
          <br />
          {SITE.zip} {SITE.city}
        </Section>

        <Section title="Kontakt">
          Telefon: {SITE.phone}
          <br />
          E-Mail: {SITE.email}
        </Section>

        <Section title="Berufsbezeichnung &amp; berufsrechtliche Regelungen">
          Berufsbezeichnung: Friseurmeisterin (verliehen in Deutschland)
          <br />
          Zuständige Kammer: Handwerkskammer Münster, Bismarckallee 1, 48151
          Münster <span className="text-inkSoft">[bitte bestätigen]</span>
          <br />
          Es gelten die berufsrechtlichen Regelungen der Handwerksordnung (HwO),
          einsehbar unter{" "}
          <a
            href="https://www.gesetze-im-internet.de/hwo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brownDark underline-offset-2 hover:underline"
          >
            gesetze-im-internet.de/hwo
          </a>
          .
        </Section>

        <Section title="Umsatzsteuer-ID">
          <span className="text-inkSoft">
            [USt-IdNr. nach § 27a UStG eintragen – oder, falls Kleinunternehmer
            nach § 19 UStG, diese Zeile entfernen]
          </span>
        </Section>

        <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          {SITE.owner}, Anschrift wie oben.
        </Section>

        <Section title="Verbraucherstreitbeilegung">
          Wir sind nicht verpflichtet und nicht bereit, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </Section>

        <Section title="Haftung für Inhalte">
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Verpflichtungen zur Entfernung oder
          Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          bleiben unberührt; eine Haftung besteht ab dem Zeitpunkt der Kenntnis
          einer konkreten Rechtsverletzung.
        </Section>

        <Section title="Haftung für Links">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets
          der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von
          Rechtsverletzungen entfernen wir derartige Links umgehend.
        </Section>

        <Section title="Urheberrecht">
          Die durch die Betreiberin erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung,
          Bearbeitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechts bedürfen der schriftlichen Zustimmung.
        </Section>
      </div>

      <p className="mt-10 text-xs text-inkSoft">
        Hinweis: Kein Verweis mehr auf die EU-OS-Plattform (zum 20.07.2025
        eingestellt). Normzitate auf aktuellem Stand (§ 5 DDG, TDDDG).
      </p>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-semibold text-ink" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="mt-2 text-inkSoft">{children}</p>
    </section>
  );
}
