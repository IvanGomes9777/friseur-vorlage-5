"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TEAM, TEAM_LEAD, type TeamMember } from "@/data/team";

/* ---------------------------------------------------------------------------
   Hair Power · Team (Sektion 5) — Konzept 06 "Namen-Liste + Floating-Foto"
   Große Namensliste auf dunkler Bühne; beim Hovern schwebt das Porträt dem
   Cursor nach (Spring-Lerp). Touch/ohne Maus: Porträt-Grid als Fallback.
   GPU-only (transform/opacity) · prefers-reduced-motion- & pointer-gated.
--------------------------------------------------------------------------- */

const MEMBERS: TeamMember[] = [TEAM_LEAD, ...TEAM];
const EO = "cubic-bezier(0.23,1,0.32,1)";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const img = imgRef.current;
    if (!sec || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf: number | null = null,
      visible = false;

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      img.style.left = `${cx}px`;
      img.style.top = `${cy}px`;
      if (visible || Math.abs(cx - tx) > 0.5 || Math.abs(cy - ty) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (raf === null) raf = requestAnimationFrame(loop);
    };
    sec.addEventListener("mousemove", onMove);

    const rows = Array.from(sec.querySelectorAll<HTMLElement>("[data-img]"));
    const cleanups = rows.map((row) => {
      const enter = () => {
        const src = row.getAttribute("data-img");
        if (src) img.setAttribute("src", src);
        img.style.opacity = "1";
        img.style.transform = "translate(-50%,-50%) scale(1) rotate(-3deg)";
        visible = true;
        row.style.color = "#F4A460";
        if (raf === null) raf = requestAnimationFrame(loop);
      };
      const leave = () => {
        img.style.opacity = "0";
        img.style.transform = "translate(-50%,-50%) scale(0.9)";
        visible = false;
        row.style.color = "";
      };
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      return () => {
        row.removeEventListener("mouseenter", enter);
        row.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      sec.removeEventListener("mousemove", onMove);
      cleanups.forEach((fn) => fn());
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative scroll-mt-28 overflow-hidden bg-ink px-6 py-16 text-cream sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
          Unser Team
        </p>
        <h2 className="mt-3 font-serif text-[clamp(1.7rem,1rem+2.6vw,2.6rem)] font-medium leading-tight">
          „by Katja" – und das ganze Team
        </h2>

        {/* Interaktive Namensliste (Desktop/Maus) */}
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {MEMBERS.map((m) => (
            <li key={m.name}>
              <div
                data-img={m.image}
                className="group flex cursor-default items-baseline justify-between gap-4 py-5 transition-colors duration-300"
              >
                <span className="font-serif text-[clamp(1.6rem,5vw,3rem)] font-medium leading-none transition-transform duration-300 ease-out group-hover:translate-x-3 motion-reduce:transform-none">
                  {m.name}
                </span>
                <span className="text-right text-xs uppercase tracking-[0.18em] text-cream/55 sm:text-sm">
                  {m.role}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[52ch] border-l-2 border-orange pl-4 font-serif text-lg italic text-orange/90">
          „{TEAM_LEAD.quote}"
        </p>

        {/* Fallback-Grid für Touch / ohne Maus */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 [@media(hover:hover)and(pointer:fine)]:hidden">
          {MEMBERS.map((m) => (
            <figure key={m.name} className="overflow-hidden rounded-2xl bg-white/5">
              <div className="relative aspect-[3/4] bg-gradient-to-b from-[#F4EFE7] to-[#E6DBCB]">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 220px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="p-3">
                <span className="block font-serif text-base">{m.name}</span>
                <span className="text-xs text-orange">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Schwebendes Porträt (folgt dem Cursor) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed z-50 h-[280px] w-[220px] rounded-2xl object-cover object-top opacity-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
        style={{
          transform: "translate(-50%,-50%) scale(0.9)",
          transition: `opacity .4s ${EO}, transform .4s ${EO}`,
          background: "linear-gradient(165deg, #F4EFE7, #E6DBCB)",
        }}
      />
    </section>
  );
}
