<template>
    <div
        v-for="emergency in hotline"
        :key="emergency.id"
        class="mb-6 rounded-xl bg-white"
    >
        <div class="flex items-start">
            <div class="w-24 h-24 bg-secondary-100 relative">
                <div class="ma-2">
                    <img
                        src="/img/careersblob.svg"
                        alt="Emergency Blob"
                        class="top-image absolute top-0 left-0"
                    />
                    <img
                        src="/img/emergencyIcon.png"
                        alt="Emergency Icon"
                        class="absolute"
                    />
                </div>
            </div>
            <div class="w-60 p-4 border-l-4 border-green-800">
                <div class="mt-1 seminar-info">
                    <span class="info-value main-title highlight">{{
                        emergency.organization
                    }}</span>
                </div>
                <div class="mt-5 ma-2 seminar-info">
                    <v-icon class="icon-small mr-3"
                        >fa-solid fa-location-dot</v-icon
                    >
                    <span class="info-value info-small pa-0">{{
                        emergency.location
                    }}</span>
                </div>
                <div class="mt-5 ma-2 seminar-info">
                    <v-icon class="icon-small mr-3">fa-solid fa-phone</v-icon>
                    <span class="info-value info-small pa-0">{{
                        emergency.number
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: hotline } = useFetch("/api/hotline");
</script>

<style scoped>
.highlight {
    font-weight: bold;
}
.main-title {
    font-size: clamp(1.2rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}

.info-small {
    font-size: 14px;
}
.icon-small {
    font-size: 17px;
}
</style>
