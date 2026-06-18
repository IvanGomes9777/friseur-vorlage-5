"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryItem } from "@/data/gallery";
import { useInView } from "@/lib/useInView";

/* Hair Power · Galerie (Sektion 7) — Option 2 "Filterbare Galerie"
   Filter-Tabs (inkl. Kinder) · Hover-Zoom · Klick öffnet Lightbox. */

export default function Galerie() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const [filter, setFilter] = useState<string>("alle");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items =
    filter === "alle" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  // ESC schließt die Lightbox; Body-Scroll sperren solange offen
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section id="galerie" className="scroll-mt-28 bg-cream2 px-6 py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div
          className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terra">
            Unsere Werke
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight text-ink">
            Lookbook
          </h2>
        </div>

        {/* Filter-Tabs */}
        <div
          role="tablist"
          aria-label="Galerie filtern"
          className="mt-6 inline-flex flex-wrap gap-1.5 rounded-full bg-cream p-1.5"
        >
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
                filter === f.id
                  ? "bg-white text-ink shadow-[0_4px_14px_-8px_rgba(42,33,27,0.5)]"
                  : "text-inkSoft hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Raster */}
        <div
          key={filter}
          className="mt-6 grid animate-fade-in grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <button
              key={item.src + i}
              onClick={() => setLightbox(item)}
              className="group relative aspect-square overflow-hidden rounded-xl"
              aria-label={`${item.alt} vergrößern`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
              <span className="pointer-events-none absolute right-2.5 top-2.5 text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100">
                ⤢
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-inkSoft">
          Platzhalter-Bilder – hier kommen eure echten Arbeiten rein.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <button
            className="absolute right-5 top-4 text-3xl leading-none text-cream"
            aria-label="Schließen"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src.replace("w=700", "w=1400")}
              alt={lightbox.alt}
              fill
              sizes="100vw"
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
