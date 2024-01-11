<template>
  <div>
    <div v-if="showGcoForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1>GCO Profile Form</h1>
        <form class="space-y-4" @submit.prevent="addGco(gco)">
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Title</label
            >
            <input
              id="title"
              v-model="gco.title"
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
              v-model="gco.description"
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
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showGcoForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div>
      <button
        v-if="!showGcoDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showGcoDatabase = true;
          }
        "
      >
        Show GCO Profile Database
      </button>
      <button
        v-if="showGcoDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showGcoDatabase = false;
          }
        "
      >
        Hide GCO Profile Database
      </button>
    </div>

    <div v-if="showGcoFormEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit GCO Profile</h2>
        <div>
          <input
            v-model="editedGcoProfile.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="title"
            required
          />
          <textarea
            v-model="editedGcoProfile.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Description"
            rows="5"
            required
          ></textarea>
          <select
            v-model="editedGcoProfile.isArchive"
            class="w-full p-2 border rounded mb-4"
          >
            <option :value="false">Active</option>
            <option :value="true">Archived</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editGcoProfile(editedGcoProfile)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showGcoFormEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="showGcoDatabase" class="grid grid-cols-3 gap-4 my-2">
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
          :disabled="currPage * itemsInPage >= gcoProfile.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="next_Page"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-span-3">
        <button
          v-if="!showGcoForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showGcoForm = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New GCO Profile
        </button>
      </div>
      <div class="mb-4 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ gcoProfile?.length || 0 }} records:
      </div>
    </div>
    <div v-if="showGcoDatabase">
      <div class="overflow-x-auto">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Title</th>
              <th class="py-2 px-4 border-b">Description</th>
              <th class="py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="guidance in pagedProfile"
              :key="guidance.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">{{ guidance.title }}</td>
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ guidance.description }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showGcoFormEdit"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedGcoProfile.id = guidance.id;
                        editedGcoProfile.title = guidance.title;
                        editedGcoProfile.description = guidance.description;
                        editedGcoProfile.isArchive = guidance.isArchive;
                        showGcoFormEdit = true;
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
                        Delete_GcoProfile = guidance;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal2" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-lg font-bold mb-4">
                      Are you sure you wan to delete this profile?
                    </h2>
                    <p class="mb-2">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <p class="text-slate-600 mb-4">
                      Title: {{ Delete_GcoProfile.title }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteGco(Delete_GcoProfile.id), (showDeleteModal2 = false)
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
    <div v-if="showGcoServiceForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1 class="m-2">Service Form</h1>
        <form class="space-y-4" @submit.prevent="addGcoService(gcoServices)">
          <div>
            <label
              for="function"
              class="block ma-2 text-sm font-medium text-gray-900"
              >Service</label
            >
            <input
              id="function"
              v-model="gcoServices.service"
              type="text"
              name="function"
              class="shadow-sm text-white m-3 w-10/12 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
            @click="showGcoServiceForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <div class="mt-3">
      <button
        v-if="!showGcoServiceDb"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showGcoServiceDb = true;
          }
        "
      >
        Show GCO Services
      </button>
      <button
        v-if="showGcoServiceDb"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showGcoServiceDb = false;
          }
        "
      >
        Hide GCO Services
      </button>
    </div>

    <div v-if="showGcoServiceEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit GCO Service</h2>
        <div>
          <input
            v-model="editedGcoService.service"
            class="w-full p-2 border rounded mb-4"
            placeholder="title"
            required
          />
          <select
            v-model="editedGcoService.isArchive"
            class="w-full p-2 border rounded mb-4"
          >
            <option :value="false">Active</option>
            <option :value="true">Archived</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editGcoService(editedGcoService)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showGcoServiceEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="showGcoServiceDb" class="grid grid-cols-3">
      <div
        class="mt-4 flex items-center justify-center space-x-4 ma-4 col-start-1 col-span-3"
      >
        <div
          class="flex flex-col items-start sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label for="search" class="text-sm font-semibold">Search:</label>
          <input
            id="search"
            v-model="searchKeyword"
            type="text"
            class="appearance-none shadow-sm bg-white border border-blue-500 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
          />
        </div>
        <div class="flex items-space-x-2">
          <label for="filter" class="text-sm font-semibold">Filter:</label>
          <select
            id="filter"
            v-model="selectedFilter"
            class="appearance-none px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
          >
            <option value="service">Services</option>
          </select>
        </div>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md border border-blue-500 hover:bg-blue-700 focus:outline-none focus:border-blue-700"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
      <div
        class="mt-4 flex items-center justify-center space-x-4 col-start-1 col-span-3"
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
          :disabled="currentPage * itemsPerPage >= gcoService.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-span-3 my-2">
        <button
          v-if="!showGcoServiceForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showGcoServiceForm = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New Osas Function
        </button>
      </div>
      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ gcoService?.length || 0 }} records:
      </div>
    </div>

    <div v-if="showGcoServiceDb">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Service</th>
              <th class="py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in pagedService"
              :key="service.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">{{ service.service }}</td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showGcoServiceEdit"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedGcoService.id = service.id;
                        editedGcoService.service = service.service;
                        editedGcoService.isArchive = service.isArchive;
                        showGcoServiceEdit = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    @click="
                      ($event) => {
                        showDeleteModal1 = true;
                        Delete_GcoService = service;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal1" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-lg font-bold mb-4">
                      Are you sure you wan to delete this service?
                    </h2>
                    <p class="mb-2">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <p class="text-slate-600 mb-4">
                      Service: {{ Delete_GcoService.service }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteGcoService(Delete_GcoService.id),
                            (showDeleteModal1 = false)
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
  </div>
</template>

<script setup>
const { data } = useAuth();

// Pagination
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedService = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredService.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < gcoService.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
// above is pagination for Services, and below is Pagination for Profile
const currPage = ref(1);
const itemsInPage = 3;

const pagedProfile = computed(() => {
  const startIndex = (currPage.value - 1) * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  return gcoProfile.value.slice(startIndex, endIndex);
});

const next_Page = () => {
  if (currPage.value * itemsInPage < gcoProfile.value.length) {
    currPage.value += 1;
  }
};

const prev_Page = () => {
  if (currPage.value > 1) {
    currPage.value -= 1;
  }
};
// Filtering
const searchKeyword = ref("");
const selectedFilter = ref("service");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "service";
  currentPage.value = 1;
};

const filteredService = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return gcoService.value.filter((gcoServices) =>
    gcoServices[filterKey]
      .toLowerCase()
      .includes(searchKeyword.value.toLowerCase())
  );
});

