<template>
    <div
        v-for="seminar in seminars"
        :key="seminar.id"
        class="mb-6 bg-white rounded-tr-xl rounded-bl-xl"
    >
        <div class="h-64 flex">
            <div class="w-24 h-24 bg-secondary-100 relative">
                <div class="ma-2">
                    <img
                        src="/img/seminarsblob.svg"
                        alt="Seminars Blob"
                        class="top-image absolute top-0 left-0"
                    />
                    <img
                        src="/img/seminaricon.png"
                        alt="Seminars Icon"
                        class="absolute top-0 left-0"
                    />
                </div>
                <div class="ml-3 absolute flex flex-col top-20 mt-5">
                    <div class="seminar-info">
                        <v-icon class="ml-6 icon-small"
                            >fa-regular fa-calendar-days</v-icon
                        ><br />
                        <span class="ml-3 info-value info-small">{{
                            seminar.date
                        }}</span>
                    </div>
                    <div class="seminar-info">
                        <v-icon class="ml-6 icon-small"
                            >fa-regular fa-clock</v-icon
                        ><br />
                        <span class="ml-2 info-value info-small">{{
                            seminar.time
                        }}</span>
                    </div>
                </div>
            </div>
            <div
                class="w-60 p-4 border-l ml-2 border-green-800 relative flex flex-col"
            >
                <div class="mt-1 seminar-info">
                    <span class="info-value main-title highlight">{{
                        seminar.title
                    }}</span>
                </div>
                <div class="ma-2 seminar-info">
                    <v-icon start class="icon-small"
                        >fa-solid fa-location-dot</v-icon
                    >
                    <span class="info-value info-small">{{
                        seminar.location
                    }}</span>
                </div>
                <div class="ma-2 seminar-info">
                    <v-icon start class="icon-small"
                        >fa-solid fa-microphone-lines</v-icon
                    >
                    <span class="info-value info-small">{{
                        seminar.description
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: seminars } = useFetch("/api/seminars");
</script>

<style scoped>
.content-center-left {
    justify-content: flex-start;
}
.border-left {
    border-right: 1px solid red;
}
.highlight {
    font-weight: bold;
}
.main-title {
    font-size: clamp(1.2rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}
.space-on-left {
    padding-left: 10px;
    margin-right: 10px;
}
.seminar-details {
    margin-top: 10px;
}
.seminar-info {
    margin-bottom: 5px;
}
.info-small {
    font-size: 14px;
}
.icon-small {
    font-size: 20px;
}
</style>
