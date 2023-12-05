<template>
    <div v-if="data?.subscribed" class="relative">
        <button
            v-if="!showGcoForm"
            class="absolute top-0 right-0 text-lg"
            @click="
                ($event) => {
                    showGcoForm = true;
                }
            "
        >
            <v-icon class="pa-5" color="bg300"
                >fa-regular fa-square-plus</v-icon
            >
        </button>
        <button
            v-if="showGcoForm"
            class="absolute top-0 right-0 text-lg"
            @click="
                ($event) => {
                    showGcoForm = false;
                }
            "
        >
            <v-icon class="pa-5" color="bg300"
                >fa-regular fa-square-minus</v-icon
            >
        </button>
    </div>
    <div v-if="showGcoForm">
        <h1>GCO Profile Form</h1>
        <form class="space-y-4" @submit.prevent="addGco(gco)">
            <div>
                <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Title</label
                >
                <input
                    id="title"
                    v-model="gco.title"
                    type="text"
                    name="title"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Title"
                    required
                />
            </div>
            <div>
                <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Description</label
                >
                <textarea
                    id="description"
                    v-model="gco.description"
                    name="description"
                    rows="4"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Description"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="bg-blue-500 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    </div>
    <div v-if="showGcoFormEdit" class="modal z-40">
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-xl font-bold mb-4">Edit GCO Profile</h2>
            <div>
                <input
                    v-model="editedGcoProfile.title"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="title"
                    required
                />
                <input
                    v-model="editedGcoProfile.description"
                    class="w-full p-2 border rounded mb-4"
                    placeholder="description"
                    required
                />
            </div>
            <div class="flex justify-end">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    @click="($event) => editGcoProfile(editedGcoProfile)"
                >
                    Save
                </button>
                <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="showGcoFormEdit = false"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
    <div>
        <div v-for="guidance in gcoProfile" :key="guidance.id" class="mt-10">
            <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
                <div class="px-4 py-2 bg-secondary-100">
                    <h2 class="text-2xl font-medium ma-2 h-5">
                        <div v-if="data?.subscribed" class="relative">
                            <button
                                v-if="!showGcoFormEdit"
                                class="absolute top-0 right-0 text-lg"
                                variant="tonal"
                                @click="
                                    ($event) => {
                                        editedGcoProfile.id = guidance.id;
                                        editedGcoProfile.title = guidance.title;
                                        editedGcoProfile.description =
                                            guidance.description;
                                        showGcoFormEdit = true;
                                    }
                                "
                            >
                                <v-icon color="bg300">
                                    fa-solid fa-pen-to-square
                                </v-icon>
                            </button>
                        </div>
                        {{ guidance.title }}
                    </h2>
                </div>
                <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                    <p class="indent text-base text-justify leading-relaxed">
                        {{ guidance.description }}
                    </p>
                </div>
            </div>
        </div>
        <div>
            <div v-if="data?.subscribed" class="relative">
                <button
                    v-if="!showGcoServiceForm"
                    class="absolute top-10 right-1 text-lg"
                    @click="
                        ($event) => {
                            showGcoServiceForm = true;
                        }
                    "
                >
                    <v-icon class="pa-5" color="bg300"
                        >fa-regular fa-square-plus</v-icon
                    >
                </button>
                <button
                    v-if="showGcoServiceForm"
                    class="absolute top-10 right-1 text-lg"
                    @click="
                        ($event) => {
                            showGcoServiceForm = false;
                        }
                    "
                >
                    <v-icon class="pa-5" color="bg300"
                        >fa-regular fa-square-minus</v-icon
                    >
                </button>
            </div>
            <div v-if="showGcoServiceForm" class="mb-4">
                <div class="bg-white shadow-lg rounded-lg">
                    <h1 class="m-2">Service Form</h1>
                    <form
                        class="space-y-4"
                        @submit.prevent="addGcoService(gcoServices)"
                    >
                        <div>
                            <label
                                for="function"
                                class="block ma-2 text-sm font-medium text-gray-900"
                                >Service</label
                            >
                            <input
                                id="function"
                                v-model="gcoServices.service"
                                type="text"
                                name="function"
                                class="shadow-sm text-white m-3 w-10/12 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                placeholder="Function"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            class="bg-blue-500 ma-2 active:bg-blue-700 ease-linear text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div v-if="showGcoServiceEdit" class="modal z-40">
                <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                    <h2 class="text-xl font-bold mb-4">Edit GCO Service</h2>
                    <div>
                        <input
                            v-model="editedGcoService.service"
                            class="w-full p-2 border rounded mb-4"
                            placeholder="title"
                            required
                        />
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            @click="
                                ($event) => editGcoService(editedGcoService)
                            "
                        >
                            Save
                        </button>
                        <button
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            @click="showGcoServiceEdit = false"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

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
                        <button
                            v-if="!showGcoServiceEdit"
                            variant="tonal"
                            @click="
                                ($event) => {
                                    editedGcoService.id = service.id;
                                    editedGcoService.service = service.service;
                                    showGcoServiceEdit = true;
                                }
                            "
                        >
                            <v-icon v-if="data?.subscribed" class="mr-2 sm"
                                >fa-solid fa-pen-to-square</v-icon
                            >
                        </button>
                        <v-icon v-else="data?.subscribed" class="mr-2 sm"
                            >fa-regular fa-circle-dot</v-icon
                        >{{ service.service }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data } = useAuth();
const showGcoForm = ref(false);
const showGcoFormEdit = ref(false);

const { data: gcoProfile } = useFetch("/api/gco");

const gco = ref({
    title: "",
    description: "",
});

const addGco = async (gco) => {
    let addedGco = null;
    addedGco = await $fetch("/api/gco", {
        method: "POST",
        body: {
            title: gco.title,
            description: gco.description,
        },
    });
    if (addedGco) {
        gco.title = "";
        gco.description = "";

        gcoProfile.value = await $fetch("/api/gco");
    }
};

const editedGcoProfile = ref({
    id: null,
    title: null,
    description: null,
});

const editGcoProfile = async (editedGcoProfile) => {
    let gcoProfiles = null;

    if (
        editedGcoProfile.id &&
        editedGcoProfile.title &&
        editedGcoProfile.description
    )
        gcoProfiles = await $fetch("/api/gco", {
            method: "PUT",
            body: {
                id: editedGcoProfile.id,
                title: editedGcoProfile.title,
                description: editedGcoProfile.description,
            },
        });
    gcoProfile.value = await $fetch("/api/gco");
};

const showGcoServiceForm = ref(false);
const showGcoServiceEdit = ref(false);
const { data: gcoService } = useFetch("/api/gcoservices");

const gcoServices = ref({
    service: "",
});

const addGcoService = async (gcoServices) => {
    let addedGcoService = null;
    addedGcoService = await $fetch("/api/gcoservices", {
        method: "POST",
        body: {
            service: gcoServices.service,
        },
    });
    if (addedGcoService) {
        gcoServices.service = "";

        gcoService.value = await $fetch("/api/gcoservices");
    }
};

const editedGcoService = ref({
    id: null,
    service: null,
});

const editGcoService = async (editedGcoService) => {
    let gcoServices = null;

    if (editedGcoService.id && editedGcoService.service)
        gcoServices = await $fetch("/api/gcoservices", {
            method: "PUT",
            body: {
                id: editedGcoService.id,
                service: editedGcoService.service,
            },
        });
    gcoService.value = await $fetch("/api/gcoservices");
};
</script>

<style scoped>
.sm {
    font-size: medium;
}

.indent {
    display: inline-block;
    text-indent: 2em; /* Adjust the indentation value as needed */
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
