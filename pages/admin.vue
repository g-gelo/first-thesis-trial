<template>
    <div>
        <v-container>
            <h1>Seminar Form</h1>
            <v-form @submit.prevent="addSeminar(seminar)">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="seminar.title"
                            label="Title"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            v-model="seminar.description"
                            label="Description (optional)"
                            auto-grow
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <label for="date">Date: </label>
                        <input
                            id="date"
                            v-model="seminar.date"
                            type="date"
                            required
                        />
                    </v-col>
                    <v-col>
                        <label for="time">Time: </label>
                        <input
                            id="time"
                            v-model="seminar.time"
                            type="text"
                            required
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="seminar.location"
                            label="Location"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-btn type="submit" color="primary">Submit</v-btn>
            </v-form>
            <v-container>
                <div v-if="showModal" class="modal">
                    <v-card>
                        <v-card-title>Edit Seminar</v-card-title>
                        <v-card-text>
                            <!-- Input fields to edit the seminar data -->
                            <v-text-field
                                v-model="editedSeminar.title"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.description"
                                label="Description (optional)"
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.date"
                                label="Date"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.time"
                                label="Time"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedSeminar.location"
                                label="Location"
                                required
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="($event) => editSeminar(editedSeminar)"
                                >Save</v-btn
                            >
                            <v-btn color="error" @click="showModal = false"
                                >Cancel</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </div>
            </v-container>
            <v-row class="mt-2">
                <v-col>
                    <div>
                        The database received
                        {{ seminars?.length || 0 }} records:
                    </div>
                    <div>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-left">Title</th>
                                    <th class="text-left">Description</th>
                                    <th class="text-left">Date</th>
                                    <th class="text-left">Time</th>
                                    <th class="text-left">Location</th>
                                    <th class="text-left">Edit</th>
                                    <th class="text-left">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="meeting in seminars"
                                    :key="meeting.id"
                                >
                                    <td>{{ meeting.title }}</td>
                                    <td>{{ meeting.description }}</td>
                                    <td>{{ meeting.date }}</td>
                                    <td>{{ meeting.time }}</td>
                                    <td>{{ meeting.location }}</td>
                                    <td>
                                        <v-btn
                                            v-if="!showModal"
                                            variant="tonal"
                                            @click="
                                                ($event) => {
                                                    editedSeminar.id =
                                                        meeting.id;
                                                    editedSeminar.title =
                                                        meeting.title;
                                                    editedSeminar.description =
                                                        meeting.description;
                                                    editedSeminar.date =
                                                        meeting.date;
                                                    editedSeminar.time =
                                                        meeting.time;
                                                    editedSeminar.location =
                                                        meeting.location;
                                                    showModal = true;
                                                }
                                            "
                                        >
                                            Edit Seminar
                                        </v-btn>
                                    </td>
                                    <td>
                                        <!-- Show the Delete button only if the modal is not open -->
                                        <v-btn
                                            v-if="!showModal"
                                            variant="tonal"
                                            @click="deleteSeminar(meeting.id)"
                                        >
                                            Delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-btn class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
            sign out
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from "vue";

useHead({
    title: "Admin",
});

definePageMeta({ middleware: "auth" });

const { signOut } = useAuth();

const showModal = ref(false);

const { data: seminars } = useFetch("/api/seminars");

const editedSeminar = ref({
    id: null,
    title: null,
    description: null,
    date: null,
    time: null,
    location: null,
});

const seminar = ref({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
});

const addSeminar = async (seminar) => {
    return await $fetch("/api/seminars", {
        method: "POST",
        body: {
            title: seminar.title,
            description: seminar.description,
            date: seminar.date,
            time: seminar.time,
            location: seminar.location,
        },
    });
};

const editSeminar = async (editedSeminar) => {
    let seminar = null;

    if (
        editedSeminar.id &&
        editedSeminar.title &&
        editedSeminar.description &&
        editedSeminar.date &&
        editedSeminar.time &&
        editedSeminar.location
    )
        seminar = await $fetch("/api/seminars", {
            method: "PUT",
            body: {
                id: editedSeminar.id,
                title: editedSeminar.title,
                description: editedSeminar.description,
                date: editedSeminar.date,
                time: editedSeminar.time,
                location: editedSeminar.location,
            },
        });
    if (seminar) seminar.value = await getSeminars();
};

const deleteSeminar = async (id) => {
    if (id)
        return await $fetch("/api/seminars", {
            method: "DELETE",
            body: {
                id,
            },
        });

    if (seminar.value) seminar.value = await getSeminar;
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
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

.modal > .v-card {
    max-width: 400px;
    width: 100%;
}
</style>
