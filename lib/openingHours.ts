/** Hair Power Öffnungszeiten:
 *  Mo Ruhetag · Di–Fr 08:30–18:00 · Sa 08:00–13:00 · So geschlossen
 *  Eine Quelle der Wahrheit für Navbar- und Hero-Live-Status. */

export type OpenStatus = { open: boolean; until?: string };

export function computeStatus(now: Date): OpenStatus {
  const day = now.getDay(); // 0 So … 6 Sa
  const mins = now.getHours() * 60 + now.getMinutes();
  const schedule: Record<number, [number, number] | undefined> = {
    2: [510, 1080], // Di 8:30–18:00
    3: [510, 1080], // Mi
    4: [510, 1080], // Do
    5: [510, 1080], // Fr
    6: [480, 780], //  Sa 8:00–13:00
  };
  const t = schedule[day];
  if (t && mins >= t[0] && mins < t[1]) {
    const h = Math.floor(t[1] / 60);
    const m = (t[1] % 60).toString().padStart(2, "0");
    return { open: true, until: `${h}:${m}` };
  }
  return { open: false };
}
