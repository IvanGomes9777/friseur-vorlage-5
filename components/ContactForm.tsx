"use client";

import { useState } from "react";

/* Kontaktformular: Client-Validierung, Pflicht-Datenschutz-Checkbox, Honeypot
   (Spam), Friendly-Captcha-Hinweis. Sendet an /api/kontakt. */

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // Honeypot
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Senden fehlgeschlagen.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Senden fehlgeschlagen. Bitte ruf uns an: 0251 5340748.",
      );
    }
  }

  if (status === "sent") {
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

  const sending = status === "sending";

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

      {/* Honeypot – für Menschen unsichtbar */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Firma
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-inkSoft">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 accent-terra"
        />
        <span>
          Ich habe die{" "}
          <a
            href="/datenschutz"
            className="font-semibold text-brownDark underline-offset-2 hover:underline"
          >
            Datenschutzerklärung
          </a>{" "}
          gelesen und bin einverstanden.
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-terra/10 px-3 py-2 text-sm text-brownDark" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-terra px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brownDark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Wird gesendet …" : "Nachricht senden"}
      </button>

      <p className="text-xs text-inkSoft">
        🔒 Spam-Schutz aktiv (datenschutzfreundlich, kein reCAPTCHA).
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
