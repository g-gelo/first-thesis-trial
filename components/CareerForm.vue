<template>
  <div class="p-4">
    <div v-if="showModalCareer" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1>Job Career Form</h1>
        <form @submit.prevent="addCareer(career)">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 sm:w-1/ my-2">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Title</label
              >
              <input
                id="title"
                v-model="career.title"
                type="text"
                name="title"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Title"
                required
              />
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2 my-2">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Job Description</label
              >
              <textarea
                v-model="career.description"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Job Description"
                rows="5"
                required
              ></textarea>
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="date"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Date</label
              >
              <input
                id="date"
                v-model="career.date"
                type="date"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Date"
                required
              />
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="location"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Location</label
              >
              <input
                id="location"
                v-model="career.location"
                type="text"
                class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Location"
                required
              />
            </div>
          </div>
          <button
            v-if="
              data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
            "
            type="submit"
            class="bg-blue-500 mb-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            class="bg-red-500 mb-2 active:bg-red-700 ease-linear text-white font-bold py-2 px-4 rounded"
            @click="showModalCareer = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Career</h2>
        <div>
          <input
            v-model="editedCareer.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="Title"
            required
          />
          <textarea
            v-model="editedCareer.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Job Description"
            rows="5"
            required
          ></textarea>
          <input
            v-model="editedCareer.date"
            type="date"
            class="w-full p-2 border rounded mb-4"
            placeholder="Date"
            required
          />
          <input
            v-model="editedCareer.location"
            class="w-full p-2 border rounded mb-4"
            placeholder="Location"
            required
          />
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status:</label
          >
          <select
            v-model="editedCareer.isArchive"
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
            @click="($event) => editCareer(editedCareer)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div>
      <button
        v-if="!showCareerDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showCareerDatabase = true;
          }
        "
      >
        Show Job Career Database
      </button>
      <button
        v-else
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showCareerDatabase = false;
          }
        "
      >
        Hide Job Career Database
      </button>
    </div>
    <div v-if="showCareerDatabase" class="grid grid-cols-3">
      <div
        class="mt-4 flex items-center justify-center space-x-4 ma-3 col-start-1 col-span-3"
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
            <option value="title">Title</option>
            <option value="location">Location</option>
            <option value="description">Description</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
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
          :disabled="currentPage * itemsPerPage >= careers.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>
      <div class="col-start-1 col-span-3">
        <button
          v-if="!showModalCareer"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showModalCareer = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New Job Career Event
        </button>
      </div>
      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ careers?.length || 0 }} records:
      </div>
    </div>

    <div v-if="showCareerDatabase">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Title</th>
              <th class="py-2 px-4 border-b">Location</th>
              <th class="py-2 px-4 border-b">Date</th>
              <th class="py-2 px-4 border-b">Job Description</th>
              <th class="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in pagedCareers"
              :key="job.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b line-clamp-4">{{ job.title }}</td>
              <td class="py-3 px-4 border-b">{{ job.location }}</td>
              <td class="py-3 px-4 border-b">{{ job.date }}</td>
              <td class="py-3 px-4 border-b line-clamp-4">
                {{ job.description }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showModal"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedCareer.id = job.id;
                        editedCareer.title = job.title;
                        editedCareer.description = job.description;
                        editedCareer.date = job.date;
                        editedCareer.location = job.location;
                        editedCareer.isArchive = job.isArchive;
                        showModal = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    v-if="!showModal"
                    variant="tonal"
                    @click="
                      ($event) => {
                        showDeleteModal = true;
                        Delete_Career = job;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-lg font-bold mb-4">
                      Are you sure you wan to delete this job vacancy?
                    </h2>
                    <p class="mb-2">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <p class="text-slate-600 mb-4">
                      Title: {{ Delete_Career.title }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="
                          data?.user?.role == 'SUPERADMIN' ||
                          data?.user?.role == 'ADMIN'
                        "
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="deleteCareer(job.id), (showDeleteModal = false)"
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

const pagedCareers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredCareer.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < careers.value.length) {
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
const selectedFilter = ref("title");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "title";
  currentPage.value = 1;
};

const filteredCareer = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return careers.value.filter((career) =>
    career[filterKey].toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});
const { data: careers } = useFetch("/api/careers");

const showModalCareer = ref(false);
const showModal = ref(false);
const showCareerDatabase = ref(false);
const showDeleteModal = ref(false);
const Delete_Career = ref(null);

const career = ref({
  title: "",
  description: "",
  date: "",
  location: "",
});

const addCareer = async (career) => {
  let addedCareer = null;

  addedCareer = await $fetch("/api/careers", {
    method: "POST",
    body: {
      title: career.title,
      description: career.description,
      date: career.date,
      location: career.location,
    },
  });
  if (addedCareer) {
    // Clear the form
    career.title = "";
    career.description = "";
    career.date = "";
    career.location = "";

    careers.value = await $fetch("/api/careers");
  }
};

const editedCareer = ref({
  id: null,
  title: null,
  description: null,
  date: null,
  location: null,
  isArchive: false,
});

const editCareer = async (editedCareer) => {
  let career = null;

  if (editedCareer.id)
    career = await $fetch("/api/careers", {
      method: "PUT",
      body: {
        id: editedCareer.id,
        title: editedCareer.title,
        description: editedCareer.description,
        date: editedCareer.date,
        location: editedCareer.location,
        isArchive: editedCareer.isArchive,
      },
    });
  careers.value = await $fetch("/api/careers");
};

const deleteCareer = async (id) => {
  let deletedCareer = null;

  if (id)
    deletedCareer = await $fetch("/api/careers", {
      method: "DELETE",
      body: {
        id,
      },
    });

  careers.value = await $fetch("/api/careers");
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-width: 100%;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
