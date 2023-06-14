<template>
    <v-app dark class="content-container">
        <v-app-bar fixed app color="primary100">
            <v-img
                src="/img/GuidanceConnect.png"
                alt="Logo"
                :style="{ width: '150%', height: '150%' }"
                contain
                class="mx-auto"
            ></v-img>
        </v-app-bar>
        <v-main
            density="compact"
            :style="{
                backgroundColor:
                    $vuetify.theme.themes.myCustomLightTheme.colors.bg100,
            }"
            class="scrollable-content"
        >
            <slot />
        </v-main>
        <v-footer class="sticky-bottom" color="bg200">
            <v-row justify="center" no-gutters>
                <v-btn
                    v-for="(item, index) in navItem"
                    :key="item.text"
                    variant="text"
                    class="mx-2 rounds"
                    :to="item.route"
                    exact
                    :class="{
                        active: isActive(index),
                        'pop-icon': isActive(index),
                    }"
                    @click="toggleActive(index)"
                    :color="isActive(index) ? 'primary300' : 'transparent'"
                    :style="{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        pointerEvents: isActive(index) ? 'none' : 'auto',
                    }"
                >
                    <v-slide-y-transition>
                        <v-icon :key="item.icon" color="primary300" size="26">
                            {{ item.icon }}
                        </v-icon>
                    </v-slide-y-transition>
                </v-btn>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script setup>
import { ref } from "vue";
const navItem = ref([
    { icon: "fa-solid fa-house", text: "Home", route: "/" },
    { icon: "fa-solid fa-bullhorn", text: "News", route: "/news" },
    { icon: "fa-solid fa-comments", text: "Chatbot", route: "/chat" },
    {
        icon: "fa-solid fa-briefcase",
        text: "Office",
        route: "/office",
    },
]);

const activeIndex = ref(false);

const toggleActive = (index) => {
    if (activeIndex.value === index) {
        activeIndex.value = false;
    } else {
        activeIndex.value = index;
    }
};

const isActive = (index) => activeIndex.value === index;
</script>

<style scoped>
body {
    font-family: "Courier New", Courier, monospace;
}
.sticky-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

.rounds {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
}

.pop-icon {
    transform: translateY(-2rem);
    transition: transform 0.3s ease;
}
.content-container {
    height: 500vh; /* viewport height adjust for scrolling */
}

.scrollable-content {
    overflow-y: auto; /* Enable vertical scrolling */
}
</style>
