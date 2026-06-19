/** @type {import('next').NextConfig} */

// Pragmatische Content-Security-Policy:
// - 'unsafe-inline' für Skripte/Styles ist nötig (Next-Hydration, JSON-LD,
//   inline-Styles in Komponenten). Kein 'unsafe-eval' in Produktion.
// - Google-Maps-iFrame (erst nach Consent) via frame-src erlaubt.
// - Unsplash-Platzhalter via img-src; später entfernbar.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Platzhalter-Bilder (Galerie). Werden später durch eigene Fotos in
    // public/ ersetzt; dann kann dieser Eintrag entfernt werden.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
