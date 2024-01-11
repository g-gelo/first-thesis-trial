<template>
  <div>
    <div v-if="showHotlineForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1 class="my-2">Emergency Hotline Form</h1>
        <form
          class="space-y-4"
          @submit.prevent="addEmergencyHotline(emergency_Hotline)"
        >
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Title</label
            >
            <input
              id="title"
              v-model="emergency_Hotline.organization"
              type="text"
              name="title"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Title"
              required
            />
          </div>
          <div>
            <label
              for="number"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Number</label
            >
            <input
              id="number"
              v-model="emergency_Hotline.number"
              type="text"
              name="number"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Number"
              required
            />
          </div>
          <div>
            <label
              for="location"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Location</label
            >
            <input
              id="location"
              v-model="emergency_Hotline.location"
              type="text"
              name="location"
              class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Location"
              required
            />
          </div>
          <button
            v-if="
              data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
            "
            type="submit"
            class="bg-blue-500 mb-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showHotlineForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-if="showHotlineEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Emergency Hotline</h2>
        <div>
          <input
            v-model="editedEmergencyHotline.organization"
            class="w-full p-2 border rounded mb-4"
            placeholder="title"
            required
          />
          <input
            v-model="editedEmergencyHotline.number"
            class="w-full p-2 border rounded mb-4"
            placeholder="number"
            required
          />
          <input
            v-model="editedEmergencyHotline.location"
            class="w-full p-2 border rounded mb-4"
            placeholder="location"
            required
          />
          <select
            v-model="editedEmergencyHotline.isArchive"
            class="w-full p-2 border rounded mb-4"
          >
            <option :value="false">Active</option>
            <option :value="true">Archived</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            v-if="
              data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
            "
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editEmergencyHotline(editedEmergencyHotline)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showHotlineEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="btn">
      <button
        v-if="!showHotlineDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showHotlineDatabase = true;
          }
        "
      >
        Show Emergency Hotline Database
      </button>
      <button
        v-if="showHotlineDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showHotlineDatabase = false;
          }
        "
      >
        Hide Emergency Hotline Database
      </button>
    </div>
    <div v-if="showHotlineDatabase" class="grid grid-cols-3">
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
            <option value="organization">Organization</option>
            <option value="number">Number</option>
            <option value="location">Location</option>
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
        class="mt-4 flex items-center justify-center space-x-4 ma-3 col-start-1 col-span-3"
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
          :disabled="currentPage * itemsPerPage >= emergencyHotline.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-start-1 col-span-3">
        <button
          v-if="!showHotlineForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showHotlineForm = true;
            }
          "
        >
          <v-icon>fa-regular fa-plus</v-icon> Add New Hotline Emergency
        </button>
      </div>
      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ emergencyHotline?.length || 0 }} records:
      </div>
    </div>
    <div v-if="showHotlineDatabase">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Organization</th>
              <th class="py-2 px-4 border-b">Number</th>
              <th class="py-2 px-4 border-b">Location</th>
              <th class="py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emergencyhotline in pagedHotline"
              :key="emergencyhotline.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">
                {{ emergencyhotline.organization }}
              </td>
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ emergencyhotline.number }}
              </td>
              <td class="py-3 px-4 border-b">
                {{ emergencyhotline.location }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showHotlineEdit"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedEmergencyHotline.id = emergencyhotline.id;
                        editedEmergencyHotline.organization =
                          emergencyhotline.organization;
                        editedEmergencyHotline.number = emergencyhotline.number;
                        editedEmergencyHotline.location =
                          emergencyhotline.location;
                        editedEmergencyHotline.isArchive =
                          emergencyhotline.isArchive;
                        showHotlineEdit = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    @click="
                      ($event) => {
                        showDeleteModal = true;
                        Delete_Hotline = emergencyhotline;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-lg font-bold mb-4">
                      Are you sure you wan to delete this Emergency Hotline?
                    </h2>
                    <p class="mb-2">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <p class="text-slate-600 mb-4">
                      Organization: {{ Delete_Hotline.organization }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteEmergencyHotline(Delete_Hotline.id),
                            (showDeleteModal = false)
                        "
                      >
                        Delete
                      </button>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="showDeleteModal = false"
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

const pagedHotline = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredHotline.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < emergencyHotline.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
// Filtering
const searchKeyword = ref("");
const selectedFilter = ref("organization");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "organization";
  currentPage.value = 1;
};

const filteredHotline = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return emergencyHotline.value.filter((emergency_Hotline) =>
    emergency_Hotline[filterKey]
      .toLowerCase()
      .includes(searchKeyword.value.toLowerCase())
  );
});
const showHotlineDatabase = ref(false);
const showHotlineForm = ref(false);
const showHotlineEdit = ref(false);
const showDeleteModal = ref(false);
const Delete_Hotline = ref(null);

const { data: emergencyHotline } = useFetch("/api/hotline");

const emergency_Hotline = ref({
  organization: "",
  number: "",
  location: "",
});

const addEmergencyHotline = async (emergency_Hotline) => {
  let addedEmergencyHotline = null;
  addedEmergencyHotline = await $fetch("/api/hotline", {
    method: "POST",
    body: {
      organization: emergency_Hotline.organization,
      number: emergency_Hotline.number,
      location: emergency_Hotline.location,
    },
  });
  if (addedEmergencyHotline) {
    emergency_Hotline.organization = "";
    emergency_Hotline.number = "";
    emergency_Hotline.location = "";

    emergencyHotline.value = await $fetch("/api/hotline");
  }
};

const editedEmergencyHotline = ref({
  id: null,
  organization: null,
  number: null,
  location: null,
  isArchive: null,
});

const editEmergencyHotline = async (editedEmergencyHotline) => {
  let emergencyHotlines = null;

  if (editedEmergencyHotline.id)
    emergencyHotlines = await $fetch("/api/hotline", {
      method: "PUT",
      body: {
        id: editedEmergencyHotline.id,
        organization: editedEmergencyHotline.organization,
        number: editedEmergencyHotline.number,
        location: editedEmergencyHotline.location,
        isArchive: editedEmergencyHotline.isArchive,
      },
    });
  emergencyHotline.value = await $fetch("/api/hotline");
};

const deleteEmergencyHotline = async (id) => {
  let deletedEmergencyHotline = null;
  if (id)
    deletedEmergencyHotline = await $fetch("/api/hotline", {
      method: "DELETE",
      body: {
        id,
      },
    });
  emergencyHotline.value = await $fetch("/api/hotline");
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-width: 100%;
}
.btn button {
  display: flex;
  width: 100%;
  padding: 1em;
  justify-content: center;
  margin-bottom: 2em;
  background-color: #d1d1d1;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
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

.btn button:active {
  opacity: 0.5;
}
</style>
