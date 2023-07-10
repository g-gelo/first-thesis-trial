import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@vite-pwa/nuxt"],
  devtools: { enabled: false },
  css: [
    "vuetify/lib/styles/main.sass",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  typescript: {
    shim: false,
  },
});
