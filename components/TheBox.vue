<template>
    <div>
        <div>
            <v-card
                :title="`${title}`"
                class="mt-4 rounded-xl rounded-be-xl"
                color="bg200"
            >
                <div class="custom-text">
                    <span class="indent ma-3 mt-0">{{ subtitle }}</span>
                    <v-list>
                        <v-list-item v-for="item in items" :key="item.id">
                            <v-icon size="2xs" class="mr-2">{{
                                item.icon
                            }}</v-icon>
                            <v-list-item-content>
                                <span v-html="item.content"></span>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
    items: Array<{ id: number; icon: string; content: string }>;
}>();
</script>

<style scoped>
.custom-text {
    text-align: justify;
    text-justify: inter-word;
}

.indent {
    display: inline-block;
    text-indent: 2em; /* Adjust the indentation value as needed */
}
</style>
