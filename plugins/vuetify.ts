import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Vuetify from "vuetify";

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        // Pickle green
        primary100: "#2E8B57",
        primary200: "#6da52d",
        primary300: "#286400",
        accent100: "#FFC107",
        accent200: "#916400",
        text100: "#333333",
        text200: "#5c5c5c",
        bg100: "#C7FFB2",
        bg200: "#d9facd",
        bg300: "#003b1b",
    },
};
const myCustomDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        // dark green theme
        primary100: "#4A4A4A",
        primary200: "#767676",
        primary300: "#d6d6d6",
        accent100: "#FFD700",
        accent200: "#917800",
        text100: "#FFFFFF",
        text200: "#e0e0e0",
        bg100: "#1E1E1E",
        bg200: "#2d2d2d",
        bg300: "#454545",
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: "myCustomLightTheme",
            themes: {
                myCustomLightTheme,
                myCustomDarkTheme,
            },
        },
    });

    nuxtApp.vueApp.use(vuetify);
});
