<template>
    <div>
        <h1>Osas Module</h1>

        <div class="btn mt-3">
            <button
                v-if="!showOsasForm"
                @click="
                    ($event) => {
                        showOsasForm = true;
                    }
                "
            >
                <v-icon>fa-solid fa-plus</v-icon> Create Osas Card
            </button>
            <button
                v-if="showOsasForm"
                @click="
                    ($event) => {
                        showOsasForm = false;
                    }
                "
            >
                Cancel Creating Osas Card
            </button>
        </div>
        <div v-if="showOsasForm">
            <h1>Osas Form</h1>
            <form class="space-y-4" @submit.prevent="addOsas(osas)">
                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Title</label
                    >
                    <input
                        type="text"
                        id="title"
                        v-model="osas.title"
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
                        v-model="osas.description"
                        name="description"
                        rows="4"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
        <div v-if="showOsasEdit" class="modal career z-40">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit Osas Module</h2>
                <div>
                    <input
                        v-model="editedOsasModule.title"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                    <textarea
                        v-model="editedOsasModule.description"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        @click="($event) => editOsasModule(editedOsasModule)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showOsasEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="btn">
            <button
                v-if="!showOsasModule"
                @click="
                    ($event) => {
                        showOsasModule = true;
                    }
                "
            >
                Show Osas Database
            </button>
            <button
                v-if="showOsasModule"
                @click="
                    ($event) => {
                        showOsasModule = false;
                    }
                "
            >
                Hide Osas Database
            </button>
        </div>
        <div v-if="showOsasModule">
            <table density="compact">
                <thead>
                    <tr>
                        <th class="w-25">Title</th>
                        <th class="w-25">Description</th>
                        <th class="w-25">Edit & Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profile in osasAll" :key="profile.id">
                        <td>{{ profile.title }}</td>
                        <td>{{ profile.description }}</td>
                        <td>
                            <v-btn
                                v-if="!showOsasEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedOsasModule.id = profile.id;
                                        editedOsasModule.title = profile.title;
                                        editedOsasModule.description =
                                            profile.description;
                                        showOsasEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                            <v-btn
                                variant="tonal"
                                @click="deleteOsas(profile.id)"
                            >
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn mt-3">
            <button
                v-if="!showFunctionForm"
                @click="
                    ($event) => {
                        showFunctionForm = true;
                    }
                "
            >
                <v-icon>fa-solid fa-plus</v-icon> Create Osas Function
            </button>
            <button
                v-if="showFunctionForm"
                @click="
                    ($event) => {
                        showFunctionForm = false;
                    }
                "
            >
                Cancel Creating Osas Function
            </button>
        </div>
        <div v-if="showFunctionForm" class="mb-4">
            <div class="bg-white shadow-lg rounded-lg">
                <h1 class="m-2">Function Form</h1>
                <form
                    class="space-y-4"
                    @submit.prevent="addOsasFunction(oFunction)"
                >
                    <div>
                        <label
                            for="function"
                            class="block ma-2 text-sm font-medium text-gray-900"
                            >Function</label
                        >
                        <input
                            type="text"
                            id="function"
                            v-model="oFunction.osasFunction"
                            name="function"
                            class="shadow-sm m-3 w-10/12 text-color text-white bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            placeholder="Function"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="bg-blue-500 ma-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
        <div class="btn">
            <button
                v-if="!showFunction"
                @click="
                    ($event) => {
                        showFunction = true;
                    }
                "
            >
                Show Function Database
            </button>
            <button
                v-if="showFunction"
                @click="
                    ($event) => {
                        showFunction = false;
                    }
                "
            >
                Hide Function Database
            </button>
        </div>
        <div class="modal z-40" v-if="showFunctionEdit">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit Osas Function</h2>
                <div>
                    <input
                        v-model="editedOsasFunction.osasFunction"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        @click="
                            ($event) => editOsasFunction(editedOsasFunction)
                        "
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showFunctionEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showFunction">
            <table density="compact">
                <thead>
                    <tr>
                        <th class="w-25">Function</th>
                        <th class="w-25">Edit & Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="purpose in osasFunction" :key="purpose.id">
                        <td>{{ purpose.osasFunction }}</td>
                        <td>
                            <v-btn
                                v-if="!showFunctionEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedOsasFunction.id = purpose.id;
                                        editedOsasFunction.osasFunction =
                                            purpose.osasFunction;
                                        showFunctionEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                            <v-btn
                                variant="tonal"
                                @click="deleteFunction(purpose.id)"
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
const showOsasModule = ref(false);
const showOsasEdit = ref(false);
const showOsasForm = ref(false);
const showFunction = ref(false);
const showFunctionEdit = ref(false);
const showFunctionForm = ref(false);

const { data: osasFunction } = useFetch("/api/osasfunction");

const oFunction = ref({
    osasFunction: "",
});

const addOsasFunction = async (oFunction) => {
    let addedFunction = null;

    addedFunction = await $fetch("/api/osasfunction", {
        method: "POST",
        body: {
            osasFunction: oFunction.osasFunction,
        },
    });
    if (addedFunction) osasFunction.value = await $fetch("/api/osasfunction");
};

const editedOsasFunction = ref({
    id: null,
    osasFunction: null,
});

const editOsasFunction = async (editedOsasFunction) => {
    let osasFunctions = null;

    if (editedOsasFunction.id && editedOsasFunction.osasFunction)
        osasFunctions = await $fetch("/api/osasfunction", {
            method: "PUT",
            body: {
                id: editedOsasFunction.id,
                osasFunction: editedOsasFunction.osasFunction,
            },
        });
    osasFunction.value = await $fetch("/api/osasfunction");
};

const deleteFunction = async (id) => {
    let deletedFunction = null;
    if (id)
        deletedFunction = await $fetch("/api/osasfunction", {
            method: "DELETE",
            body: {
                id,
            },
        });
    osasFunction.value = await $fetch("/api/osasfunction");
};

const { data: osasAll } = useFetch("/api/osas");

const osas = ref({
    title: "",
    description: "",
});

const addOsas = async (osas) => {
    let addedOsas = null;
    addedOsas = await $fetch("/api/osas", {
        method: "POST",
        body: {
            title: osas.title,
            description: osas.description,
        },
    });
    if (addedOsas) osasAll.value = await $fetch("/api/osas");
};

const editedOsasModule = ref({
    id: null,
    title: null,
    description: null,
});

const editOsasModule = async (editedOsasModule) => {
    let osasModule = null;

    if (
        editedOsasModule.id &&
        editedOsasModule.title &&
        editedOsasModule.description
    )
        osasModule = await $fetch("/api/osas", {
            method: "PUT",
            body: {
                id: editedOsasModule.id,
                title: editedOsasModule.title,
                description: editedOsasModule.description,
            },
        });
    osasAll.value = await $fetch("/api/osas");
};

const deleteOsas = async (id) => {
    let deletedOsas = null;
    if (id)
        deletedOsas = await $fetch("/api/osas", {
            method: "DELETE",
            body: {
                id,
            },
        });

    osasAll.value = await $fetch("/api/osas");
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
.description {
    overflow: hidden;
    height: 20%;
    text-overflow: ellipsis;
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
