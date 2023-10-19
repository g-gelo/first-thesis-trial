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

        <div v-if="showModalMisnVis">
            <div v-if="showModalMisnVisEdit" class="modal">
                <v-card>
                    <v-card-title>Edit Mission and Vision</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="editedMisnVis.description"
                            label="description"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            @click="($event) => editMisnVis(editedMisnVis)"
                            >Save</v-btn
                        >
                        <v-btn
                            color="error"
                            @click="showModalMisnVisEdit = false"
                            >Cancel</v-btn
                        >
                    </v-card-actions>
                </v-card>
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
                    <tr v-for="misnvis in missionvision" :key="misnvis.id">
                        <td>{{ misnvis.title }}</td>
                        <td class="description">{{ misnvis.description }}</td>
                        <td>
                            <v-btn
                                v-if="!showModalMisnVisEdit"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedMisnVis.id = misnvis.id;
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
const showModalMisnVis = ref(false);
const showModalMisnVisEdit = ref(false);

const { data: missionvision } = useFetch("/api/missionvision");

const editedMisnVis = ref({
    id: null,
    title: null,
    description: null,
});

const editMisnVis = async (editedMisnVis) => {
    let MisnVis = null;

    if (editedMisnVis.id && editedMisnVis.title && editedMisnVis.description)
        MisnVis = await $fetch("/api/missionvision", {
            method: "PUT",
            body: {
                id: editedMisnVis.id,
                title: editedMisnVis.title,
                description: editedMisnVis.description,
            },
        });
    if (universityMissionVision) missionvision.value = await getMisnVis();
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
