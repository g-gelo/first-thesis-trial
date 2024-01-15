<template>
  <div>
    <div class="container">
      <v-img
        aspect-ratio="16/9"
        src="/img/osas-personnel.jpg"
        class="top-image card"
      ></v-img>
    </div>
    <div v-if="data?.user?.role == `SUPERADMIN`" class="relative">
      <button
        v-if="!showOsasForm"
        class="absolute top-0 right-0 text-lg"
        @click="
          ($event) => {
            showOsasForm = true;
          }
        "
      >
        <v-icon class="pa-5" color="bg300">fa-regular fa-square-plus</v-icon>
      </button>
      <button
        v-if="showOsasForm"
        class="absolute top-0 right-0 text-lg"
        @click="
          ($event) => {
            showOsasForm = false;
          }
        "
      >
        <v-icon class="pa-5" color="bg300">fa-regular fa-square-minus</v-icon>
      </button>
    </div>
    <div v-if="showOsasForm" class="shadow-lg p-3 mb-4 rounded-lg">
      <h1>Osas Form</h1>
      <form class="space-y-4" @submit.prevent="addOsas(osas)">
        <div>
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Title</label
          >
          <input
            id="title"
            v-model="osas.title"
            type="text"
            name="title"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Title"
          />
        </div>
        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Description</label
          >
          <textarea
            id="description"
            v-model="osas.description"
            name="description"
            rows="4"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Description"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
    <div v-if="showOsasEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Osas Module</h2>
        <div>
          <input
            v-model="editedOsasModule.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="Title"
            required
          />
          <textarea
            v-model="editedOsasModule.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Description"
            rows="5"
            required
          ></textarea>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status:</label
          >
          <select
            v-model="editedOsasModule.isArchive"
            class="w-full p-2 border rounded mb-4"
          >
            <option :value="false">Active</option>
            <option :value="true">Archived</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editOsasModule(editedOsasModule)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showOsasEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-for="osasProf in osasAll" :key="osasProf.id" class="mt-10">
      <div
        class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg"
        v-if="osasProf.isArchive == false"
      >
        <div class="px-4 py-2 bg-secondary-100">
          <h2 class="text-2xl ma-2 h-5">{{ osasProf.title }}</h2>
          <div v-if="data?.user?.role == `SUPERADMIN`" class="relative">
            <button
              v-if="!showOsasEdit"
              class="absolute bottom-0 right-0 text-lg"
              variant="tonal"
              @click="
                ($event) => {
                  editedOsasModule.id = osasProf.id;
                  editedOsasModule.title = osasProf.title;
                  editedOsasModule.description = osasProf.description;
                  editedOsasModule.isArchive = osasProf.isArchive;
                  showOsasEdit = true;
                }
              "
            >
              <v-icon color="bg300"> fa-solid fa-pen-to-square </v-icon>
            </button>
          </div>
        </div>
        <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
          <p class="indent text-base text-justify leading-relaxed">
            {{ osasProf.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="data?.user?.role == `SUPERADMIN`" class="relative">
      <button
        v-if="!showFunctionForm"
        class="absolute top-10 right-1 text-lg"
        @click="
          ($event) => {
            showFunctionForm = true;
          }
        "
      >
        <v-icon class="pa-5" color="bg300">fa-regular fa-square-plus</v-icon>
      </button>
      <button
        v-if="showFunctionForm"
        class="absolute top-10 right-1 text-lg"
        @click="
          ($event) => {
            showFunctionForm = false;
          }
        "
      >
        <v-icon class="pa-5" color="bg300">fa-regular fa-square-minus</v-icon>
      </button>
    </div>
    <div v-if="showFunctionForm" class="ma-2">
      <div class="bg-white shadow-lg rounded-lg pa-2">
        <h1 class="m-2">Function Form</h1>
        <form class="space-y-4" @submit.prevent="addOsasFunction(oFunction)">
          <div>
            <label
              for="function"
              class="block ma-2 text-sm font-medium text-gray-900"
              >Function</label
            >
            <input
              id="function"
              v-model="oFunction.osasFunction"
              type="text"
              name="function"
              class="shadow-sm m-3 w-10/12 text-color text-white bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Function"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 ma-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <div v-if="showFunctionEdit" class="modal z-40 mt-2">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Osas Function</h2>
        <div>
          <textarea
            v-model="editedOsasFunction.osasFunction"
            class="w-full p-2 border rounded mb-4"
            placeholder="Description"
            rows="5"
            required
          ></textarea>
          <select
            v-model="editedOsasFunction.isArchive"
            class="w-full p-2 border rounded mb-4"
          >
            <option :value="false">Active</option>
            <option :value="true">Archived</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editOsasFunction(editedOsasFunction)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showFunctionEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
      <div class="px-4 py-2 bg-secondary-100">
        <h2 class="text-lg ma-2">
          To attain these goals, the OSAS performs the following functions:
        </h2>
      </div>
      <div
        v-for="functions in osasFunction"
        :key="functions.id"
        class="px-4 py-2 bg-slate-50 rounded-b-lg"
      >
        <p
          class="text-justify leading-normal"
          v-if="functions.isArchive == false"
        >
          <button
            v-if="!showFunctionEdit"
            variant="tonal"
            @click="
              ($event) => {
                editedOsasFunction.id = functions.id;
                editedOsasFunction.osasFunction = functions.osasFunction;
                editedOsasFunction.isArchive = functions.isArchive;
                showFunctionEdit = true;
              }
            "
          >
            <v-icon v-if="data?.user?.role == `SUPERADMIN`" class="mr-2 sm"
              >fa-solid fa-pen-to-square</v-icon
            >
          </button>
          <v-icon v-else class="mr-2 sm">fa-regular fa-circle-dot</v-icon
          >{{ functions.osasFunction }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import "animate.css";
import { ref, onMounted } from "vue";

const { data } = useAuth();
const showOsasForm = ref(false);
const showOsasEdit = ref(false);
const showFunctionForm = ref(false);
const showFunctionEdit = ref(false);

const { data: osasAll } = useFetch("/api/osas");

const osas = ref({
  title: "",
  description: "",
});

const addOsas = async (osas) => {
  let addedOsas = null;
  addedOsas = await $fetch("/api/osas", {
    method: "POST",
    body: {
      title: osas.title,
      description: osas.description,
    },
  });
  if (addedOsas) {
    osas.title = "";
    osas.description = "";

    osasAll.value = await $fetch("/api/osas");
  }
};

const editedOsasModule = ref({
  id: null,
  title: null,
  description: null,
  isArchive: false,
});

const editOsasModule = async (editedOsasModule) => {
  let osasModule = null;

  if (editedOsasModule.id)
    osasModule = await $fetch("/api/osas", {
      method: "PUT",
      body: {
        id: editedOsasModule.id,
        title: editedOsasModule.title,
        description: editedOsasModule.description,
        isArchive: editedOsasModule.isArchive,
      },
    });
  osasAll.value = await $fetch("/api/osas");
};

const { data: osasFunction } = useFetch("/api/osasfunction");

const oFunction = ref({
  osasFunction: "",
});

const addOsasFunction = async (oFunction) => {
  let addedFunction = null;

  addedFunction = await $fetch("/api/osasfunction", {
    method: "POST",
    body: {
      osasFunction: oFunction.osasFunction,
    },
  });
  if (addedFunction) {
    oFunction.osasFunction = "";

    osasFunction.value = await $fetch("/api/osasfunction");
  }
};

const editedOsasFunction = ref({
  id: null,
  osasFunction: null,
  isArchive: null,
});

const editOsasFunction = async (editedOsasFunction) => {
  let osasFunctions = null;

  if (editedOsasFunction.id && editedOsasFunction.osasFunction)
    osasFunctions = await $fetch("/api/osasfunction", {
      method: "PUT",
      body: {
        id: editedOsasFunction.id,
        osasFunction: editedOsasFunction.osasFunction,
        isArchive: editedOsasFunction.isArchive,
      },
    });
  osasFunction.value = await $fetch("/api/osasfunction");
};

onMounted(() => {
  if (process.client) {
    const sliders = document.querySelectorAll(".card");

    const appearOptions = {
      threshold: 0,
      rootMargin: "-100px 0px -50px 0px",
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
.sm {
  font-size: medium;
}
.top-image {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(13, 202, 107, 0.3);
  opacity: 0.9;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}
.top-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.custom-text {
  text-align: justify;
  text-justify: inter-word;
}
.indent {
  display: inline-block;
  text-indent: 2em; /* Adjust the indentation value as needed */
}
</style>
