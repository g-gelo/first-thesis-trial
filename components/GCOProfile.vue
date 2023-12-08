<template>
    <div>
        <h1>Guidance and Counseling Profile</h1>
        <div class="btn mt-3">
            <button
                v-if="!showGcoForm"
                @click="
                    ($event) => {
                        showGcoForm = true;
                    }
                "
            >
                <v-icon>fa-solid fa-plus</v-icon> Create a GCO Profile
            </button>
            <button
                v-if="showGcoForm"
                @click="
                    ($event) => {
                        showGcoForm = false;
                    }
                "
            >
                Hide GCO Profile
            </button>
        </div>
        <div v-if="showGcoForm" class="shadow-lg p-3 mb-4">
            <h1>GCO Profile Form</h1>
            <form class="space-y-4" @submit.prevent="addGco(gco)">
                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Title</label
                    >
                    <input
                        id="title"
                        v-model="gco.title"
                        type="text"
                        name="title"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <label
                        for="description"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Description</label
                    >
                    <textarea
                        id="description"
                        v-model="gco.description"
                        name="description"
                        rows="4"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>
                <button
                    v-if="data?.user?.role == `SUPERADMIN`"
                    type="submit"
                    class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
        <div class="btn mt-3">
            <button
                v-if="!showGcoDatabase"
                @click="
                    ($event) => {
                        showGcoDatabase = true;
                    }
                "
            >
                Show GCO Profile Database
            </button>
            <button
                v-if="showGcoDatabase"
                @click="
                    ($event) => {
                        showGcoDatabase = false;
                    }
                "
            >
                Hide GCO Profile Database
            </button>
        </div>

        <div v-if="showGcoFormEdit" class="modal z-40">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit GCO Profile</h2>
                <div>
                    <input
                        v-model="editedGcoProfile.title"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                    <textarea
                        v-model="editedGcoProfile.description"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        v-if="data?.user?.role == `SUPERADMIN`"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="($event) => editGcoProfile(editedGcoProfile)"
                    >
                        Save
                    </button>
                    <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="showGcoFormEdit = false"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="showGcoDatabase"
            class="mt-4 flex items-center justify-center space-x-4 ma-4"
        >
            <button
                :disabled="currPage === 1"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                @click="prev_Page"
            >
                &lt; Prev
            </button>
            <span class="text-sm font-semibold">{{ currPage }}</span>
            <button
                :disabled="currPage * itemsInPage >= gcoProfile.length"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                @click="next_Page"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showGcoDatabase">
            <div>
                The database received
                {{ gcoProfile?.length || 0 }} records:
            </div>
            <div class="table-container">
                <table density="compact">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Edit & Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="guidance in pagedProfile" :key="guidance.id">
                            <td>{{ guidance.title }}</td>
                            <td class="line-clamp-3">
                                {{ guidance.description }}
                            </td>
                            <td>
                                <v-btn
                                    v-if="!showGcoFormEdit"
                                    variant="tonal"
                                    @click="
                                        ($event) => {
                                            editedGcoProfile.id = guidance.id;
                                            editedGcoProfile.title =
                                                guidance.title;
                                            editedGcoProfile.description =
                                                guidance.description;
                                            showGcoFormEdit = true;
                                        }
                                    "
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    variant="tonal"
                                    @click="
                                        ($event) => {
                                            showDeleteModal2 = true;
                                        }
                                    "
                                >
                                    Delete
                                </v-btn>
                            </td>
                            <div v-if="showDeleteModal2" class="modal2">
                                <div
                                    class="bg-white shadow-lg rounded-lg p-6 w-80"
                                >
                                    <h2 class="text-xl font-bold mb-4">
                                        Delete Seminar
                                    </h2>
                                    <p class="mb-4">
                                        Do you want to delete this Profile?
                                    </p>
                                    <div class="flex justify-end">
                                        <button
                                            v-if="
                                                data?.user?.role == `SUPERADMIN`
                                            "
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            @click="
                                                deleteGco(guidance.id),
                                                    (showDeleteModal2 = false)
                                            "
                                        >
                                            Delete
                                        </button>
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            @click="showDeleteModal2 = false"
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

        <div class="btn mt-3">
            <button
                v-if="!showGcoServiceForm"
                @click="
                    ($event) => {
                        showGcoServiceForm = true;
                    }
                "
            >
                <v-icon>fa-solid fa-plus</v-icon> Create a GCO Service
            </button>
            <button
                v-if="showGcoServiceForm"
                @click="
                    ($event) => {
                        showGcoServiceForm = false;
                    }
                "
            >
                Hide GCO Service
            </button>
        </div>

        <div v-if="showGcoServiceForm" class="mb-4">
            <div class="shadow-lg rounded-lg">
                <h1 class="m-2">Service Form</h1>
                <form
                    class="space-y-4"
                    @submit.prevent="addGcoService(gcoServices)"
                >
                    <div>
                        <label
                            for="function"
                            class="block ma-2 text-sm font-medium text-gray-900"
                            >Service</label
                        >
                        <input
                            id="function"
                            v-model="gcoServices.service"
                            type="text"
                            name="function"
                            class="shadow-sm text-white m-3 w-10/12 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            placeholder="Function"
                            required
                        />
                    </div>
                    <button
                        v-if="data?.user?.role == `SUPERADMIN`"
                        type="submit"
                        class="bg-blue-500 ma-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

        <div class="btn mt-3">
            <button
                v-if="!showGcoServiceDb"
                @click="
                    ($event) => {
                        showGcoServiceDb = true;
                    }
                "
            >
                Show GCO Services
            </button>
            <button
                v-if="showGcoServiceDb"
                @click="
                    ($event) => {
                        showGcoServiceDb = false;
                    }
                "
            >
                Hide GCO Services
            </button>
        </div>

        <div v-if="showGcoServiceEdit" class="modal z-40">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit GCO Service</h2>
                <div>
                    <input
                        v-model="editedGcoService.service"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        v-if="data?.user?.role == `SUPERADMIN`"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        @click="($event) => editGcoService(editedGcoService)"
                    >
                        Save
                    </button>
                    <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="showGcoServiceEdit = false"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="showGcoServiceDb"
            class="mt-4 flex items-center justify-center space-x-4 ma-4"
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
                    <option value="service">Services</option>
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
            v-if="showGcoServiceDb"
            class="mt-4 flex items-center justify-center space-x-4 ma-4"
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
                :disabled="currentPage * itemsPerPage >= gcoService.length"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                @click="nextPage"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showGcoServiceDb">
            <div>
                The database received
                {{ gcoService?.length || 0 }} records:
            </div>
            <div class="table-container">
                <table density="compact">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Edit & Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="service in pagedService" :key="service.id">
                            <td>{{ service.service }}</td>
                            <td>
                                <v-btn
                                    v-if="!showGcoServiceEdit"
                                    variant="tonal"
                                    @click="
                                        ($event) => {
                                            editedGcoService.id = service.id;
                                            editedGcoService.service =
                                                service.service;
                                            showGcoServiceEdit = true;
                                        }
                                    "
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    variant="tonal"
                                    @click="
                                        ($event) => {
                                            showDeleteModal1 = true;
                                        }
                                    "
                                >
                                    Delete
                                </v-btn>
                            </td>
                            <div v-if="showDeleteModal1" class="modal2">
                                <div
                                    class="bg-white shadow-lg rounded-lg p-6 w-80"
                                >
                                    <h2 class="text-xl font-bold mb-4">
                                        Delete Seminar
                                    </h2>
                                    <p class="mb-4">
                                        Do you want to delete this Service?
                                    </p>
                                    <div class="flex justify-end">
                                        <button
                                            v-if="
                                                data?.user?.role == `SUPERADMIN`
                                            "
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            @click="
                                                deleteGcoService(service.id),
                                                    (showDeleteModal1 = false)
                                            "
                                        >
                                            Delete
                                        </button>
                                        <button
                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            @click="showDeleteModal1 = false"
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
const { data } = useAuth();

