<template>
    <div>
        <h1>Osas Module</h1>
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
                        <th class="text-left">Title</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Edit</th>
                        <th class="text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profile in osas" :key="profile.id">
                        <td>{{ profile.title }}</td>
                        <td class="description">{{ profile.description }}</td>
                        <td>
                            <v-btn
                                v-if="!showOsasEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedMisnVis.id = misnvis.id;
                                        editedMisnVis.description =
                                            misnvis.description;
                                        showOsasEdit = true;
                                    }
                                "
                            >
                                Edit
                            </v-btn>
                        </td>
                        <td>
                            <v-btn
                                v-if="!showOsasEdit"
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
    </div>
</template>

<script setup>
const showOsasModule = ref(false);
const showOsasEdit = ref(false);

const { data: osas } = useFetch("/api/osas");

const deleteOsas = async (id) => {
    if (id)
        return await $fetch("/api/osas", {
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
