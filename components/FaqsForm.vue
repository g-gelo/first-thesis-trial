<template>
  <div>
    <div v-if="showFaqsForm" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1>FAQs Form</h1>
        <form class="space-y-4" @submit.prevent="addFaqs(faq)">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="keyword"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Keyword</label
              >
              <input
                id="keyword"
                v-model="faq.keyword"
                type="text"
                name="keyword"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Keyword"
                required
              />
            </div>
            <div class="w-full px-4 sm:w-1/2 my-2">
              <label
                for="answer"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Answer</label
              >
              <textarea
                id="answer"
                v-model="faq.answer"
                name="answer"
                rows="4"
                class="shadow-sm mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Answer"
                required
              ></textarea>
            </div>
          </div>
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
            type="submit"
            class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded mb-2"
          >
            Submit
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showFaqsForm = false"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-if="showEditFaqsForm" class="modal">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit FAQs</h2>
        <div>
          <input
            v-model="editedFaqs.keyword"
            class="w-full p-2 border rounded mb-4"
            placeholder="Keyword"
            required
          />
          <textarea
            v-model="editedFaqs.answer"
            class="w-full p-2 border rounded mb-4"
            placeholder="Answer"
            rows="5"
            required
          ></textarea>
          <select
            v-model="editedFaqs.isArchive"
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
            @click="($event) => editFaqs(editedFaqs)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showEditFaqsForm = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="btn">
      <button
        v-if="!showFaqsTable"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showFaqsTable = true;
          }
        "
      >
        Show FAQs Database
      </button>
      <button
        v-else
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
        @click="
          ($event) => {
            showFaqsTable = false;
          }
        "
      >
        Hide FAQs Database
      </button>
    </div>
    <div v-if="showFaqsTable" class="grid grid-cols-3">
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
            <option value="keyword">Keyword</option>
            <option value="answer">Answer</option>
          </select>
        </div>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md border border-blue-500 hover:bg-blue-700 focus:outline-none focus:border-blue-700"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
      <div class="col-start-1 col-span-3">
        <button
          v-if="!showFaqsForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all w-full p-2"
          @click="
            ($event) => {
              showFaqsForm = true;
            }
          "
        >
          <v-icon>fa-solid fa-plus</v-icon> Add New FAQs
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
          :disabled="currentPage * itemsPerPage >= allFaqs.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>

      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received
        {{ allFaqs?.length || 0 }} records:
      </div>
    </div>

    <div v-if="showFaqsTable">
      <div class="table-container">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Keyword</th>
              <th class="py-2 px-4 border-b">Answer</th>
              <th class="py-2 px-4 border-b">Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="faqs in pagedFaqs" :key="faqs.id">
              <td class="py-3 px-4 border-b">{{ faqs.keyword }}</td>
              <td class="py-3 px-4 border-b line-clamp-2">{{ faqs.answer }}</td>
              <td class="py-3 px-4 border-b">
                <div class="flex items-center space-x-2">
                  <v-btn
                    v-if="!showEditFaqsForm"
                    variant="tonal"
                    @click="
                      ($event) => {
                        editedFaqs.id = faqs.id;
                        editedFaqs.keyword = faqs.keyword;
                        editedFaqs.answer = faqs.answer;
                        editedFaqs.isArchive = faqs.isArchive;
                        showEditFaqsForm = true;
                      }
                    "
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    v-if="!showEditFaqsForm"
                    variant="tonal"
                    @click="
                      ($event) => {
                        showDeleteFaqsForm = true;
                        Delete_Faqs = faqs;
                      }
                    "
                  >
                    Delete
                  </v-btn>
                </div>
                <div v-if="showDeleteFaqsForm" class="modal2">
                  <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-lg font-bold mb-4">
                      Are you sure you wan to delete this Seminar?
                    </h2>
                    <p class="mb-2">
                      This will delete this post permanently. You cannot undo
                      this action.
                    </p>
                    <p class="text-slate-600 mb-4">
                      Keyword: {{ Delete_Faqs.keyword }}
                    </p>
                    <div class="flex justify-end">
                      <button
                        v-if="data?.user?.role == 'SUPERADMIN'"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="
                          deleteFaqs(Delete_Faqs.id), (showDeleteFaqsForm = false)
                        "
                      >
                        Delete
                      </button>
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="showDeleteFaqsForm = false"
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

const pagedFaqs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredFaqs.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < allFaqs.value.length) {
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
const selectedFilter = ref("keyword");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "keyword";
  currentPage.value = 1;
};

const filteredFaqs = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return allFaqs.value.filter((faq) =>
    faq[filterKey].toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

const showFaqsForm = ref(false);
const showFaqsTable = ref(false);
const showEditFaqsForm = ref(false);
const showDeleteFaqsForm = ref(false);
const Delete_Faqs = ref(null);

const { data: allFaqs } = useFetch("/api/faq");

const faq = ref({
  keyword: "",
  answer: "",
});

const addFaqs = async (faq) => {
  let addedFaqs = null;

  addedFaqs = await $fetch("/api/faq", {
    method: "POST",
    body: {
      keyword: faq.keyword,
      answer: faq.answer,
    },
  });
  if (addedFaqs) {
    faq.keyword = "";
    faq.answer = "";

    allFaqs.value = await $fetch("/api/faq");
  }
};

const editedFaqs = ref({
  id: null,
  keyword: null,
  answer: null,
  isArchive: false,
});

const editFaqs = async (editedFaqs) => {
  let faqs = null;

  if (editedFaqs.id)
    faqs = await $fetch("/api/faq", {
      method: "PUT",
      body: {
        id: editedFaqs.id,
        keyword: editedFaqs.keyword,
        answer: editedFaqs.answer,
        isArchive: editedFaqs.isArchive,
      },
    });
  allFaqs.value = await $fetch("/api/faq");
};
const deleteFaqs = async (id) => {
  let deletedFaqs = null;
  if (id)
    deletedFaqs = await $fetch("/api/faq", {
      method: "DELETE",
      body: {
        id,
      },
    });

  allFaqs.value = await $fetch("/api/faq");
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
</style>
