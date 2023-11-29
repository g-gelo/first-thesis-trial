<template>
    <div class="content-container">
        <v-container>
            <div>
                <MissionVission />
            </div>
            <div>
                <OsasModule />
            </div>
            <div>
                <GCOProfile />
            </div>
            <div>
                <EmergencyHotline />
            </div>
            <div>
                <FaqsForm />
            </div>
            <h1 class="pb-4">Seminar</h1>
            <div class="btn">
                <button
                    v-if="!showModalSeminar"
                    @click="
                        ($event) => {
                            showModalSeminar = true;
                        }
                    "
                >
                    <v-icon>fa-solid fa-plus</v-icon> Create a Seminar
                </button>
                <button
                    v-if="showModalSeminar"
                    @click="
                        ($event) => {
                            showModalSeminar = false;
                        }
                    "
                >
                    Hide Function Database
                </button>
            </div>
            <div v-if="showModalSeminar">
                <h1>Seminar Form</h1>
                <form class="space-y-4" @submit.prevent="addSeminar(seminar)">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full px-4 sm:w-1/2">
                            <label
                                for="title"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Title</label
                            >
                            <input
                                type="text"
                                id="title"
                                name="title"
                                v-model="seminar.title"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div class="w-full px-4">
                            <label
                                for="description"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Guest Speaker</label
                            >
                            <input
                                type="text"
                                id="description"
                                v-model="seminar.description"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Guest Speaker"
                                required
                            />
                        </div>
                        <div class="w-full px-4 sm:w-1/2">
                            <label
                                for="date"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Date</label
                            >
                            <input
                                type="text"
                                id="date"
                                v-model="seminar.date"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Date"
                                required
                            />
                            <span class="text-overline">ex. July 18</span>
                        </div>
                        <div class="w-full px-4">
                            <label
                                for="time"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Time</label
                            >
                            <input
                                type="text"
                                id="time"
                                v-model="seminar.time"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Time"
                                required
                            />
                            <span class="text-overline"
                                >ex. 08:00AM - 10:00AM</span
                            >
                        </div>
                        <div class="w-full px-4 sm:w-1/2">
                            <label
                                for="location"
                                class="block mb-2 text-sm font-medium text-gray-900"
                                >Location</label
                            >
                            <input
                                type="text"
                                id="location"
                                v-model="seminar.location"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Location"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div class="modal" v-if="showModal">
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
                            v-model="editedSeminar.description"
                            class="w-full p-2 border rounded mb-4"
                            placeholder="Guest Speaker"
                        />
                        <input
                            v-model="editedSeminar.date"
                            class="w-full p-2 border rounded mb-4"
                            placeholder="Date"
                            required
                        />
                        <input
                            v-model="editedSeminar.time"
                            class="w-full p-2 border rounded mb-4"
                            placeholder="Time"
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
                            @click="($event) => editSeminar(editedSeminar)"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            @click="showModal = false"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div class="btn">
                <button
                    v-if="!showSeminarDatabase"
                    @click="
                        ($event) => {
                            showSeminarDatabase = true;
                        }
                    "
                >
                    Show Seminar Database
                </button>
                <button
                    v-else="showSeminarDatabase"
                    @click="
                        ($event) => {
                            showSeminarDatabase = false;
                        }
                    "
                >
                    Hide Seminar Database
                </button>
            </div>
            <div
                v-if="showSeminarDatabase"
                class="mt-4 flex items-center justify-center space-x-4"
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
                    :disabled="currentPage * itemsPerPage >= seminars.length"
                    class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                >
                    Next &gt;
                </button>
            </div>
            <v-col v-if="showSeminarDatabase">
                <div>
                    The database received
                    {{ seminars?.length || 0 }} records:
                </div>
                <div class="overscroll-y-none">
                    <div class="overscroll-x-auto">
                        <table density="compact" class="min-w-full">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Location</th>
                                    <th>Edit&Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="meeting in pagedSeminars"
                                    :key="meeting.id"
                                >
                                    <td class="line-clamp-3">
                                        {{ meeting.title }}
                                    </td>
                                    <td>{{ meeting.description }}</td>
                                    <td>{{ meeting.date }}</td>
                                    <td>{{ meeting.time }}</td>
                                    <td class="line-clamp-3">
                                        {{ meeting.location }}
                                    </td>
                                    <td>
                                        <v-btn
                                            v-if="!showModal"
                                            variant="tonal"
                                            @click="
                                                ($event) => {
                                                    editedSeminar.id =
                                                        meeting.id;
                                                    editedSeminar.title =
                                                        meeting.title;
                                                    editedSeminar.description =
                                                        meeting.description;
                                                    editedSeminar.date =
                                                        meeting.date;
                                                    editedSeminar.time =
                                                        meeting.time;
                                                    editedSeminar.location =
                                                        meeting.location;
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
                                    <div class="modal2" v-if="showDeleteModal">
                                        <div
                                            class="bg-white shadow-lg rounded-lg p-6 w-80"
                                        >
                                            <h2 class="text-xl font-bold mb-4">
                                                Delete Seminar
                                            </h2>
                                            <p class="mb-4">
                                                Do you want to delete this
                                                Seminar?
                                            </p>
                                            <div class="flex justify-end">
                                                <button
                                                    @click="
                                                        deleteSeminar(
                                                            meeting.id
                                                        ),
                                                            (showDeleteModal = false)
                                                    "
                                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    @click="
                                                        showDeleteModal = false
                                                    "
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
            </v-col>
        </v-container>
        <CareerForm />
    </div>
</template>

<script setup>
import { ref } from "vue";
import CareerForm from "~/components/CareerForm.vue";

useHead({
    title: "Admin",
});
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedSeminars = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return seminars.value.slice(startIndex, endIndex);
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

const showModalSeminar = ref(false);
const showModal = ref(false);
const showSeminarDatabase = ref(false);
const showDeleteModal = ref(false);

const { data: seminars } = useFetch("/api/seminars");

const seminar = ref({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
});

const addSeminar = async (seminar) => {
    let addedSeminar = null;

    addedSeminar = await $fetch("/api/seminars", {
        method: "POST",
        body: {
            title: seminar.title,
            description: seminar.description,
            date: seminar.date,
            time: seminar.time,
            location: seminar.location,
        },
    });
    if (addedSeminar) {
        seminar.title = "";
        seminar.description = "";
        seminar.date = "";
        seminar.time = "";
        seminar.location = "";

        seminars.value = await $fetch("/api/seminars");
    }
};

const editedSeminar = ref({
    id: null,
    title: null,
    description: null,
    date: null,
    time: null,
    location: null,
});

const editSeminar = async (editedSeminar) => {
    let seminar = null;

    if (
        editedSeminar.id &&
        editedSeminar.title &&
        editedSeminar.description &&
        editedSeminar.date &&
        editedSeminar.time &&
        editedSeminar.location
    )
        seminar = await $fetch("/api/seminars", {
            method: "PUT",
            body: {
                id: editedSeminar.id,
                title: editedSeminar.title,
                description: editedSeminar.description,
                date: editedSeminar.date,
                time: editedSeminar.time,
                location: editedSeminar.location,
            },
        });
    seminars.value = await $fetch("/api/seminars");
};

const deleteSeminar = async (id) => {
    let deletedSeminar = null;
    if (id)
        deletedSeminar = await $fetch("/api/seminars", {
            method: "DELETE",
            body: {
                id,
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
.career {
    z-index: 1;
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

.content-container {
    height: 550vh;
}
</style>
