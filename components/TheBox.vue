<template>
    <div>
        <div v-for="gco in gcoProfile" :key="gco.id">
            <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
                <div class="px-4 py-2 bg-secondary-100">
                    <h2 class="text-2xl font-medium ma-2">{{ gco.title }}</h2>
                </div>
                <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                    <p class="indent text-base text-justify leading-relaxed">
                        {{ gco.description }}
                    </p>
                </div>
            </div>
        </div>
        <div>
            <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
                <div class="px-4 py-2 bg-secondary-100">
                    <div>
                        <h1 class="text-2xl">Services Offered</h1>
                    </div>
                    <p class="indent">
                        To attain these goals, the OSAS performs the following
                        functions:
                    </p>
                </div>
                <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                    <p
                        v-for="service in gcoService"
                        :key="service.id"
                        class="text-justify leading-loose"
                    >
                        <v-icon class="mr-2 sm">fa-regular fa-circle-dot</v-icon
                        >{{ service.service }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: gcoProfile } = useFetch("/api/gco");
const { data: gcoService } = useFetch("/api/gcoservices");
</script>

<style scoped>
.sm {
    font-size: medium;
}

.indent {
    display: inline-block;
    text-indent: 2em; /* Adjust the indentation value as needed */
}
</style>
