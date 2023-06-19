<template>
    <div class="seminar-component">
        <v-card class="hierarchy-text rounded-xl rounded-be-xl" color="bg200">
            <h1 class="text-h6 ma-3 custom-opacity">
                Upcoming Event with <span class="highlight">{{ guest }}</span>
            </h1>
            <v-list class="seminar-details">
                <div class="ma-3">
                    <div class="seminar-info">
                        <span class="info-label">What:</span>
                        <span class="info-value"> {{ what }} </span>
                    </div>
                    <div class="seminar-info">
                        <span class="info-label">When:</span>
                        <span class="info-value"> {{ when }} </span>
                    </div>
                    <div class="seminar-info">
                        <span class="info-label">Where:</span>
                        <span class="info-value"> {{ where }} </span>
                    </div>
                    <div class="seminar-info">
                        <span class="info-label">Time:</span>
                        <span class="info-value"> {{ time }} </span>
                    </div>
                </div>
            </v-list>
        </v-card>
        <!-- Rest of the seminar component content -->
    </div>
</template>
<script setup lang="ts">
defineProps<{
    guest: string;
    what: string;
    when: string;
    where: string;
    time: string;
}>();
</script>

<style scoped>
.highlight {
    font-weight: bold;
}
.seminar-component {
    /* Add styling for the seminar component container */
}
.announcement-text {
    font-size: clamp(1rem, -0.25rem + 4vw, 2rem);
}

.hierarchy-text {
    position: relative;
    margin-bottom: 20px;
}

.main-title {
    font-size: clamp(1.5rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}

.seminar-details {
    margin-top: 10px;
}

.seminar-info {
    margin-bottom: 5px;
}

.info-label {
    font-weight: bold;
}

.custom-opacity {
    font-weight: 300;
    opacity: 0.8; /* Adjust the opacity value as per your requirement */
}
</style>
