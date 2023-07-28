<template>
    <div>
        <v-container>
            <h1>Job Career Form</h1>
            <v-form @submit.prevent="addCareer(career)">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="career.title"
                            label="Title"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="career.date"
                            label="Date"
                            required
                        ></v-text-field>
                        <span class="text-overline">ex. July 18</span>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="career.time"
                            label="Time"
                            required
                        ></v-text-field>
                        <span class="text-overline">ex. 08:00AM - 10:00AM</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="career.location"
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
                        <v-card-title>Edit Career</v-card-title>
                        <v-card-text>
                            <v-text-field
                                v-model="editedCareer.title"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedCareer.date"
                                label="Date"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedCareer.time"
                                label="Time"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedCareer.location"
                                label="Location"
                                required
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="($event) => editCareer(editedCareer)"
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
                        {{ careers?.length || 0 }} records:
                    </div>
                    <div>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-left">Title</th>
                                    <th class="text-left">Date</th>
                                    <th class="text-left">Time</th>
                                    <th class="text-left">Location</th>
                                    <th class="text-left">Edit</th>
                                    <th class="text-left">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="job in careers" :key="job.id">
                                    <td>{{ job.title }}</td>
                                    <td>{{ job.date }}</td>
                                    <td>{{ job.time }}</td>
                                    <td>{{ job.location }}</td>
                                    <td>
                                        <v-btn
                                            v-if="!showModal"
                                            variant="tonal"
                                            @click="
                                                ($event) => {
                                                    editedCareer.id = job.id;
                                                    editedCareer.title =
                                                        job.title;
                                                    editedCareer.date =
                                                        job.date;
                                                    editedCareer.time =
                                                        job.time;
                                                    editedCareer.location =
                                                        job.location;
                                                    showModal = true;
                                                }
                                            "
                                        >
                                            Edit
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn
                                            v-if="!showModal"
                                            variant="tonal"
                                            @click="deleteCareer(job.id)"
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
    </div>
</template>

<script setup>
const { data: careers } = useFetch("/api/careers");

const career = ref({
    title: "",
    date: "",
    time: "",
    location: "",
});

const addCareer = async (career) => {
    return await $fetch("/api/careers", {
        method: "POST",
        body: {
            title: career.title,
            date: career.date,
            time: career.time,
            location: career.location,
        },
    });
};
const showModal = ref(false);

const editedCareer = ref({
    id: null,
    title: null,
    date: null,
    time: null,
    location: null,
});

const editCareer = async (editedCareer) => {
    let career = null;

    if (
        editedCareer.id &&
        editedCareer.title &&
        editedCareer.date &&
        editedCareer.time &&
        editedCareer.location
    )
        career = await $fetch("/api/careers", {
            method: "PUT",
            body: {
                id: editedCareer.id,
                title: editedCareer.title,
                date: editedCareer.date,
                time: editedCareer.time,
                location: editedCareer.location,
            },
        });
    if (career) career.value = await getCareers();
};

const deleteCareer = async (id) => {
    if (id)
        return await $fetch("/api/careers", {
            method: "DELETE",
            body: {
                id,
            },
        });

    if (career.value) career.value = await getCareer;
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
.modal > .v-card {
    max-width: 400px;
    width: 100%;
}
</style>
