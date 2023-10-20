bf
<template>
    <div class="content-container">
        <v-container>
            <div>
                <MissionVission />
            </div>
            <div>
                <OsasModule />
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
            </div>
            <div v-if="showModalSeminar">
                <h1>Seminar Form</h1>

                <form class="space-y-4" @submit.prevent="addSeminar(seminar)">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full px-4 sm:w-1/2">
                            <label
                                for="title"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >Guest Speaker</label
                            >
                            <textarea
                                id="description"
                                name="description"
                                v-model="seminar.description"
                                rows="4"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Guest Speaker"
                                auto-grow
                            ></textarea>
                        </div>
                        <div class="w-full px-4 sm:w-1/2">
                            <label
                                for="date"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            <v-container>
                <div v-if="showModal" class="modal career">
                    <v-card>
                        <v-card-title>Edit Seminar</v-card-title>
                        <v-card-text>
                            <!-- Input fields to edit the seminar data -->
                            <v-text-field
                                v-model="editedSeminar.title"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.description"
                                label="Guest Speaker"
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.date"
                                label="Date"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.time"
                                label="Time"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.location"
                                label="Location"
                                required
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="($event) => editSeminar(editedSeminar)"
                                >Save</v-btn
                            >
                            <v-btn color="error" @click="showModal = false"
                                >Cancel</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </div>
            </v-container>
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
            <v-col v-if="showSeminarDatabase">
                <div>
                    The database received
                    {{ seminars?.length || 0 }} records:
                </div>
                <div>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th class="text-left">Title</th>
                                <th class="text-left">Description</th>
                                <th class="text-left">Date</th>
                                <th class="text-left">Time</th>
                                <th class="text-left">Location</th>
                                <th class="text-left">Edit</th>
                                <th class="text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="meeting in seminars" :key="meeting.id">
                                <td>{{ meeting.title }}</td>
                                <td>{{ meeting.description }}</td>
                                <td>{{ meeting.date }}</td>
                                <td>{{ meeting.time }}</td>
                                <td>{{ meeting.location }}</td>
                                <td>
                                    <v-btn
                                        v-if="!showModal"
                                        variant="tonal"
                                        @click="
                                            ($event) => {
                                                editedSeminar.id = meeting.id;
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
                                </td>
                                <td>
                                    <!-- Show the Delete button only if the modal is not open -->
                                    <v-btn
                                        v-if="!showModal"
                                        variant="tonal"
                                        @click="deleteSeminar(meeting.id)"
                                    >
                                        Delete
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-col>
        </v-container>
        <div>
            <CareerForm />
        </div>
        <v-btn
            v-if="!showModal"
            class="rounded-xl shadow-xl p-2 m-2"
            @click="signOut()"
        >
            sign out
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CareerForm from "~/components/CareerForm.vue";

useHead({
    title: "Admin",
});

const { signOut } = useAuth();

const showModalSeminar = ref(false);
const showModal = ref(false);
const showSeminarDatabase = ref(false);

const { data: seminars } = useFetch("/api/seminars");

const seminar = ref({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
});

const addSeminar = async (seminar) => {
    return await $fetch("/api/seminars", {
        method: "POST",
        body: {
            title: seminar.title,
            description: seminar.description,
            date: seminar.date,
            time: seminar.time,
            location: seminar.location,
        },
    });
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
    if (seminar) seminar.value = await getSeminars();
};

const deleteSeminar = async (id) => {
    if (id)
        return await $fetch("/api/seminars", {
            method: "DELETE",
            body: {
                id,
            },
        });

    if (seminar.value) seminar.value = await getSeminar;
};
</script>

<style scoped>
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
.show {
    z-index: -1;
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
.modal > .v-card {
    max-width: 400px;
    width: 100%;
}
.content-container {
    height: 550vh;
}

.btn2 {
    appearance: none;
    background-color: #003b1b;
    border-radius: 6px;
    color: #fff;
    font-size: 1em;
    padding: 0.4em 1.2em;
    user-select: none;
}

.btn2:active {
    background-color: #9bc0f7;
}
</style>
