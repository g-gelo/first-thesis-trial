import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@vite-pwa/nuxt"],
    devtools: { enabled: false },
    css: ["vuetify/lib/styles/main.sass", "~/assets/css/all.min.css"],
    build: {
        transpile: ["vuetify"],
    },
});