const showGcoForm = ref(false);
const showGcoFormEdit = ref(false);
const showGcoDatabase = ref(false);
const showGcoServiceForm = ref(false);
const showGcoServiceDb = ref(false);
const showGcoServiceEdit = ref(false);
const showDeleteModal1 = ref(false);
const showDeleteModal2 = ref(false);
const Delete_GcoProfile = ref(null);
const Delete_GcoService = ref(null);

const { data: gcoService } = useFetch("/api/gcoservices");

const gcoServices = ref({
  service: "",
});

const addGcoService = async (gcoServices) => {
  let addedGcoService = null;
  addedGcoService = await $fetch("/api/gcoservices", {
    method: "POST",
    body: {
      service: gcoServices.service,
    },
  });
  if (addedGcoService) {
    gcoServices.service = "";

    gcoService.value = await $fetch("/api/gcoservices");
  }
};

const editedGcoService = ref({
  id: null,
  service: null,
  isArchive: false,
});

const editGcoService = async (editedGcoService) => {
  let gcoServices = null;

  if (editedGcoService.id)
    gcoServices = await $fetch("/api/gcoservices", {
      method: "PUT",
      body: {
        id: editedGcoService.id,
        service: editedGcoService.service,
        isArchive: editedGcoService.isArchive,
      },
    });
  gcoService.value = await $fetch("/api/gcoservices");
};

const deleteGcoService = async (id) => {
  let deletedGcoService = null;
  if (id)
    deletedGcoService = await $fetch("/api/gcoservices", {
      method: "DELETE",
      body: {
        id,
      },
    });
  gcoService.value = await $fetch("/api/gcoservices");
};

const { data: gcoProfile } = useFetch("/api/gco");

const gco = ref({
  title: "",
  description: "",
});

const addGco = async (gco) => {
  let addedGco = null;
  addedGco = await $fetch("/api/gco", {
    method: "POST",
    body: {
      title: gco.title,
      description: gco.description,
    },
  });
  if (addedGco) {
    gco.title = "";
    gco.description = "";

    gcoProfile.value = await $fetch("/api/gco");
  }
};

const editedGcoProfile = ref({
  id: null,
  title: null,
  description: null,
  isArchive: false,
});

const editGcoProfile = async (editedGcoProfile) => {
  let gcoProfiles = null;

  if (editedGcoProfile.id)
    gcoProfiles = await $fetch("/api/gco", {
      method: "PUT",
      body: {
        id: editedGcoProfile.id,
        title: editedGcoProfile.title,
        description: editedGcoProfile.description,
        isArchive: editedGcoProfile.isArchive,
      },
    });
  gcoProfile.value = await $fetch("/api/gco");
};

const deleteGco = async (id) => {
  let deletedGco = null;
  if (id)
    deletedGco = await $fetch("/api/gco", {
      method: "DELETE",
      body: {
        id,
      },
    });

  gcoProfile.value = await $fetch("/api/gco");
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
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
