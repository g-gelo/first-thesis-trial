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
            :style="{
                backgroundColor:
                    $vuetify.theme.themes.myCustomLightTheme.colors.bg100,
            }"
            class="scrollable-content"
        >
            <template v-if="!isLargeScreen">
                <!-- Main Content -->
                <slot />
            </template>
            <template v-else>
                <!-- Alternative Content for Large Screens -->
                <div class="alternative-content">
                    <h1>Welcome to our App!</h1>
                    <p>
                        Thank you for visiting our app on a larger screen.
                        Please use a mobile device to access the main content.
                    </p>
                </div>
            </template>
        </v-main>

        <v-footer class="sticky-bottom" color="bg200">
            <v-row justify="center" align="center" no-gutters>
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
                    :color="isActive(index) ? 'primary300' : 'transparent'"
                    :style="{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        pointerEvents: isActive(index) ? 'none' : 'auto',
                    }"
                    @click="toggleActive(index)"
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
import { ref, onMounted } from "vue";

const navItem = ref([
    { icon: "fa-solid fa-house", text: "Home", route: "/" },
    { icon: "fa-solid fa-bullhorn", text: "News", route: "/announcement" },
    { icon: "fa-solid fa-comments", text: "Chatbot", route: "/chat" },
    { icon: "fa-solid fa-briefcase", text: "Office", route: "/office" },
]);

const isLargeScreen = ref(false);
const activeIndex = ref(false);

const toggleActive = (index) => {
    if (activeIndex.value === index) {
        activeIndex.value = false;
    } else {
        activeIndex.value = index;
    }
};

const isActive = (index) => activeIndex.value === index;

const checkScreenSize = () => {
    isLargeScreen.value = window.innerWidth >= 960; // Adjust the breakpoint as needed
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    overflow-x: hidden;
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
    height: 500vh;
}

.scrollable-content {
    overflow-y: hidden; /* Enable vertical scrolling */
}

.alternative-content {
    height: 100vh; /* Adjust for the desired height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}
</style>
