import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Keep ROMs and game covers out of the service worker precache.
  publicExcludes: ["!noprecache/**/*", "!emulator/**/*"],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {},
};

export default withPWA(nextConfig);
