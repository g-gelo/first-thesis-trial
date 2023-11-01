<template>
    <div v-if="data?.subscribed" class="relative">
        <button
            v-if="!showHotlineForm"
            @click="
                ($event) => {
                    showHotlineForm = true;
                }
            "
            class="absolute top-0 right-0 text-lg"
        >
            <v-icon class="pa-5" color="bg300"
                >fa-regular fa-square-plus</v-icon
            >
        </button>
        <button
            v-if="showHotlineForm"
            @click="
                ($event) => {
                    showHotlineForm = false;
                }
            "
            class="absolute top-0 right-0 text-lg"
        >
            <v-icon class="pa-5" color="bg300"
                >fa-regular fa-square-minus</v-icon
            >
        </button>
    </div>
    <div v-if="showHotlineForm">
        <h1>Emergency Hotline Form</h1>
        <form
            class="space-y-4"
            @submit.prevent="addEmergencyHotline(emergency_Hotline)"
        >
            <div>
                <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Title</label
                >
                <input
                    type="text"
                    id="title"
                    v-model="emergency_Hotline.organization"
                    name="title"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Title"
                    required
                />
            </div>
            <div>
                <label
                    for="number"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Number</label
                >
                <input
                    type="text"
                    id="number"
                    v-model="emergency_Hotline.number"
                    name="number"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Number"
                    required
                />
            </div>
            <div>
                <label
                    for="location"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Location</label
                >
                <input
                    type="text"
                    id="location"
                    v-model="emergency_Hotline.location"
                    name="location"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Location"
                    required
                />
            </div>
            <button
                type="submit"
                class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    </div>
    <div v-if="showHotlineEdit">
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-xl font-bold mb-4">Edit Emergency Hotline</h2>
            <div>
                <input
                    v-model="editedEmergencyHotline.organization"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="title"
                    required
                />
                <input
                    v-model="editedEmergencyHotline.number"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="number"
                    required
                />
                <input
                    v-model="editedEmergencyHotline.location"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="location"
                    required
                />
            </div>
            <div class="flex justify-end">
                <button
                    @click="
                        ($event) => editEmergencyHotline(editedEmergencyHotline)
                    "
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Save
                </button>
                <button
                    @click="showHotlineEdit = false"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
    <div
        v-for="emergency in hotline"
        :key="emergency.id"
        class="mb-6 rounded-xl bg-white mt-12"
    >
        <div class="flex items-start">
            <div class="w-24 h-24 bg-secondary-100 relative">
                <div class="ma-2">
                    <img
                        src="/img/careersblob.svg"
                        alt="Emergency Blob"
                        class="top-image absolute top-0 left-0"
                    />
                    <img
                        src="/img/emergencyIcon.png"
                        alt="Emergency Icon"
                        class="absolute"
                    />
                </div>
            </div>
            <div class="w-60 p-4 border-l ml-2 border-green-800 relative">
                <div class="mt-1 seminar-info">
                    <span class="info-value main-title highlight"
                        >{{ emergency.organization }}
                        <div v-if="data?.subscribed" class="relative">
                            <button
                                class="absolute bottom-10 right-0 text-lg"
                                v-if="!showHotlineEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedEmergencyHotline.id =
                                            emergency.id;
                                        editedEmergencyHotline.organization =
                                            emergency.organization;
                                        editedEmergencyHotline.number =
                                            emergency.number;
                                        editedEmergencyHotline.location =
                                            emergency.location;
                                        showHotlineEdit = true;
                                    }
                                "
                            >
                                <v-icon color="bg300">
                                    fa-solid fa-pen-to-square
                                </v-icon>
                            </button>
                        </div></span
                    >
                </div>
                <div class="mt-5 ma-2 seminar-info">
                    <v-icon class="icon-small mr-3"
                        >fa-solid fa-location-dot</v-icon
                    >
                    <span class="info-value info-small pa-0">{{
                        emergency.location
                    }}</span>
                </div>
                <div class="mt-5 ma-2 seminar-info">
                    <v-icon class="icon-small mr-3">fa-solid fa-phone</v-icon>
                    <span class="info-value info-small pa-0">{{
                        emergency.number
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data } = useAuth();
const { data: hotline } = useFetch("/api/hotline");
const showHotlineForm = ref(false);
const showHotlineEdit = ref(false);

const emergency_Hotline = ref({
    organization: "",
    number: "",
    location: "",
});

const addEmergencyHotline = async (emergency_Hotline) => {
    let addedEmergencyHotline = null;
    addedEmergencyHotline = await $fetch("/api/hotline", {
        method: "POST",
        body: {
            organization: emergency_Hotline.organization,
            number: emergency_Hotline.number,
            location: emergency_Hotline.location,
        },
    });
    if (addedEmergencyHotline) hotline.value = await $fetch("/api/hotline");
};

const editedEmergencyHotline = ref({
    id: null,
    organization: null,
    number: null,
    location: null,
});

const editEmergencyHotline = async (editedEmergencyHotline) => {
    let emergencyHotlines = null;

    if (
        editedEmergencyHotline.id &&
        editedEmergencyHotline.organization &&
        editedEmergencyHotline.number &&
        editedEmergencyHotline.location
    )
        emergencyHotlines = await $fetch("/api/hotline", {
            method: "PUT",
            body: {
                id: editedEmergencyHotline.id,
                organization: editedEmergencyHotline.organization,
                number: editedEmergencyHotline.number,
                location: editedEmergencyHotline.location,
            },
        });
    hotline.value = await $fetch("/api/hotline");
};
</script>

<style scoped>
.highlight {
    font-weight: bold;
}
.main-title {
    font-size: clamp(1.2rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}

.info-small {
    font-size: 14px;
}
.icon-small {
    font-size: 17px;
}
</style>
