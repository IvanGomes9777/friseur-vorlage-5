/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Platzhalter-Bilder (Galerie). Werden später durch eigene Fotos in
    // public/ ersetzt; dann kann dieser Eintrag entfernt werden.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
