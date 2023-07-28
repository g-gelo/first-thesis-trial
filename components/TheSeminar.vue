<template>
    <v-card
        v-for="seminar in seminars"
        :key="seminar.id"
        class="mb-6 rounded-xl"
    >
        <v-row class="content-center-left">
            <v-col
                cols="4"
                class="border-left rounded-tl-xl rounded-bl-xl space-on-left"
            >
                <div>
                    <v-img src="/img/seminarsblob.svg" class="top-image"
                        ><v-img
                            class="seminar-icon"
                            src="/img/seminaricon.png"
                            width="75px"
                            height="75px"
                        ></v-img
                    ></v-img>
                </div>
                <div class="ml-3">
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
            </v-col>
            <v-col cols="7">
                <v-list class="seminar-details">
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                                <div class="mt-1 seminar-info">
                                    <span
                                        class="info-value main-title highlight"
                                        >{{ seminar.title }}</span
                                    >
                                </div>
                                <div class="ma-2 seminar-info">
                                    <v-icon start class="icon-small"
                                        >fa-solid fa-location-dot</v-icon
                                    >
                                    <span class="info-value info-small pa-0">{{
                                        seminar.location
                                    }}</span>
                                </div>
                                <div class="ma-2 seminar-info">
                                    <v-icon start class="icon-small"
                                        >fa-solid fa-microphone-lines</v-icon
                                    >
                                    <span class="info-value info-small pa-0">{{
                                        seminar.description
                                    }}</span>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
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
