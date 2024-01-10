<template>
  <v-app dark>
    <v-main
      :style="{
        backgroundColor: $vuetify.theme.themes.myCustomLightTheme.colors.bg200,
      }"
      class="scrollable-content"
    >
      <template v-if="isStandalonePWA">
        <v-app-bar fixed app color="bg100">
          <v-img
            src="/img/GuidanceConnectName.png"
            alt="Logo"
            :style="{ width: '50%', height: '80%' }"
            contain
            class="ml-13"
          ></v-img>
          <v-btn icon color="bg300" @click.stop="drawer = !drawer">
            <v-icon>fa-solid fa-bars</v-icon>
          </v-btn>
        </v-app-bar>
        <slot />
        <v-navigation-drawer
          v-model="drawer"
          temporary
          color="bg200"
          location="right"
        >
          <div class="avatar-container mb-4">
            <div class="text-center">
              <div
                class="mt-6 bg-surface-variant w-36 h-36 m-auto rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="data.user.image"
                  alt="Avatar"
                  class="object-cover w-full h-full m-auto"
                />
              </div>
            </div>
            <div class="text-center pt-5">
              <p class="text-xl font-bold text-gray-800">
                {{ data.user.name }}
              </p>
            </div>
          </div>

          <div class="space-y-2 ma-4">
            <div
              v-for="(item, index) in navItem"
              :key="index"
              :class="{
                'active bg-gray-200': isActive(index),
                'pop-icon': isActive(index),
              }"
              class="p-2 cursor-pointer"
              @click="
                toggleActive(index);
                createNavigationButton(item.route);
              "
            >
              <i :class="item.icon + ' mr-2'"></i> {{ item.text }}
            </div>

            <!-- Additional section with different content -->
            <router-link
              v-if="
                data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
              "
              to="/admin"
              :class="{
                'active bg-gray-200': isActive(index),
                'pop-icon': isActive(index),
              }"
              class="p-2 cursor-pointer w-full"
              @click="toggleActive(index)"
            >
              <i class="fa-solid fa-user-lock mr-2 mt-3"></i>
              Admin
            </router-link>
          </div>
          <div class="text-center m-2 flex items-stretch">
            <button
              class="bg-gray-500 w-100 text-white font-bold py-2 mt-20 rounded-xl shadow-md"
              @click="signOut"
            >
              Sign Out
            </button>
          </div>
        </v-navigation-drawer>
      </template>
      <template v-else>
        <!-- Alternative Content for Large Screens -->
        <div class="alternative-content">
          <h1 class="text-2xl font-bold m-4">Welcome to our App!</h1>
          <p>
            Thank you for visiting our app. For an optimal experience, we
            recommend installing it on your device. This will allow you to
            access the main content and receive guidance and counseling more
            effectively.
          </p>
          <button
            v-if="!isStandalonePWA"
            id="installButton"
            @click="installApp"
          >
            Install
          </button>
        </div>
      </template>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { data } = useAuth();
const { signOut } = useAuth();

const createNavigationButton = (route) => {
  if (typeof route === "function") {
    route();
  } else {
    const router = useRouter();
    router.push(route);
  }
};

const navItem = ref([
  { icon: "fa-solid fa-house", text: "Home", route: "/" },
  {
    icon: "fa-solid fa-bullhorn",
    text: "Announcement",
    route: "/announcement",
  },
  { icon: "fa-solid fa-comment", text: "Chatbot", route: "/chat" },
  {
    icon: "fa-solid fa-calendar-check",
    text: "Book Appointment",
    route: "/appointment",
  },
  {
    icon: "fa-solid fa-clipboard",
    text: "Report Incident",
    route: "/report",
  },
]);

const drawer = ref(false);
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
const isStandalonePWA = ref(false);

onMounted(() => {
  // Check if the app is running in standalone mode (PWA)
  if (window.matchMedia("(display-mode: standalone)").matches) {
    isStandalonePWA.value = true;
  }
});
const installApp = () => {
  if ("serviceWorker" in navigator && "beforeinstallprompt" in window) {
    // Check if the service worker and beforeinstallprompt are supported

    // Add an event listener for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the default behavior to avoid automatic prompt
      event.preventDefault();

      // Store the event for later use
      let deferredPrompt = event;

      // Show the install button or UI to prompt the user to install
      // For simplicity, you can use a confirmation dialog
      const userChoice = window.confirm("Do you want to install this app?");

      if (userChoice) {
        // User clicked "Yes," so trigger the prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }

          // Clear the deferredPrompt variable as it can only be used once
          // You may choose to save it to handle later installations
          deferredPrompt = null;
        });
      }
    });
  } else {
    console.error("Service worker or beforeinstallprompt not supported");
  }
};
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
  background-color: #bdbdbd;
  color: #003b1b;
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
