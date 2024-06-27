<template>
  <div
    :style="{
      backgroundColor: $vuetify.theme.themes.myCustomLightTheme.colors.bg200,
    }"
  >
    <slot />
    <!-- <template v-else>
      Alternative Content for Large Screens
      <div class="alternative-content">
        <h1 class="text-2xl font-bold m-4">Welcome to our Application!</h1>
        <p>
          Thank you for visiting our app. For an optimal experience, we
          recommend installing it on your device. This will allow you to access
          the main content and receive guidance and counseling more effectively.
        </p>
        Button to open installation instructions modal on Android
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4"
          @click="openInstallInstructionsAndroid"
        >
          How to install with Android
        </button>
        Modal for installation instructions on Android
        <v-dialog v-model="showInstallInstructionsModalAndroid" max-width="600">
          <v-card>
            <v-carousel show-arrows="hover">
              <v-carousel-item
                v-for="(image, index) in installationScreenshotsAndroid"
                :key="index"
              >
                <v-img :src="image"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-dialog>

        Button to open installation instructions modal on iPhone
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4"
          @click="openInstallInstructionsiPhone"
        >
          How to install with iPhone
        </button>
        Modal for installation instructions on iPhone
        <v-dialog v-model="showInstallInstructionsModaliPhone" max-width="600">
          <v-card>
            <v-carousel show-arrows="hover">
              <v-carousel-item
                v-for="(image, index) in installationScreenshotsiPhone"
                :key="index"
              >
                <v-img :src="image"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-dialog>
      </div>
    </template> -->
  </div>
</template>

<script setup>
// const isStandalonePWA = ref(false);
// const installationScreenshotsAndroid = [
//   "/img/step-1-Android.jpg",
//   "/img/step-2-Android.jpg",
//   "/img/step-3-Android.jpg",
// ];

// const showInstallInstructionsModalAndroid = ref(false);

// const openInstallInstructionsAndroid = () => {
//   showInstallInstructionsModalAndroid.value = true;
// };

// const installationScreenshotsiPhone = [
//   "/img/step-1-iPhone.jpg",
//   "/img/step-2-iPhone.jpg",
//   "/img/step-3-iPhone.jpg",
// ];

// const showInstallInstructionsModaliPhone = ref(false);

// const openInstallInstructionsiPhone = () => {
//   showInstallInstructionsModaliPhone.value = true;
// };

// onMounted(() => {
//   // Check if the app is running in standalone mode (PWA)
//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     isStandalonePWA.value = true;
//   }
// });
// const isLargeScreen = ref(false);

// const checkScreenSize = () => {
//   isLargeScreen.value = window.innerWidth >= 960; // Adjust the breakpoint as needed
// };

// onMounted(() => {
//   checkScreenSize();
//   window.addEventListener("resize", checkScreenSize);
// });
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
