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
            description: "",
            icons: [
                {
                    src: "icons/icon64x64.png",
                    sizes: "64x64",
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
                    src: "icons/icon128x128.png",
                    sizes: "128x128",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/icon256x256.png",
                    sizes: "256x256",
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
