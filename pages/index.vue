<template>
  <div>
    <v-img
      aspect-ratio="16/9"
      src="/img/CvSULogo.jpg"
      class="top-image"
    ></v-img>
    <marquee
      class="border-bottom"
      width="100%"
      behavior="scroll"
      direction="left"
      scrollamount="5"
    >
      Cavite State University - Imus Campus
    </marquee>
    <div class="category">
      <ul>
        <li><a href="#Osas">OSAS</a></li>
        <li><a href="#GCO">GCO</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>
    </div>
    <div v-if="showModalMisnVisEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Mission and Vision</h2>
        <div>
          <input
            v-model="editedMisnVis.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="Title"
            required
          />
          <textarea
            v-model="editedMisnVis.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Description"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editMisnVis(editedMisnVis)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showModalMisnVisEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <v-carousel hide-delimiters show-arrows="hover">
      <v-container>
        <v-carousel-item
          v-for="MisnVis in universityMissionVision"
          :key="MisnVis.id"
        >
          <div class="mission-vision-box">
            <div class="title">
              <h1 class="text-3xl">{{ MisnVis.title }}</h1>
              <div v-if="data?.user?.role == `SUPERADMIN`">
                <button
                  v-if="!showModalMisnVisEdit"
                  class="absolute top-3 right-0"
                  variant="tonal"
                  @click="
                    ($event) => {
                      editedMisnVis.id = MisnVis.id;
                      editedMisnVis.title = MisnVis.title;
                      editedMisnVis.description = MisnVis.description;
                      showModalMisnVisEdit = true;
                    }
                  "
                >
                  <v-icon color="bg300"> fa-solid fa-pen-to-square </v-icon>
                </button>
              </div>
            </div>
            <p class="shadow-lg p-3 mb-4">
              {{ MisnVis.description }}
            </p>
          </div>
        </v-carousel-item>
      </v-container>
    </v-carousel>
    <div class="bg">
      <the-title
        id="Osas"
        class="card"
        title="Office Of Student Affairs And Services"
        backgroundImage="/img/osas.png"
        svgBlob="/img/osasBlob.svg"
      />
    </div>
    <v-container>
      <the-osas />
    </v-container>
    <the-title
      id="GCO"
      class="card"
      title="Guidance and Counseling Office"
      backgroundImage="/img/GCO.png"
      svgBlob="/img/gcoBlob.svg"
    />
    <div>
      <v-container>
        <the-box />
      </v-container>
    </div>
    <the-title
      id="Contact"
      class="card"
      title="Emergency Hotline"
      backgroundImage="/img/emergencyHotline.png"
      svgBlob="/img/emergencyBlob.svg"
    />
    <div>
      <v-container>
        <the-emergency />
      </v-container>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import TheTitle from "@/components/TheTitle.vue";
import TheOsas from "@/components/TheOsas.vue";
import TheBox from "@/components/TheBox.vue";
import TheEmergency from "@/components/TheEmergency.vue";
import "animate.css";
import "intersection-observer";

const { data } = useAuth();

const showModalMisnVisEdit = ref(false);

const { data: universityMissionVision } = useFetch("/api/missionvision");

const editedMisnVis = ref({
  id: null,
  title: null,
  description: null,
});

const editMisnVis = async (editedMisnVis) => {
  let missionNVision = null;

  if (editedMisnVis.id && editedMisnVis.title && editedMisnVis.description)
    missionNVision = await $fetch("/api/missionvision", {
      method: "PUT",
      body: {
        id: editedMisnVis.id,
        title: editedMisnVis.title,
        description: editedMisnVis.description,
      },
    });
  universityMissionVision.value = await $fetch("/api/missionvision");
};

useHead({
  title: "Home",
});

onMounted(() => {
  if (process.client) {
    const sliders = document.querySelectorAll(".card");

    const appearOptions = {
      threshold: 0.5, // Adjust the threshold value as needed
    };

    const appearOnScroll = new IntersectionObserver(
      (entries, appearOnScroll) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__slideInUp"
            );
            appearOnScroll.unobserve(entry.target);
          }
        });
      },
      appearOptions
    );

    sliders.forEach((slider) => {
      appearOnScroll.observe(slider);
    });
  }
});
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.mission-vision-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mission-vision-box .title {
  padding: 0.8em;
  text-align: center;
  background-color: #c7ffb2;
  width: 100%;
  color: #003b1b;
}

.mission-vision-box p {
  margin-top: 2em;
  text-align: justify;
  background-color: #fff;
  padding: 1.5em;
  border-radius: 20px;
}

.mission-vision-box p.mission {
  color: #fff;
}

marquee {
  background-color: #bdf5a8;
  color: #003b1b;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
}
.font-display {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.category ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}
.category ul li {
  font-size: 1.2rem;
  background-color: #d9facd;
  border-radius: 50px;
  box-shadow: 1px 1px 5px #808080;
}
.category ul li a {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
}
.category ul li a:visited {
  margin: 0 1rem;
  text-decoration: none;
  color: #333;
}

.border-bottom {
  box-shadow: 0px 10px 10px -15px #111;
}
.bg .svgBlob {
  position: relative;
  bottom: 0;
  right: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
