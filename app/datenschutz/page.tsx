import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung · Salon Muster",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm font-semibold text-terra hover:underline">
        ← Zurück
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">
        Datenschutzerklärung
      </h1>

      <div className="mt-4 rounded-xl border border-terra/30 bg-terra/5 p-4 text-sm text-inkSoft">
        <b className="text-brownDark">Entwurf – vor Livegang prüfen lassen.</b>{" "}
        Dieser Text bildet die <i>tatsächlich</i> eingesetzten Dienste dieser
        Website ab (Stand der Entwicklung). Die finale, rechtsverbindliche
        Fassung bitte über einen seriösen Generator (z. B. eRecht24 /
        datenschutz-generator.de) erstellen bzw. anwaltlich prüfen lassen. Keine
        Rechtsberatung.
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink">
        <Section title="1. Verantwortlicher">
          {SITE.name} – {SITE.owner}
          <br />
          {SITE.street}, {SITE.zip} {SITE.city}
          <br />
          Telefon: {SITE.phone} · E-Mail: {SITE.email}
        </Section>

        <Section title="2. Hosting (Vercel)">
          Diese Website wird bei der Vercel Inc. (USA) gehostet. Beim Aufruf
          werden technisch notwendige Daten (u. a. IP-Adresse) verarbeitet, um
          die Seite auszuliefern und die Sicherheit zu gewährleisten
          (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse). Mit dem Anbieter
          besteht ein Auftragsverarbeitungsvertrag (DPA). Eine Übermittlung in
          die USA wird über das EU-US Data Privacy Framework bzw.
          Standardvertragsklauseln abgesichert.
        </Section>

        <Section title="3. Server-Logfiles">
          Der Hoster erhebt automatisch Informationen in Server-Logfiles:
          IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Referrer, Browser- und
          Betriebssystem-Daten. Diese Daten sind für den sicheren Betrieb
          erforderlich (Art. 6 Abs. 1 lit. f DSGVO) und werden nach kurzer Zeit
          gelöscht.
        </Section>

        <Section title="4. Kontaktformular & E-Mail">
          Wenn du uns über das Formular oder per E-Mail kontaktierst, verarbeiten
          wir die angegebenen Daten (Name, E-Mail, optional Telefon, Nachricht)
          zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Für
          den E-Mail-Versand setzen wir den Dienstleister Resend (Auftrags-
          verarbeiter, ggf. USA) ein. Die Daten werden gelöscht, sobald sie nicht
          mehr erforderlich sind, und nicht ohne deine Einwilligung an Dritte für
          Werbezwecke weitergegeben.
        </Section>

        <Section title="5. Schriftarten (lokal gehostet)">
          Wir nutzen Schriftarten über <code>next/font</code>; diese werden zur
          Build-Zeit lokal mit ausgeliefert. Es findet <b>keine</b> Verbindung zu
          Google-Servern statt.
        </Section>

        <Section title="6. Google Maps (Klick zum Laden)">
          Die Karte wird erst nach deinem aktiven Klick geladen
          (Einwilligung, Art. 6 Abs. 1 lit. a DSGVO). Vorher werden keine Daten
          an Google übertragen. Mit dem Laden können Daten an Google Ireland Ltd.
          bzw. Google LLC (USA) übermittelt werden. Deine Einwilligung ist
          freiwillig und kann widerrufen werden.
        </Section>

        <Section title="7. Google-Bewertungen">
          Wir verlinken lediglich auf unser öffentliches Google-Profil. Es findet
          keine Einbettung mit Tracking statt; ein Datenabruf erfolgt erst, wenn
          du dem Link folgst.
        </Section>

        <Section title="8. Cookies / Zugriff auf Endgeräte (§ 25 TDDDG)">
          Diese Website setzt <b>keine</b> Tracking- oder Marketing-Cookies und
          bindet keine Analyse-Dienste ein. Es werden nur technisch notwendige
          Informationen verarbeitet. Daher ist kein Einwilligungs-Banner
          erforderlich. (Hinweis: Die <i>alte</i> Website nutzte Google Analytics
          und AdSense – beides entfällt hier bewusst.)
        </Section>

        <Section title="9. Deine Rechte">
          Du hast das Recht auf Auskunft (Art. 15), Berichtigung (16), Löschung
          (17), Einschränkung (18), Datenübertragbarkeit (20) sowie Widerspruch
          (21) und Widerruf erteilter Einwilligungen. Zudem besteht ein
          Beschwerderecht bei der für dich zuständigen
          Datenschutz-Aufsichtsbehörde.
        </Section>

        <Section title="10. Stand & Aktualität">
          Wird ein weiterer Dienst (z. B. Instagram-Einbettung, Buchungstool)
          ergänzt, ist diese Erklärung entsprechend anzupassen.
        </Section>
      </div>
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
      <h2 className="font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-inkSoft">{children}</p>
    </section>
  );
}
