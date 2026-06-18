"use client";

import { useState } from "react";

/* Kontaktformular: Client-Validierung, Pflicht-Datenschutz-Checkbox,
   Friendly-Captcha-Platzhalter (kein reCAPTCHA → DSGVO-freundlich).
   Versand wird später an eine API-Route / Mail-Service angebunden. */

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: an API-Route /api/kontakt anbinden (Mail an info@friseur-hairpower.de)
    setSent(true);
  }

  if (sent) {
    return (
      <div className="grid min-h-[300px] place-items-center rounded-xl bg-cream2 p-8 text-center">
        <div>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-terra text-2xl text-white">
            ✓
          </div>
          <h3 className="mt-4 font-serif text-xl text-ink">Danke!</h3>
          <p className="mt-2 text-sm text-inkSoft">
            Deine Nachricht ist angekommen – wir melden uns. Oder komm einfach
            ohne Termin vorbei.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <Field id="name" label="Name" placeholder="Dein Name" required />
      <Field
        id="email"
        label="E-Mail"
        type="email"
        placeholder="du@beispiel.de"
        required
      />
      <Field id="phone" label="Telefon (optional)" placeholder="0251 …" />
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-semibold text-inkSoft"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Worum geht's?"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:border-transparent focus:outline focus:outline-2 focus:outline-terra"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-inkSoft">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 accent-terra"
        />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz" className="font-semibold text-brownDark underline-offset-2 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          gelesen und bin einverstanden.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-terra px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brownDark"
      >
        Nachricht senden
      </button>

      <p className="text-xs text-inkSoft">
        🔒 Spam-Schutz via Friendly Captcha (datenschutzfreundlich, kein
        reCAPTCHA).
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-inkSoft"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="min-h-[44px] w-full rounded-lg border border-ink/15 bg-white px-3.5 text-sm focus:border-transparent focus:outline focus:outline-2 focus:outline-terra"
      />
    </div>
  );
}
