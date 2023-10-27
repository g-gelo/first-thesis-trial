<template>
    <div>
        <h1>Emergency Hotline</h1>
        <div class="btn">
            <button
                v-if="!showHotlineForm"
                @click="
                    ($event) => {
                        showHotlineForm = true;
                    }
                "
            >
                <v-icon>fa-regular fa-plus</v-icon>Create Emergency Hotline Form
            </button>
            <button
                v-if="showHotlineForm"
                @click="
                    ($event) => {
                        showHotlineForm = false;
                    }
                "
            >
                Hide Emergency Hotline Form
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
                            ($event) =>
                                editEmergencyHotline(editedEmergencyHotline)
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
        <div class="btn">
            <button
                v-if="!showHotlineDatabase"
                @click="
                    ($event) => {
                        showHotlineDatabase = true;
                    }
                "
            >
                Show Emergency Hotline Database
            </button>
            <button
                v-if="showHotlineDatabase"
                @click="
                    ($event) => {
                        showHotlineDatabase = false;
                    }
                "
            >
                Hide Emergency Hotline Database
            </button>
        </div>
        <div v-if="showHotlineDatabase">
            <table density="compact">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Number</th>
                        <th>Location</th>
                        <th>Edit & Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="emergencyhotline in emergencyHotline"
                        :key="emergencyhotline.id"
                    >
                        <td>{{ emergencyhotline.organization }}</td>
                        <td>{{ emergencyhotline.number }}</td>
                        <td>{{ emergencyhotline.location }}</td>
                        <td>
                            <v-btn
                                v-if="!showHotlineEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedEmergencyHotline.id =
                                            emergencyhotline.id;
                                        editedEmergencyHotline.organization =
                                            emergencyhotline.organization;
                                        editedEmergencyHotline.number =
                                            emergencyhotline.number;
                                        editedEmergencyHotline.location =
                                            emergencyhotline.location;

                                        showHotlineEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                            <v-btn
                                variant="tonal"
                                @click="
                                    deleteEmergencyHotline(emergencyhotline.id)
                                "
                            >
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const showHotlineDatabase = ref(false);
const showHotlineForm = ref(false);
const showHotlineEdit = ref(false);

const { data: emergencyHotline } = useFetch("/api/hotline");

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
    if (addedEmergencyHotline)
        emergencyHotline.value = await $fetch("/api/hotline");
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
    emergencyHotline.value = await $fetch("/api/hotline");
};

const deleteEmergencyHotline = async (id) => {
    let deletedEmergencyHotline = null;
    if (id)
        deletedEmergencyHotline = await $fetch("/api/hotline", {
            method: "DELETE",
            body: {
                id,
            },
        });
    emergencyHotline.value = await $fetch("/api/hotline");
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
