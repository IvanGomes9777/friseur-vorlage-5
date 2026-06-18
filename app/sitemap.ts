import type { MetadataRoute } from "next";

const BASE = "https://friseur-hairpower.de";

export default function sitemap(): MetadataRoute.Sitemap {
  // Impressum/Datenschutz sind bewusst noindex → nicht in der Sitemap.
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
