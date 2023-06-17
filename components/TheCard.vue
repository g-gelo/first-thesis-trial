<template>
    <div>
        <v-container>
            <div>
                <v-card
                    fluid
                    density="compact"
                    class="mx-auto rounded-xl rounded-be-xl"
                    :class="{
                        flipped: isFlipped,
                    }"
                    color="bg200"
                    max-width="90%"
                    :style="{ height: cardHeight }"
                    :prepend-icon="`${logo}`"
                    :title="isFlipped ? `${tagalogTitle}` : `${englishTitle}`"
                    @click="toggleFlip"
                >
                    <div class="custom-text">
                        <v-list>
                            <span
                                v-if="!isFlipped"
                                class="indent ma-3 text-body-1"
                                >{{ englishContent }}
                            </span>
                            <span v-else>
                                <div class="backside indent ma-3">
                                    {{ tagalogContent }}
                                </div>
                            </span>
                        </v-list>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

defineProps<{
    logo: string;
    cardHeight: string;
    englishTitle: string;
    tagalogTitle: string;
    englishContent: string;
    tagalogContent: string;
}>();

const isFlipped = ref(false);
const cardCols = ref(12);

const toggleFlip = () => {
    isFlipped.value = !isFlipped.value;
};
</script>

<style scoped>
.v-card {
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    width: 90%;
    height: 60vh;
}
.custom-text {
    text-align: justify;
}

.indent {
    display: inline-block;
    text-indent: 2em;
}
.v-card .v-card-text {
    line-height: 1.2;
}
.flipped {
    transform: rotateY(180deg);
}

.flipped .v-card-text::before {
    opacity: 1;
    pointer-events: auto;
}
.backside {
    transform: rotateY(180deg);
    height: 100%;
    text-align: end;
    letter-spacing: 0.0131rem;
}

@media (max-width: 960px) {
    .auto-fit-text {
        font-size: 12px;
    }
}

@media (min-width: 961px) {
    .auto-fit-text {
        font-size: 16px;
    }
}

@media (min-width: 1280px) {
    .auto-fit-text {
        font-size: 20px;
    }
}
</style>
