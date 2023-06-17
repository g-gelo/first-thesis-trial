<template>
    <div class="date-time-container">
        <p class="date">{{ currentDate }}</p>
        <p class="time">{{ currentTime }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentDate = ref("");
const currentTime = ref("");

const updateDateTime = () => {
    const date = new Date();
    currentDate.value = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    currentTime.value = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
});
</script>

<style scoped>
.date-time-container {
    text-align: end;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 18px;
    padding: 20px;
}

.date {
    margin-bottom: 10px;
}

.time {
    font-weight: bold;
}
</style>
