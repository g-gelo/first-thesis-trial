<template>
    <div class="flex flex-col">
        <div v-if="data?.subscribed" class="relative">
            <button
                v-if="!showModalCareer"
                @click="
                    ($event) => {
                        showModalCareer = true;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-plus</v-icon
                >
            </button>
            <button
                v-if="showModalCareer"
                @click="
                    ($event) => {
                        showModalCareer = false;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-minus</v-icon
                >
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

        <div class="modal z-40" v-if="showEditCareerForm">
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
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Date"
                        required
                    />
                    <input
                        v-model="editedCareer.time"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Time"
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
                        @click="($event) => editCareer(editedCareer)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showEditCareerForm = false"
                        class="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <div
                v-for="career in careers"
                :key="career.id"
                class="mb-6 bg-white rounded-tr-xl rounded-bl-xl"
            >
                <div class="h-64 flex">
                    <div class="w-24 h-24 bg-secondary-100 relative">
                        <div class="ma-2">
                            <img
                                src="/img/careersblob.svg"
                                alt="Careers Blob"
                                class="top-image absolute top-0 left-0"
                            />
                            <img
                                src="/img/careersicon.png"
                                alt="Careers Icon"
                                class="absolute top-0 left-0"
                            />
                        </div>
                        <div class="ml-3 absolute flex flex-col top-20 mt-5">
                            <div class="seminar-info">
                                <v-icon class="ml-6 icon-small"
                                    >fa-regular fa-calendar-days</v-icon
                                ><br />
                                <span class="ml-3 info-value info-small">{{
                                    career.date
                                }}</span>
                            </div>
                            <div class="seminar-info">
                                <v-icon class="ml-6 icon-small"
                                    >fa-regular fa-clock</v-icon
                                ><br />
                                <span class="ml-2 info-value info-small">{{
                                    career.time
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-60 p-4 border-l ml-2 border-green-800 relative flex flex-col gap-4"
                    >
                        <div class="mt-1 seminar-info ma-2">
                            <span class="info-value main-title highlight">
                                <div v-if="data?.subscribed">
                                    <button
                                        class="absolute top-3 right-2 text-sm"
                                        v-if="!showEditCareerForm"
                                        variant="tonal"
                                        @click="
                                            ($event) => {
                                                editedCareer.id = career.id;
                                                editedCareer.title =
                                                    career.title;
                                                editedCareer.description =
                                                    career.description;
                                                editedCareer.date = career.date;
                                                editedCareer.time = career.time;
                                                editedCareer.location =
                                                    career.location;
                                                showEditCareerForm = true;
                                            }
                                        "
                                    >
                                        <v-icon class="text-sm" color="bg300">
                                            fa-solid fa-pen-to-square
                                        </v-icon>
                                    </button>
                                </div>
                                {{ career.title }}</span
                            >
                            <div class="ma-2 seminar-info">
                                <v-icon start class="icon-small"
                                    >fa-solid fa-location-dot</v-icon
                                >
                                <span class="info-value info-small pa-0">{{
                                    career.location
                                }}</span>
                            </div>
                            <button
                                class="mt-2 text-sm underline cursor-pointer text-blue-500"
                                @click="
                                    ($event) => {
                                        showDetailedModal = true;
                                        detailedCareer = career;
                                    }
                                "
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="showDetailedModal">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Job Career Details</h2>
                <div>
                    <h3 class="text-lg font-semibold">
                        {{ detailedCareer.title }}
                    </h3>
                    <div class="seminar-info ma-2">
                        <v-icon class="ml-6 icon-small"
                            >fa-regular fa-calendar-days</v-icon
                        >
                        <span class="ml-3 info-value info-small">{{
                            detailedCareer.date
                        }}</span>
                    </div>
                    <div class="seminar-info ma-2">
                        <v-icon class="ml-6 icon-small"
                            >fa-regular fa-clock</v-icon
                        >
                        <span class="ml-2 info-value info-small">{{
                            detailedCareer.time
                        }}</span>
                    </div>
                    <div class="ma-2 seminar-info">
                        <v-icon start class="icon-small"
                            >fa-solid fa-location-dot</v-icon
                        >
                        <span class="info-value info-small pa-0">{{
                            detailedCareer.location
                        }}</span>
                    </div>
                    <div class="ma-2">
                        <p>{{ detailedCareer.description }}</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        @click="showDetailedModal = false"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: careers } = useFetch("/api/careers");
const { data } = useAuth();
const showModalCareer = ref(false);
const showEditCareerForm = ref(false);
const showDetailedModal = ref(false);
const detailedCareer = ref(null);

const career = ref({
    title: "",
    description: "",
    date: "",
    time: "",
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
            time: career.time,
            location: career.location,
        },
    });
    if (addedCareer) {
        // Clear the form
        career.title = "";
        career.description = "";
        career.date = "";
        career.time = "";
        career.location = "";

        careers.value = await $fetch("/api/careers");
    }
};

const editedCareer = ref({
    id: null,
    title: null,
    description: null,
    date: null,
    time: null,
    location: null,
});

const editCareer = async (editedCareer) => {
    let career = null;

    if (
        editedCareer.id &&
        editedCareer.title &&
        editedCareer.description &&
        editedCareer.date &&
        editedCareer.time &&
        editedCareer.location
    )
        career = await $fetch("/api/careers", {
            method: "PUT",
            body: {
                id: editedCareer.id,
                title: editedCareer.title,
                description: editedCareer.description,
                date: editedCareer.date,
                time: editedCareer.time,
                location: editedCareer.location,
            },
        });
    careers.value = await $fetch("/api/careers");
};
</script>

<style scoped>
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
.highlight {
    font-weight: bold;
}
.main-title {
    font-size: clamp(1.2rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}
.space-on-left {
    padding-left: 10px;
    margin-right: 10px;
}
.seminar-details {
    margin-top: 10px;
}
.seminar-info {
    margin-bottom: 5px;
}
.info-small {
    font-size: 14px;
}
.icon-small {
    font-size: 20px;
}
</style>
