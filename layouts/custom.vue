<template>
    <div
        :style="{
            backgroundColor:
                $vuetify.theme.themes.myCustomLightTheme.colors.bg200,
        }"
    >
        <template v-if="isStandalonePWA">
            
            <slot />
        </template>
        <template v-else>
            <div class="alternative-page">
                <h1 class="text-2xl font-bold m-4">Welcome to our App!</h1>
                <p>
                    Thank you for visiting our app. For an optimal experience, we recommend installing it on your
                    device. This will allow you to access the main content and receive guidance and counseling more 
                    effectively.
                </p>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


const isStandalonePWA = ref(false);

onMounted(() => {
  // Check if the app is running in standalone mode (PWA)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isStandalonePWA.value = true;
  }
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
