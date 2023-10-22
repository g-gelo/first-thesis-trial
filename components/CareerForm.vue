<template>
    <div class="show">
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
                    v-else="showModalCareer"
                    @click="
                        ($event) => {
                            showModalCareer = false;
                        }
                    "
                >
                    <v-icon>fa-solid fa-plus</v-icon> Hide Job Career Event
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
                            type="text"
                            id="title"
                            name="title"
                            v-model="career.title"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Title"
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
                            v-model="career.date"
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
                            v-model="career.time"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Time"
                            required
                        />
                        <span class="text-overline">ex. 08:00AM - 10:00AM</span>
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
                            v-model="career.location"
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
                <v-card>
                    <v-card-title>Edit Career</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="editedCareer.title"
                            label="Title"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="editedCareer.date"
                            label="Date"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="editedCareer.time"
                            label="Time"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="editedCareer.location"
                            label="Location"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            @click="($event) => editCareer(editedCareer)"
                            >Save</v-btn
                        >
                        <v-btn color="error" @click="showModal = false"
                            >Cancel</v-btn
                        >
                    </v-card-actions>
                </v-card>
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
                    v-else="showCareerDatabase"
                    @click="
                        ($event) => {
                            showCareerDatabase = false;
                        }
                    "
                >
                    Hide Job Career Database
                </button>
            </div>
            <v-col v-if="showCareerDatabase">
                <div>
                    The database received
                    {{ careers?.length || 0 }} records:
                </div>
                <div>
                    <table density="compact">
                        <thead>
                            <tr>
                                <th class="text-left">Title</th>
                                <th class="text-left">Date</th>
                                <th class="text-left">Time</th>
                                <th class="text-left">Location</th>
                                <th class="text-left">Edit</th>
                                <th class="text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="job in careers" :key="job.id">
                                <td>{{ job.title }}</td>
                                <td>{{ job.date }}</td>
                                <td>{{ job.time }}</td>
                                <td>{{ job.location }}</td>
                                <td>
                                    <v-btn
                                        v-if="!showModal"
                                        variant="tonal"
                                        @click="
                                            ($event) => {
                                                editedCareer.id = job.id;
                                                editedCareer.title = job.title;
                                                editedCareer.date = job.date;
                                                editedCareer.time = job.time;
                                                editedCareer.location =
                                                    job.location;
                                                showModal = true;
                                            }
                                        "
                                    >
                                        Edit
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn
                                        v-if="!showModal"
                                        variant="tonal"
                                        @click="deleteCareer(job.id)"
                                    >
                                        Delete
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-col>
        </v-container>
    </div>
</template>

<script setup>
const { data: careers } = useFetch("/api/careers");

const showModalCareer = ref(false);
const showModal = ref(false);
const showCareerDatabase = ref(false);

const career = ref({
    title: "",
    date: "",
    time: "",
    location: "",
});

const addCareer = async (career) => {
    return await $fetch("/api/careers", {
        method: "POST",
        body: {
            title: career.title,
            date: career.date,
            time: career.time,
            location: career.location,
        },
    });
};

const editedCareer = ref({
    id: null,
    title: null,
    date: null,
    time: null,
    location: null,
});

const editCareer = async (editedCareer) => {
    let career = null;

    if (
        editedCareer.id &&
        editedCareer.title &&
        editedCareer.date &&
        editedCareer.time &&
        editedCareer.location
    )
        career = await $fetch("/api/careers", {
            method: "PUT",
            body: {
                id: editedCareer.id,
                title: editedCareer.title,
                date: editedCareer.date,
                time: editedCareer.time,
                location: editedCareer.location,
            },
        });
    if (career) career.value = await getCareers();
};

const deleteCareer = async (id) => {
    if (id)
        return await $fetch("/api/careers", {
            method: "DELETE",
            body: {
                id,
            },
        });

    if (career.value) career.value = await getCareer;
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
</style>
