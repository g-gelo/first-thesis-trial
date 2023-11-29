<template>
    <div>
        <h1 class="pb-4">FAQs</h1>
        <div class="btn">
            <button
                v-if="!showFaqsForm"
                @click="
                    ($event) => {
                        showFaqsForm = true;
                    }
                "
            >
                <v-icon>fa-solid fa-plus</v-icon> Create FAQs Form
            </button>
            <button
                v-else="showFaqsForm"
                @click="
                    ($event) => {
                        showFaqsForm = false;
                    }
                "
            >
                Hide FAQs Form
            </button>
        </div>
        <div v-if="showFaqsForm">
            <h1>FAQs Form</h1>
            <form class="space-y-4" @submit.prevent="addFaqs(faq)">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full px-4 sm:w-1/2">
                        <label
                            for="keyword"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Keyword</label
                        >
                        <input
                            type="text"
                            id="keyword"
                            name="keyword"
                            v-model="faq.keyword"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Keyword"
                            required
                        />
                    </div>
                    <div class="w-full px-4">
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
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Answer"
                            required
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded mb-2"
                >
                    Submit
                </button>
            </form>
        </div>
        <div class="modal" v-if="showEditFaqsForm">
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
                </div>
                <div class="flex justify-end">
                    <button
                        @click="($event) => editFaqs(editedFaqs)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showEditFaqsForm = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="btn">
            <button
                v-if="!showFaqsTable"
                @click="
                    ($event) => {
                        showFaqsTable = true;
                    }
                "
            >
                Show FAQs Database
            </button>
            <button
                v-else="showFaqsTable"
                @click="
                    ($event) => {
                        showFaqsTable = false;
                    }
                "
            >
                Hide FAQs Database
            </button>
        </div>
        <div
            v-if="showFaqsTable"
            class="mt-4 flex items-center justify-center space-x-4 ma-3"
        >
            <div
                class="flex flex-col items-start sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
            >
                <label for="search" class="text-sm font-semibold"
                    >Search:</label
                >
                <input
                    v-model="searchKeyword"
                    id="search"
                    type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search"
                />
            </div>
            <div class="flex items-center space-x-2">
                <label for="filter" class="text-sm font-semibold"
                    >Filter:</label
                >
                <select
                    v-model="selectedFilter"
                    id="filter"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="keyword">Keyword</option>
                    <option value="answer">Answer</option>
                </select>
            </div>
            <button
                @click="resetFilters"
                class="px-2 py-1 bg-gray-300 text-gray-600 rounded-md focus:outline-none hover:bg-gray-400"
            >
                Reset Filters
            </button>
        </div>
        <div
            v-if="showFaqsTable"
            class="mt-4 flex items-center justify-center space-x-4 ma-3"
        >
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
            >
                &lt; Prev
            </button>
            <span class="text-sm font-semibold">{{ currentPage }}</span>
            <button
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= allFaqs.length"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showFaqsTable">
            <div>
                The database received
                {{ allFaqs?.length || 0 }} records:
            </div>
            <div class="table-container">
                <table density="compact" class="min-w-full">
                    <thead>
                        <tr>
                            <th>Keyword</th>
                            <th>Answer</th>
                            <th>Edit&Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="faqs in pagedFaqs" :key="faqs.id">
                            <td>
                                {{ faqs.keyword }}
                            </td>
                            <td class="line-clamp-1">
                                {{ faqs.answer }}
                            </td>
                            <td>
                                <v-btn
                                    v-if="!showEditFaqsForm"
                                    variant="tonal"
                                    @click="
                                        ($event) => {
                                            editedFaqs.id = faqs.id;
                                            editedFaqs.keyword = faqs.keyword;
                                            editedFaqs.answer = faqs.answer;
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
                                        }
                                    "
                                >
                                    Delete
                                </v-btn>
                            </td>
                            <div class="modal2" v-if="showDeleteFaqsForm">
                                <div
                                    class="bg-white shadow-lg rounded-lg p-6 w-80"
                                >
                                    <h2 class="text-xl font-bold mb-4">
                                        Delete FAQs
                                    </h2>
                                    <p class="mb-4">
                                        Do you want to delete this FAQs?
                                    </p>
                                    <div class="flex justify-end">
                                        <button
                                            @click="
                                                deleteFaqs(faqs.id),
                                                    (showDeleteFaqsForm = false)
                                            "
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            @click="showDeleteFaqsForm = false"
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
// Filtering
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
});

const editFaqs = async (editedFaqs) => {
    let faqs = null;

    if (editedFaqs.id && editedFaqs.keyword && editedFaqs.answer)
        faqs = await $fetch("/api/faq", {
            method: "PUT",
            body: {
                id: editedFaqs.id,
                keyword: editedFaqs.keyword,
                answer: editedFaqs.answer,
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
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
}
td {
    height: 100px;
}
td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
tr:nth-child(odd) {
    background-color: #b5bbc4;
}
</style>
