<template>
    <div class="flex flex-col">
        <div v-if="data?.subscribed" class="relative z-40">
            <button
                v-if="!showModalSeminar"
                @click="
                    ($event) => {
                        showModalSeminar = true;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-plus</v-icon
                >
            </button>
            <button
                v-if="showModalSeminar"
                @click="
                    ($event) => {
                        showModalSeminar = false;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-minus</v-icon
                >
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
                            for="guest_speaker"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Guest Speaker</label
                        >
                        <input
                            type="text"
                            id="guest"
                            v-model="seminar.guest_speaker"
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
        <div class="modal z-40" v-if="showEditForm">
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
                        @click="($event) => editSeminar(editedSeminar)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showEditForm = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div
                v-for="seminar in seminars"
                :key="seminar.id"
                class="mb-6 bg-white rounded-tr-xl rounded-bl-xl"
            >
                <div class="h-64 flex">
                    <div class="w-24 h-24 bg-secondary-100 relative">
                        <div class="ma-2">
                            <img
                                src="/img/seminarsblob.svg"
                                alt="Seminars Blob"
                                class="top-image absolute top-0 left-0"
                            />
                            <img
                                src="/img/seminaricon.png"
                                alt="Seminars Icon"
                                class="absolute top-0 left-0"
                            />
                        </div>
                        <div class="ml-3 absolute flex flex-col top-20 mt-5">
                            <div class="seminar-info">
                                <v-icon class="ml-6 icon-small"
                                    >fa-regular fa-calendar-days</v-icon
                                ><br />
                                <span class="ml-3 info-value info-small">{{
                                    seminar.date
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-60 p-4 border-l ml-2 border-green-800 relative flex flex-col"
                    >
                        <div class="mt-1 seminar-info">
                            <span class="info-value main-title highlight">
                                <div v-if="data?.subscribed">
                                    <button
                                        class="absolute top-3 right-2 text-sm"
                                        v-if="!showEditForm"
                                        variant="tonal"
                                        @click="
                                            ($event) => {
                                                editedSeminar.id = seminar.id;
                                                editedSeminar.title =
                                                    seminar.title;
                                                editedSeminar.guest_speaker =
                                                    seminar.guest_speaker;
                                                editedSeminar.date =
                                                    seminar.date;
                                                editedSeminar.location =
                                                    seminar.location;
                                                showEditForm = true;
                                            }
                                        "
                                    >
                                        <v-icon color="bg300">
                                            fa-solid fa-pen-to-square
                                        </v-icon>
                                    </button>
                                </div>
                                {{ seminar.title }}
                            </span>
                        </div>
                        <div class="ma-2 seminar-info">
                            <v-icon start class="icon-small"
                                >fa-solid fa-location-dot</v-icon
                            >
                            <span class="info-value info-small">{{
                                seminar.location
                            }}</span>
                        </div>
                        <div class="ma-2 seminar-info">
                            <v-icon start class="icon-small"
                                >fa-solid fa-microphone-lines</v-icon
                            >
                            <span class="info-value info-small">{{
                                seminar.guest_speaker
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: seminars } = useFetch("/api/seminars");
const { data } = useAuth();
const showModalSeminar = ref(false);
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
        // Clear the form
        seminar.title = "";
        seminar.guest_speaker = "";
        seminar.date = "";
        seminar.location = "";

        // Fetch the updated list of seminars
        seminars.value = await $fetch("/api/seminars");
    }
};

const showEditForm = ref(false);

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