// Pagination
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedService = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredService.value.slice(startIndex, endIndex);
});

const nextPage = () => {
    if (currentPage.value * itemsPerPage < gcoService.value.length) {
        currentPage.value += 1;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};
// above is pagination for Services, and below is Pagination for Profile
const currPage = ref(1);
const itemsInPage = 3;

const pagedProfile = computed(() => {
    const startIndex = (currPage.value - 1) * itemsInPage;
    const endIndex = startIndex + itemsInPage;
    return gcoProfile.value.slice(startIndex, endIndex);
});

const next_Page = () => {
    if (currPage.value * itemsInPage < gcoProfile.value.length) {
        currPage.value += 1;
    }
};

const prev_Page = () => {
    if (currPage.value > 1) {
        currPage.value -= 1;
    }
};
// Filtering
const searchKeyword = ref("");
const selectedFilter = ref("service");

const resetFilters = () => {
    searchKeyword.value = "";
    selectedFilter.value = "service";
    currentPage.value = 1;
};

const filteredService = computed(() => {
    const filterKey = selectedFilter.value.toLowerCase();
    return gcoService.value.filter((gcoServices) =>
        gcoServices[filterKey]
            .toLowerCase()
            .includes(searchKeyword.value.toLowerCase())
    );
});

const showGcoForm = ref(false);
const showGcoFormEdit = ref(false);
const showGcoDatabase = ref(false);
const showGcoServiceForm = ref(false);
const showGcoServiceDb = ref(false);
const showGcoServiceEdit = ref(false);
const showDeleteModal1 = ref(false);
const showDeleteModal2 = ref(false);

const { data: gcoService } = useFetch("/api/gcoservices");

const gcoServices = ref({
    service: "",
});

const addGcoService = async (gcoServices) => {
    let addedGcoService = null;
    addedGcoService = await $fetch("/api/gcoservices", {
        method: "POST",
        body: {
            service: gcoServices.service,
        },
    });
    if (addedGcoService) {
        gcoServices.service = "";

        gcoService.value = await $fetch("/api/gcoservices");
    }
};

const editedGcoService = ref({
    id: null,
    service: null,
});

const editGcoService = async (editedGcoService) => {
    let gcoServices = null;

    if (editedGcoService.id && editedGcoService.service)
        gcoServices = await $fetch("/api/gcoservices", {
            method: "PUT",
            body: {
                id: editedGcoService.id,
                service: editedGcoService.service,
            },
        });
    gcoService.value = await $fetch("/api/gcoservices");
};

const deleteGcoService = async (id) => {
    let deletedGcoService = null;
    if (id)
        deletedGcoService = await $fetch("/api/gcoservices", {
            method: "DELETE",
            body: {
                id,
            },
        });
    gcoService.value = await $fetch("/api/gcoservices");
};

const { data: gcoProfile } = useFetch("/api/gco");

const gco = ref({
    title: "",
    description: "",
});

const addGco = async (gco) => {
    let addedGco = null;
    addedGco = await $fetch("/api/gco", {
        method: "POST",
        body: {
            title: gco.title,
            description: gco.description,
        },
    });
    if (addedGco) {
        gco.title = "";
        gco.description = "";

        gcoProfile.value = await $fetch("/api/gco");
    }
};

const editedGcoProfile = ref({
    id: null,
    title: null,
    description: null,
});

const editGcoProfile = async (editedGcoProfile) => {
    let gcoProfiles = null;

    if (
        editedGcoProfile.id &&
        editedGcoProfile.title &&
        editedGcoProfile.description
    )
        gcoProfiles = await $fetch("/api/gco", {
            method: "PUT",
            body: {
                id: editedGcoProfile.id,
                title: editedGcoProfile.title,
                description: editedGcoProfile.description,
            },
        });
    gcoProfile.value = await $fetch("/api/gco");
};

const deleteGco = async (id) => {
    let deletedGco = null;
    if (id)
        deletedGco = await $fetch("/api/gco", {
            method: "DELETE",
            body: {
                id,
            },
        });

    gcoProfile.value = await $fetch("/api/gco");
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
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
