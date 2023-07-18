<template>
    <div
        :style="{
            backgroundColor:
                $vuetify.theme.themes.myCustomLightTheme.colors.bg100,
        }"
    >
        <template v-if="isLargeScreen">
            <!-- Alternative Page Content for Large Screens -->
            <div class="alternative-page">
                <h1>Welcome to our App!</h1>
                <p>
                    Thank you for visiting our app on a larger screen. Please
                    use a mobile device to access the main content of this page.
                </p>
            </div>
        </template>
        <template v-else>
            <!-- Main Page Content -->
            <slot />
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLargeScreen = ref(false);

const checkScreenSize = () => {
    isLargeScreen.value = window.innerWidth >= 960; // Adjust the breakpoint as needed
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.alternative-page {
    height: 100vh; /* Adjust for the desired height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}
</style>
