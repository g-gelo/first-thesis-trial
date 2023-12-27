<template>
  <div class="p-4">
    <div v-if="showModalSeminar" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1>Seminar Form</h1>
        <form class="space-y-4" @submit.prevent="addSeminar(seminar)">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Title</label
              >
              <input
                id="title"
                v-model="seminar.title"
                type="text"
                name="title"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Title"
                required
              />
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="guest_speaker"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Guest Speaker</label
              >
              <input
                id="description"
                v-model="seminar.guest_speaker"
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Guest Speaker"
                required
              />
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="date"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Date</label
              >
              <input
                id="date"
                v-model="seminar.date"
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
                v-model="seminar.location"
                type="text"
                class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Location"
                required
              />
            </div>
          </div>
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
            type="submit"
            class="bg-blue-500 mb-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showModalSeminar = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Seminar</h2>
        <div>
          <input
            v-model="editedSeminar.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="Title"
            required
          />
          <input
            v-model="editedSeminar.guest_speaker"
            class="w-full p-2 border rounded mb-4"
            placeholder="Guest Speaker"
          />
          <input
            v-model="editedSeminar.date"
            type="date"
            class="w-full p-2 border rounded mb-4"
            placeholder="Date"
            required
          />
          <input
            v-model="editedSeminar.location"
            class="w-full p-2 border rounded mb-4"
            placeholder="Location"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            v-if="
              data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
            "
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editSeminar(editedSeminar)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div>
      <button
        v-if="!showSeminarDatabase"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showSeminarDatabase = true;
          }
        "
      >
        Show Seminar Database
      </button>
      <button
        v-else
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showSeminarDatabase = false;
          }
        "
      >
        Hide Seminar Database
      </button>
    </div>
    <div v-if="showSeminarDatabase" class="grid grid-cols-3">
      <div
        class="mt-4 flex items-center justify-center space-x-4 col-start-1 col-span-3"
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
            <option value="guest_speaker">Speaker</option>
            <option value="date">Date</option>
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
          :disabled="currentPage * itemsPerPage >= seminars.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>

      <div class="col-start-1 col-span-3">
        <button
          v-if="!showModalSeminar"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showModalSeminar = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New Seminar
        </button>
      </div>

      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ seminars?.length || 0 }} records:
      </div>
    </div>

    <div v-if="showSeminarDatabase">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Title</th>
              <th class="py-2 px-4 border-b">Speaker</th>
              <th class="py-2 px-4 border-b">Date</th>
              <th class="py-2 px-4 border-b">Location</th>
              <th class="py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meeting in pagedSeminars" :key="meeting.id">
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ meeting.title }}
              </td>
              <td class="py-3 px-4 border-b">{{ meeting.guest_speaker }}</td>
              <td class="py-3 px-4 border-b">{{ meeting.date }}</td>
              <td class="py-3 px-4 border-b line-clamp-2">
                {{ meeting.location }}
              </td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showModal"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedSeminar.id = meeting.id;
                        editedSeminar.title = meeting.title;
                        editedSeminar.guest_speaker = meeting.guest_speaker;
                        editedSeminar.date = meeting.date;
                        editedSeminar.location = meeting.location;
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
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteModal" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-xl font-bold mb-4">Delete Seminar</h2>
                    <p class="mb-4">
                      Do you want to delete this Seminar? {{ meeting.title }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="
                          data?.user?.role == 'SUPERADMIN' ||
                          data?.user?.role == 'ADMIN'
                        "
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteSeminar(editedSeminar.id),
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

useHead({
  title: "Admin",
});
// Pagination
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedSeminars = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredSeminar.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < seminars.value.length) {
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

const filteredSeminar = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return seminars.value.filter((seminar) =>
    seminar[filterKey].toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

const showModalSeminar = ref(false);
const showModal = ref(false);
const showSeminarDatabase = ref(false);
const showDeleteModal = ref(false);

const { data: seminars } = useFetch("/api/seminars");

const seminar = ref({
  title: "",
  guest_speaker: "",
  date: "",
  location: "",
});

const addSeminar = async (seminar) => {
  let addedSeminar = null;

  addedSeminar = await $fetch("/api/seminars", {
    method: "POST",
    body: {
      title: seminar.title,
      guest_speaker: seminar.guest_speaker,
      date: seminar.date,
      location: seminar.location,
    },
  });
  if (addedSeminar) {
    seminar.title = "";
    seminar.guest_speaker = "";
    seminar.date = "";
    seminar.location = "";

    seminars.value = await $fetch("/api/seminars");
  }
};

const editedSeminar = ref({
  id: null,
  title: null,
  guest_speaker: null,
  date: null,
  location: null,
});

const editSeminar = async (editedSeminar) => {
  let seminar = null;

  if (
    editedSeminar.id &&
    editedSeminar.title &&
    editedSeminar.guest_speaker &&
    editedSeminar.date &&
    editedSeminar.location
  )
    seminar = await $fetch("/api/seminars", {
      method: "PUT",
      body: {
        id: editedSeminar.id,
        title: editedSeminar.title,
        guest_speaker: editedSeminar.guest_speaker,
        date: editedSeminar.date,
        location: editedSeminar.location,
      },
    });
  seminars.value = await $fetch("/api/seminars");
};

const deleteSeminar = async (editedSeminar) => {
  let deletedSeminar = null;
  if (editedSeminar.id)
    deletedSeminar = await $fetch("/api/seminars", {
      method: "DELETE",
      body: {
        id: editedSeminar.id,
      },
    });

  seminars.value = await $fetch("/api/seminars");
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
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
</style>
