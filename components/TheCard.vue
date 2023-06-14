<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col
                    :cols="cardCols"
                    :sm="cardCols"
                    :md="cardCols"
                    :lg="cardCols"
                >
                    <v-card
                        fluid
                        density="compact"
                        class="mx-auto"
                        :class="{
                            flipped: isFlipped,
                            'rounded-be-xl': position === 1,
                            'rounded-ts-xl': position === 2,
                        }"
                        color="bg200"
                        max-width="90%"
                        :style="{ height: cardHeight }"
                        :prepend-icon="`${logo}`"
                        :title="
                            isFlipped ? `${tagalogTitle}` : `${englishTitle}`
                        "
                        @click="toggleFlip"
                    >
                        <v-card-text class="text-h6">
                            <template v-if="!isFlipped"
                                >{{ englishContent }}
                            </template>
                            <template v-else>
                                <div class="backside">
                                    {{ tagalogContent }}
                                </div>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

defineProps<{
    logo: string;
    position: number;
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

const updateCardCols = () => {
    const screenSize = window.innerWidth;

    if (screenSize < 600) {
        // Extra small devices (phones)
        cardCols.value = 12;
    } else if (screenSize < 960) {
        // Small devices (tablets)
        cardCols.value = 6;
    } else if (screenSize < 1280) {
        // Medium devices (desktops)
        cardCols.value = 4;
    } else {
        // Large devices (large desktops)
        cardCols.value = 3;
    }
};

onMounted(() => {
    updateCardCols();
    window.addEventListener("resize", updateCardCols);
});
</script>

<style scoped>
.v-card {
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    width: 90%;
    height: 60vh;
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

.v-card .title {
    writing-mode: horizontal-tb;
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
