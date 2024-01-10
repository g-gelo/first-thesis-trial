import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@kevinmarrec/nuxt-pwa",
    "@nuxtjs/tailwindcss",
  ],
  pwa: {
    manifest: {
      name: "Guidance Connect",
      short_name: "Guidance Connect",
      description:
        "An Application for Guidance and Counseling Office for the Cavite State University - Imus Campus",
      icons: [
        {
          src: "icons/icon48x48.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/icon72x72.png",
          sizes: "72x72",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/icon96x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/icon144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/icon192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/icon512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
  },
  devtools: { enabled: false },
  auth: {
    origin: process.env.AUTH_ORIGIN,
    enableGlobalAppMiddleware: true,
  },
  runtimeConfig: {
    API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "@fortawesome/fontawesome-free/css/fontawesome.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  typescript: {
    shim: false,
  },
});
