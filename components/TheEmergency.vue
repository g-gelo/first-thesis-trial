<template>
    <v-card class="mb-6 rounded-xl">
        <v-row class="content-center-left">
            <v-col
                cols="4"
                class="border-left rounded-tl-xl rounded-bl-xl space-on-left"
            >
                <div>
                    <v-img :src="`${logo}`" class="mid-image"></v-img>
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
                                        >{{ name }}</span
                                    >
                                </div>
                                <div class="mt-5 ma-2 seminar-info">
                                    <!-- Styling for the Where icon -->
                                    <v-icon start class="icon-small"
                                        >fa-solid fa-phone</v-icon
                                    >
                                    <span class="info-value info-small pa-0">{{
                                        contact
                                    }}</span>
                                </div>
                                <div class="ma-2 seminar-info">
                                    <!-- Styling for the Where icon -->
                                    <v-icon start class="icon-small"
                                        >fa-solid fa-location-dot</v-icon
                                    >
                                    <span class="info-value info-small pa-0">{{
                                        address
                                    }}</span>
                                </div>
                                <span class="info-value info-small"
                                    >{{ info }}
                                </span>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    logo: string;
    name: string;
    contact: string;
    address: string;
    info: string;
}>();
</script>

<style scoped>
.mid-image {
    position: absolute;
    width: 30%;
    height: 30%;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
}
.content-center-left {
    justify-content: flex-start;
}
.border-left {
    border-right: 1px solid green;
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
.info-small {
    font-size: 14px;
}
.icon-small {
    font-size: 17px;
}
</style>
