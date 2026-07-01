"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

/* DSGVO: Google-Maps-iFrame lädt ERST nach aktivem Klick (kein Request an
   Google vor Einwilligung). Bis dahin ein gestylter Platzhalter. */

export default function MapEmbed({
  className = "h-44 rounded-xl border border-white/15 sm:h-52",
}: {
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loaded ? (
        <iframe
          title="Karte: Salon Muster, Musterstraße 12, Musterstadt"
          src={SITE.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 grid place-items-center text-center"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,.06),rgba(255,255,255,.06) 18px,transparent 18px,transparent 36px),repeating-linear-gradient(90deg,rgba(255,255,255,.06),rgba(255,255,255,.06) 18px,transparent 18px,transparent 36px)",
          }}
        >
          <span className="mx-4 rounded-xl bg-cream/95 px-5 py-4 text-ink shadow-lg">
            <span className="block font-semibold">Karte ansehen</span>
            <span className="mt-1 block text-xs text-inkSoft">
              Lädt Google Maps erst nach Klick (Datenschutz).
            </span>
            <span className="mt-3 inline-flex min-h-[40px] items-center rounded-lg bg-terra px-4 text-sm font-semibold text-white transition-transform duration-200 group-hover:scale-[1.03]">
              Karte laden
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
