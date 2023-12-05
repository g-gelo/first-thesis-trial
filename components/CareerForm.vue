<template>
    <div>
        <v-container>
            <h1 class="pb-4">Job Career</h1>
            <div class="btn">
                <button
                    v-if="!showModalCareer"
                    @click="
                        ($event) => {
                            showModalCareer = true;
                        }
                    "
                >
                    <v-icon>fa-solid fa-plus</v-icon> Create a Job Career Event
                </button>
                <button
                    v-else
                    @click="
                        ($event) => {
                            showModalCareer = false;
                        }
                    "
                >
                    Hide Job Career Event
                </button>
            </div>
            <div v-if="showModalCareer">
                <h1>Job Career Form</h1>
                <form @submit.prevent="addCareer(career)">
                    <div class="w-full px-4 sm:w-1/2">
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
                    <div class="w-full px-4 sm:w-1/2">
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
                    <div class="w-full px-4 sm:w-1/2">
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
                    <div class="w-full px-4 sm:w-1/2">
                        <label
                            for="location"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Location</label
                        >
                        <input
                            id="location"
                            v-model="career.location"
                            type="text"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Location"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="mt-3 bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
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
                    </div>
                    <div class="flex justify-end">
                        <button
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

            <div class="btn">
                <button
                    v-if="!showCareerDatabase"
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
                    @click="
                        ($event) => {
                            showCareerDatabase = false;
                        }
                    "
                >
                    Hide Job Career Database
                </button>
            </div>
            <div
                v-if="showCareerDatabase"
                class="mt-4 flex items-center justify-center space-x-4 ma-3"
            >
                <div
                    class="flex flex-col items-start sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                >
                    <label for="search" class="text-sm font-semibold"
                        >Search:</label
                    >
                    <input
                        id="search"
                        v-model="searchKeyword"
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
                        id="filter"
                        v-model="selectedFilter"
                        class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="title">Title</option>
                        <option value="location">Location</option>
                        <option value="description">Job Description</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                    </select>
                </div>
                <button
                    class="px-2 py-1 bg-gray-300 text-gray-600 rounded-md focus:outline-none hover:bg-gray-400"
                    @click="resetFilters"
                >
                    Reset Filters
                </button>
            </div>
            <div
                v-if="showCareerDatabase"
                class="mt-4 flex items-center justify-center space-x-4 ma-3"
            >
                <button
                    :disabled="currentPage === 1"
                    class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                    @click="prevPage"
                >
                    &lt; Prev
                </button>
                <span class="text-sm font-semibold">{{ currentPage }}</span>
                <button
                    :disabled="currentPage * itemsPerPage >= careers.length"
                    class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                    @click="nextPage"
                >
                    Next &gt;
                </button>
            </div>
            <div v-if="showCareerDatabase">
                <div>
                    The database received
                    {{ careers?.length || 0 }} records:
                </div>
                <div class="table-container">
                    <table density="compact">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Job Description</th>
                                <th>Edit&Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="job in pagedCareers" :key="job.id">
                                <td class="line-clamp-3">{{ job.title }}</td>
                                <td>{{ job.location }}</td>
                                <td>{{ job.date }}</td>
                                <td class="line-clamp-3">
                                    {{ job.description }}
                                </td>
                                <td>
                                    <v-btn
                                        v-if="!showModal"
                                        variant="tonal"
                                        @click="
                                            ($event) => {
                                                editedCareer.id = job.id;
                                                editedCareer.title = job.title;
                                                editedCareer.description =
                                                    job.description;
                                                editedCareer.date = job.date;
                                                editedCareer.location =
                                                    job.location;
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
                                </td>
                                <div v-if="showDeleteModal" class="modal2">
                                    <div
                                        class="bg-white shadow-lg rounded-lg p-6 w-80"
                                    >
                                        <h2 class="text-xl font-bold mb-4">
                                            Delete Seminar
                                        </h2>
                                        <p class="mb-4">
                                            Do you want to delete this Job
                                            Career?
                                        </p>
                                        <div class="flex justify-end">
                                            <button
                                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                @click="
                                                    deleteCareer(job.id),
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
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
        career[filterKey]
            .toLowerCase()
            .includes(searchKeyword.value.toLowerCase())
    );
});
const { data: careers } = useFetch("/api/careers");

const showModalCareer = ref(false);
const showModal = ref(false);
const showCareerDatabase = ref(false);
const showDeleteModal = ref(false);

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
});

const editCareer = async (editedCareer) => {
    let career = null;

    if (
        editedCareer.id &&
        editedCareer.title &&
        editedCareer.description &&
        editedCareer.date &&
        editedCareer.location
    )
        career = await $fetch("/api/careers", {
            method: "PUT",
            body: {
                id: editedCareer.id,
                title: editedCareer.title,
                description: editedCareer.description,
                date: editedCareer.date,
                location: editedCareer.location,
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
.btn button:active {
    opacity: 0.5;
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
