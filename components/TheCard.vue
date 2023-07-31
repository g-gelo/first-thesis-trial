<template>
    <div>
        <v-container>
            <div>
                <v-card
                    fluid
                    density="compact"
                    class="mx-auto rounded-xl rounded-be-xl"
                    color="bg200"
                    max-width="90%"
                    :prepend-icon="`${logo}`"
                    :title="`${title}`"
                >
                    <div class="custom-text">
                        <v-list>
                            <span class="indent ma-3 text-body-1"
                                >{{ content }}
                            </span>
                        </v-list>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    logo: string;
    title: string;
    content: string;
}>();
</script>

<style scoped>
.custom-text {
    text-align: justify;
}

.indent {
    display: inline-block;
    text-indent: 2em;
}
</style>
