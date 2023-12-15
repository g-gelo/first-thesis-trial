<template>
  <div>
    <div v-if="showOsasForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1>Osas Form</h1>
        <form class="space-y-4 mb-4" @submit.prevent="addOsas(osas)">
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
              required
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
            v-if="data?.user?.role == `SUPERADMIN`"
            type="submit"
            class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            @click="showOsasForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-if="showOsasEdit" class="modal career z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Osas Module</h2>
        <div>
          <input
            v-model="editedOsasModule.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="title"
            required
          />
          <textarea
            v-model="editedOsasModule.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="description"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
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
    <div class="my-4">
      <button
        v-if="!showOsasModule"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showOsasModule = true;
          }
        "
      >
        Show Osas Database
      </button>
      <button
        v-if="showOsasModule"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showOsasModule = false;
          }
        "
      >
        Hide Osas Database
      </button>
    </div>
    <div v-if="showOsasModule" class="grid grid-cols-3 gap-4 my-2">
      <div
        class="flex items-center justify-center space-x-4 col-start-1 col-span-3"
      >
        <button
          :disabled="currPage === 1"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="prev_Page"
        >
          &lt; Prev
        </button>
        <span class="text-sm font-semibold">{{ currPage }}</span>
        <button
          :disabled="currPage * itemsPerPage >= osasAll.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="next_Page"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-span-3">
        <button
          v-if="!showOsasForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showOsasForm = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New Osas
        </button>
      </div>
      <div class="mb-4 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ osasAll?.length || 0 }} records:
      </div>
    </div>
    <div v-if="showOsasModule">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="w-1/4 py-2 px-4 border-b">Title</th>
              <th class="w-1/4 py-2 px-4 border-b">Description</th>
              <th class="w-1/4 py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="profile in pagedOsas"
              :key="profile.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">{{ profile.title }}</td>
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ profile.description }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showOsasEdit"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedOsasModule.id = profile.id;
                        editedOsasModule.title = profile.title;
                        editedOsasModule.description = profile.description;
                        showOsasEdit = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn variant="tonal" @click="showDeleteModal1 = true">
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal1" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-xl font-bold mb-4">Delete Seminar</h2>
                    <p class="mb-4">Do you want to delete this Profile?</p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteOsas(profile.id), (showDeleteModal1 = false)
                        "
                      >
                        Delete
                      </button>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="showDeleteModal1 = false"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="showFunctionForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
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
            v-if="data?.user?.role == `SUPERADMIN`"
            type="submit"
            class="bg-blue-500 ma-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showFunctionForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div class="btn">
      <button
        v-if="!showFunction"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showFunction = true;
          }
        "
      >
        Show Function Database
      </button>
      <button
        v-if="showFunction"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showFunction = false;
          }
        "
      >
        Hide Function Database
      </button>
    </div>
    <div v-if="showFunctionEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Osas Function</h2>
        <div>
          <input
            v-model="editedOsasFunction.osasFunction"
            class="w-full p-2 border rounded mb-4"
            placeholder="title"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
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
    <div v-if="showFunction" class="grid grid-cols-3 gap-4 my-2">
      <div
        class="flex items-center justify-center space-x-4 col-start-1 col-span-3"
      >
        <button
          :disabled="currentPage === 1"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="prevPage"
        >
          &lt; Prev
        </button>
        <span class="text-sm font-semibold">{{ currentPage }}</span>
        <button
          :disabled="currentPage * itemsPerPage >= osasFunction.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-span-3">
        <button
          v-if="!showFunctionForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showFunctionForm = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New Osas Function
        </button>
      </div>
      <div class="mb-4 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ osasFunction?.length || 0 }} records:
      </div>
    </div>
    <div v-if="showFunction">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="w-1/4 py-2 px-4 border-b">Function</th>
              <th class="w-1/4 py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="purpose in pagedFunction"
              :key="purpose.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ purpose.osasFunction }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showFunctionEdit"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedOsasFunction.id = purpose.id;
                        editedOsasFunction.osasFunction = purpose.osasFunction;
                        showFunctionEdit = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    @click="
                      ($event) => {
                        showDeleteModal2 = true;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal2" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-xl font-bold mb-4">Delete Function</h2>
                    <p class="mb-4">Do you want to delete this Function?</p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteFunction(purpose.id), (showDeleteModal2 = false)
                        "
                      >
                        Delete
                      </button>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="showDeleteModal2 = false"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = useAuth();

const currentPage = ref(1);
const itemsPerPage = 3;

const pagedFunction = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return osasFunction.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < osasFunction.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
// above is pagination for OsasModule, and below is Pagination for Osas Function
const currPage = ref(1);
const itemsInPage = 3;

const pagedOsas = computed(() => {
  const startIndex = (currPage.value - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  return osasAll.value.slice(startIndex, endIndex);
});

const next_Page = () => {
  if (currPage.value * itemsInPage < osasAll.value.length) {
    currPage.value += 1;
  }
};

const prev_Page = () => {
  if (currPage.value > 1) {
    currPage.value -= 1;
  }
};
const showOsasModule = ref(false);
const showOsasEdit = ref(false);
const showOsasForm = ref(false);
const showFunction = ref(false);
const showFunctionEdit = ref(false);
const showFunctionForm = ref(false);
const showDeleteModal1 = ref(false);
const showDeleteModal2 = ref(false);

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
});

const editOsasFunction = async (editedOsasFunction) => {
  let osasFunctions = null;

  if (editedOsasFunction.id && editedOsasFunction.osasFunction)
    osasFunctions = await $fetch("/api/osasfunction", {
      method: "PUT",
      body: {
        id: editedOsasFunction.id,
        osasFunction: editedOsasFunction.osasFunction,
      },
    });
  osasFunction.value = await $fetch("/api/osasfunction");
};

const deleteFunction = async (id) => {
  let deletedFunction = null;
  if (id)
    deletedFunction = await $fetch("/api/osasfunction", {
      method: "DELETE",
      body: {
        id,
      },
    });
  osasFunction.value = await $fetch("/api/osasfunction");
};

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
});

const editOsasModule = async (editedOsasModule) => {
  let osasModule = null;

  if (
    editedOsasModule.id &&
    editedOsasModule.title &&
    editedOsasModule.description
  )
    osasModule = await $fetch("/api/osas", {
      method: "PUT",
      body: {
        id: editedOsasModule.id,
        title: editedOsasModule.title,
        description: editedOsasModule.description,
      },
    });
  osasAll.value = await $fetch("/api/osas");
};

const deleteOsas = async (id) => {
  let deletedOsas = null;
  if (id)
    deletedOsas = await $fetch("/api/osas", {
      method: "DELETE",
      body: {
        id,
      },
    });

  osasAll.value = await $fetch("/api/osas");
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-width: 100%;
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
.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .btn button {
  display: flex;
  width: 100%;
  padding: 1em;
  justify-content: center;
  margin-bottom: 2em;
  background-color: #d1d1d1;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
} */
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
</style>
