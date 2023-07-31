import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@sidebase/nuxt-auth", "@vite-pwa/nuxt"],
    devtools: { enabled: false },
    auth: {
        origin: process.env.AUTH_ORIGIN,
    },
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
    plugins: [{ src: "~/plugins/vue-fb-customer-chat.js", ssr: false }],
});
