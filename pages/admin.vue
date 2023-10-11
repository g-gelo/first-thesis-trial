<template>
    <div class="content-container">
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
                        <v-text-field
                            v-model="seminar.description"
                            label="Guest Speaker"
                            auto-grow
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            id="date"
                            v-model="seminar.date"
                            type="text"
                            label="Date"
                            required
                        ></v-text-field>
                        <span class="text-overline">ex. July 18</span>
                    </v-col>
                    <v-col>
                        <v-text-field
                            id="time"
                            v-model="seminar.time"
                            type="text"
                            label="Time"
                            required
                        ></v-text-field>
                        <span class="text-overline">ex. 08:00AM - 10:00AM</span>
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
                <div v-if="showModal" class="modal career">
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
                                label="Guest Speaker"
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
                                            Edit
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
        <div>
            <CareerForm />
        </div>
        <v-btn
            v-if="!showModal"
            class="rounded-xl shadow-xl p-2 m-2"
            @click="signOut()"
        >
            sign out
        </v-btn>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CareerForm from "~/components/CareerForm.vue";

useHead({
    title: "Admin",
});

const { signOut } = useAuth();

const showModal = ref(false);

const { data: seminars } = useFetch("/api/seminars");

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

const editedSeminar = ref({
    id: null,
    title: null,
    description: null,
    date: null,
    time: null,
    location: null,
});

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
.career {
    z-index: 1;
}
.show {
    z-index: -1;
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
.content-container {
    height: 550vh;
}
</style>
