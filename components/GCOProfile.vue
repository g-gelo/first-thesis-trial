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
        <div v-if="showGcoForm">
            <h1>GCO Profile Form</h1>
            <form class="space-y-4" @submit.prevent="addGco(gco)">
                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Title</label
                    >
                    <input
                        type="text"
                        id="title"
                        v-model="gco.title"
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

        <div v-if="showGcoFormEdit">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit GCO Profile</h2>
                <div>
                    <input
                        v-model="editedGcoProfile.title"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                    <input
                        v-model="editedGcoProfile.description"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="description"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        @click="($event) => editGcoProfile(editedGcoProfile)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showGcoFormEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showGcoDatabase">
            <table density="compact">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Edit & Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="gco in gcoProfile" :key="gco.id">
                        <td>{{ gco.title }}</td>
                        <td>{{ gco.description }}</td>
                        <td>
                            <v-btn
                                v-if="!showGcoFormEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedGcoProfile.id = gco.id;
                                        editedGcoProfile.title = gco.title;
                                        editedGcoProfile.description =
                                            gco.description;
                                        showGcoFormEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                            <v-btn variant="tonal" @click="deleteGco(gco.id)">
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
const showGcoForm = ref(false);
const showGcoFormEdit = ref(false);
const showGcoDatabase = ref(false);

const { data: gcoProfile } = useFetch("/api/gco");

const gco = ref({
    title: "",
    description: "",
});

const addGco = async (gco) => {
    return await $fetch("/api/gco", {
        method: "POST",
        body: {
            title: gco.title,
            description: gco.description,
        },
    });
};

const editedGcoProfile = ref({
    id: null,
    title: null,
    description: null,
});

const editGcoProfile = async (editedGcoProfile) => {
    let gcoProfile = null;

    if (
        editedGcoProfile.id &&
        editedGcoProfile.title &&
        editedGcoProfile.description
    )
        gcoProfile = await $fetch("/api/gco", {
            method: "PUT",
            body: {
                id: editedGcoProfile.id,
                title: editedGcoProfile.title,
                description: editedGcoProfile.description,
            },
        });
};

const deleteGco = async (id) => {
    if (id)
        return await $fetch("/api/gco", {
            method: "DELETE",
            body: {
                id,
            },
        });

    if (osas.value) osas.value = await getOsas;
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
