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
    script: [
        {
            type: "text/javascript",
            hid: "fb-customer-chat",
            body: true,
            innerHTML: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "225591027631621");
            chatbox.setAttribute("attribution", "biz_inbox");
      
  
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v17.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));`,
        },
    ],
    __dangerouslyDisableSanitizersByTagID: {
        "fb-customer-chat": ["innerHTML"],
    },
});
