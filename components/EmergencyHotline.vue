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
        <div class="modal z-40" v-if="showHotlineEdit">
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
        <div
            v-if="showHotlineDatabase"
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
                :disabled="
                    currentPage * itemsPerPage >= emergencyHotline.length
                "
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showHotlineDatabase">
            <div>
                The database received
                {{ emergencyHotline?.length || 0 }} records:
            </div>
            <div class="table-container">
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
                            v-for="emergencyhotline in pagedHotline"
                            :key="emergencyhotline.id"
                        >
                            <td>{{ emergencyhotline.organization }}</td>
                            <td class="line-clamp-3">
                                {{ emergencyhotline.number }}
                            </td>
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
                                        Do you want to delete this Emergency
                                        Hotline?
                                    </p>
                                    <div class="flex justify-end">
                                        <button
                                            @click="
                                                deleteEmergencyHotline(
                                                    emergencyhotline.id
                                                ),
                                                    (showDeleteModal = false)
                                            "
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            @click="showDeleteModal = false"
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
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedHotline = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return emergencyHotline.value.slice(startIndex, endIndex);
});

const nextPage = () => {
    if (currentPage.value * itemsPerPage < emergencyHotline.value.length) {
        currentPage.value += 1;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};
const showHotlineDatabase = ref(false);
const showHotlineForm = ref(false);
const showHotlineEdit = ref(false);
const showDeleteModal = ref(false);

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
    if (addedEmergencyHotline) {
        emergency_Hotline.organization = "";
        emergency_Hotline.number = "";
        emergency_Hotline.location = "";

        emergencyHotline.value = await $fetch("/api/hotline");
    }
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
