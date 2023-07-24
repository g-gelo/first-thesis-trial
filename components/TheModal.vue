<template>
    <div>
        <div>
            <!-- Button or element that triggers the modal -->
            <v-btn color="primary" @click="showModal = true"
                >Edit Seminar</v-btn
            >

            <div v-if="showModal" class="modal">
                <v-card>
                    <v-card-title>Edit Seminar</v-card-title>
                    <v-card-text>
                        <!-- Input fields to edit the seminar data -->
                        <v-text-field
                            v-model="title"
                            label="Title"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="description"
                            label="Description (optional)"
                        ></v-text-field>
                        <v-text-field
                            v-model="date"
                            label="Date"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="time"
                            label="Time"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="location"
                            label="Location"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <!-- Button to save the edited data -->
                        <v-btn color="primary" @click="showModal = false"
                            >Save</v-btn
                        >
                        <!-- Button to cancel and close the modal without saving changes -->
                        <v-btn color="error" @click="showModal = false"
                            >Cancel</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// Define the refs to control the modal visibility and input values
const showModal = ref(false);
const title = ref("");
const description = ref("");
const date = ref("");
const time = ref("");
const location = ref("");
</script>

<style scoped>
/* Style the modal */
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
