import { NextResponse } from "next/server";

/* Kontaktformular-Endpoint.
   - Server-Validierung + Honeypot (Spam-Schutz)
   - Versand via Resend, sobald RESEND_API_KEY in den Env-Variablen gesetzt ist
     (sonst sicherer Dev-Fallback: Anfrage wird nur geloggt).
   Env (in Vercel → Settings → Environment Variables):
     RESEND_API_KEY   – API-Key von resend.com
     CONTACT_TO       – Empfänger (Default: info@salon-muster.de)
     CONTACT_FROM     – verifizierter Absender (Default unten)            */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // Honeypot – muss leer bleiben
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: Bots füllen das versteckte Feld → still „erfolgreich" abweisen.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const message = (data.message ?? "").trim();

  if (name.length < 2 || !isEmail(email) || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Bitte Name, gültige E-Mail und Nachricht angeben." },
      { status: 422 },
    );
  }

  // Längen-Limits gegen Missbrauch/Header-Injection (Resend nimmt Plaintext).
  if (
    name.length > 120 ||
    email.length > 160 ||
    phone.length > 40 ||
    message.length > 4000
  ) {
    return NextResponse.json(
      { ok: false, error: "Eingaben zu lang." },
      { status: 422 },
    );
  }

  const to = process.env.CONTACT_TO || "info@salon-muster.de";
  const from = process.env.CONTACT_FROM || "Salon Muster <kontakt@salon-muster.de>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `Neue Kontaktanfrage von ${name}`;
  const text =
    `Name: ${name}\n` +
    `E-Mail: ${email}\n` +
    `Telefon: ${phone || "—"}\n\n` +
    `${message}\n`;

  // Dev-Fallback ohne API-Key: nicht versenden, nur loggen.
  if (!apiKey) {
    console.info("[Kontakt] (kein RESEND_API_KEY gesetzt) Anfrage:", {
      name,
      email,
      phone,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, reply_to: email, subject, text }),
    });

    if (!res.ok) {
      console.error("[Kontakt] Resend-Fehler:", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "Senden fehlgeschlagen. Bitte ruf uns an: 01234 567890." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[Kontakt] Netzwerkfehler:", err);
    return NextResponse.json(
      { ok: false, error: "Senden fehlgeschlagen. Bitte ruf uns an: 01234 567890." },
      { status: 502 },
    );
  }
}
