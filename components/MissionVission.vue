<template>
    <div>
        <h1>Mission and Vision</h1>
        <div class="btn">
            <button
                v-if="!showModalMisnVis"
                @click="
                    ($event) => {
                        showModalMisnVis = true;
                    }
                "
            >
                Mission and Vision Database
            </button>
            <button
                v-if="showModalMisnVis"
                @click="
                    ($event) => {
                        showModalMisnVis = false;
                    }
                "
            >
                Hide Mission and Vision
            </button>
        </div>
        <div class="modal z-40" v-if="showModalMisnVisEdit">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit Mission and Vision</h2>
                <div>
                    <input
                        v-model="editedMisnVis.title"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Title"
                        required
                    />
                    <textarea
                        v-model="editedMisnVis.description"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        @click="($event) => editMisnVis(editedMisnVis)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showModalMisnVisEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="showModalMisnVis"
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
                :disabled="currentPage * itemsPerPage >= missionvision.length"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showModalMisnVis">
            <div>
                The database received
                {{ missionvision?.length || 0 }} records:
            </div>
            <table density="compact">
                <thead>
                    <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="misnvis in pagedMisNVis" :key="misnvis.id">
                        <td>{{ misnvis.title }}</td>
                        <td class="line-clamp-3">{{ misnvis.description }}</td>
                        <td>
                            <v-btn
                                v-if="!showModalMisnVisEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedMisnVis.id = misnvis.id;
                                        editedMisnVis.title = misnvis.title;
                                        editedMisnVis.description =
                                            misnvis.description;
                                        showModalMisnVisEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const currentPage = ref(1);
const itemsPerPage = 2;

const pagedMisNVis = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return missionvision.value.slice(startIndex, endIndex);
});

const nextPage = () => {
    if (currentPage.value * itemsPerPage < missionvision.value.length) {
        currentPage.value += 1;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};
const showModalMisnVis = ref(false);
const showModalMisnVisEdit = ref(false);

const { data: missionvision } = useFetch("/api/missionvision");

const editedMisnVis = ref({
    id: null,
    title: null,
    description: null,
});

const editMisnVis = async (editedMisnVis) => {
    let missionNVision = null;

    if (editedMisnVis.id && editedMisnVis.title && editedMisnVis.description)
        missionNVision = await $fetch("/api/missionvision", {
            method: "PUT",
            body: {
                id: editedMisnVis.id,
                title: editedMisnVis.title,
                description: editedMisnVis.description,
            },
        });
    missionvision.value = await $fetch("/api/missionvision");
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
</style>
