import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@sidebase/nuxt-auth",
        "@kevinmarrec/nuxt-pwa",
        "@nuxtjs/tailwindcss",
        "nuxt-mail"
    ],
    mail: {
        message:{
            to: process.env.EMAIL_USER
        },
        smtp: {
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Sender gmail address
                pass: process.env.EMAIL_PASSWORD, // Password from Gmail of the User
            }
        },
    },
    pwa: {
        manifest: {
            name: "Guidance Connect",
            short_name: "Guidance Connect",
            description: "Guidance and Counseling Office Web/Mobile Application",
            lang: "es-US",
            start_url: `/`,
            prefer_related_applications: true,
            icons: [
                {
                    src: "icons/android-icon48x48.png",
                    sizes: "48x48",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/android-icon72x72.png",
                    sizes: "72x72",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/android-icon512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/apple-icon72x72.png",
                    sizes: "72x72",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/apple-icon120x120.png",
                    sizes: "120x120",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "icons/apple-icon180x180.png",
                    sizes: "180x180",
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
