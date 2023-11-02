<template>
    <div>
        <div class="container">
            <v-img
                aspect-ratio="16/9"
                src="/img/osas-personnel.jpg"
                class="top-image card"
            ></v-img>
        </div>
        <div v-if="data?.subscribed" class="relative">
            <button
                v-if="!showOsasForm"
                @click="
                    ($event) => {
                        showOsasForm = true;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-plus</v-icon
                >
            </button>
            <button
                v-if="showOsasForm"
                @click="
                    ($event) => {
                        showOsasForm = false;
                    }
                "
                class="absolute top-0 right-0 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-minus</v-icon
                >
            </button>
        </div>
        <div v-if="showOsasForm" class="ma-2">
            <h1>Osas Form</h1>
            <form class="space-y-4" @submit.prevent="addOsas(osas)">
                <div>
                    <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Title</label
                    >
                    <input
                        type="text"
                        id="title"
                        v-model="osas.title"
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
                        v-model="osas.description"
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
        <div class="modal z-40" v-if="showOsasEdit">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit Osas Module</h2>
                <div>
                    <input
                        v-model="editedOsasModule.title"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Title"
                        required
                    />
                    <textarea
                        v-model="editedOsasModule.description"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="Description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button
                        @click="($event) => editOsasModule(editedOsasModule)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showOsasEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-10" v-for="osas in osasAll" :key="osas.id">
            <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
                <div class="px-4 py-2 bg-secondary-100">
                    <h2 class="text-2xl ma-2 h-5">{{ osas.title }}</h2>
                    <div v-if="data?.subscribed" class="relative">
                        <button
                            class="absolute bottom-0 right-0 text-lg"
                            v-if="!showOsasEdit"
                            variant="tonal"
                            @click="
                                ($event) => {
                                    editedOsasModule.id = osas.id;
                                    editedOsasModule.title = osas.title;
                                    editedOsasModule.description =
                                        osas.description;
                                    showOsasEdit = true;
                                }
                            "
                        >
                            <v-icon color="bg300">
                                fa-solid fa-pen-to-square
                            </v-icon>
                        </button>
                    </div>
                </div>
                <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                    <p class="indent text-base text-justify leading-relaxed">
                        {{ osas.description }}
                    </p>
                </div>
            </div>
        </div>
        <div v-if="data?.subscribed" class="relative">
            <button
                v-if="!showFunctionForm"
                @click="
                    ($event) => {
                        showFunctionForm = true;
                    }
                "
                class="absolute top-10 right-1 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-plus</v-icon
                >
            </button>
            <button
                v-if="showFunctionForm"
                @click="
                    ($event) => {
                        showFunctionForm = false;
                    }
                "
                class="absolute top-10 right-1 text-lg"
            >
                <v-icon class="pa-5" color="bg300"
                    >fa-regular fa-square-minus</v-icon
                >
            </button>
        </div>
        <div v-if="showFunctionForm" class="ma-2">
            <div class="bg-white shadow-lg rounded-lg pa-2">
                <h1 class="m-2">Function Form</h1>
                <form
                    class="space-y-4"
                    @submit.prevent="addOsasFunction(oFunction)"
                >
                    <div>
                        <label
                            for="function"
                            class="block ma-2 text-sm font-medium text-gray-900"
                            >Function</label
                        >
                        <input
                            type="text"
                            id="function"
                            v-model="oFunction.osasFunction"
                            name="function"
                            class="shadow-sm m-3 w-10/12 text-color text-white bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
        <div v-if="showFunctionEdit" class="modal z-40 mt-2">
            <div class="bg-white shadow-lg rounded-lg p-6 w-80">
                <h2 class="text-xl font-bold mb-4">Edit Osas Function</h2>
                <div>
                    <input
                        v-model="editedOsasFunction.osasFunction"
                        class="w-full p-2 border rounded mb-4"
                        placeholder="title"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        @click="
                            ($event) => editOsasFunction(editedOsasFunction)
                        "
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        @click="showFunctionEdit = false"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
            <div class="px-4 py-2 bg-secondary-100">
                <h2 class="text-lg ma-2">
                    To attain these goals, the OSAS performs the following
                    functions:
                </h2>
            </div>
            <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                <p
                    v-for="functions in osasFunction"
                    :functions="functions.id"
                    class="text-justify leading-relaxed"
                >
                    <button
                        v-if="!showFunctionEdit"
                        variant="tonal"
                        @click="
                            ($event) => {
                                editedOsasFunction.id = functions.id;
                                editedOsasFunction.osasFunction =
                                    functions.osasFunction;
                                showFunctionEdit = true;
                            }
                        "
                    >
                        <v-icon v-if="data?.subscribed" class="mr-2 sm"
                            >fa-solid fa-pen-to-square</v-icon
                        >
                    </button>
                    <v-icon v-else="data?.subscribed" class="mr-2 sm"
                        >fa-regular fa-circle-dot</v-icon
                    >{{ functions.osasFunction }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import "animate.css";
import { ref, onMounted } from "vue";

const { data } = useAuth();
const showOsasForm = ref(false);
const showOsasEdit = ref(false);
const showFunctionForm = ref(false);
const showFunctionEdit = ref(false);

const { data: osasAll } = useFetch("/api/osas");

const osas = ref({
    title: "",
    description: "",
});

const addOsas = async (osas) => {
    let addedOsas = null;
    addedOsas = await $fetch("/api/osas", {
        method: "POST",
        body: {
            title: osas.title,
            description: osas.description,
        },
    });
    if (addedOsas) {
        osas.title = "";
        osas.description = "";

        osasAll.value = await $fetch("/api/osas");
    }
};

const editedOsasModule = ref({
    id: null,
    title: null,
    description: null,
});

const editOsasModule = async (editedOsasModule) => {
    let osasModule = null;

    if (
        editedOsasModule.id &&
        editedOsasModule.title &&
        editedOsasModule.description
    )
        osasModule = await $fetch("/api/osas", {
            method: "PUT",
            body: {
                id: editedOsasModule.id,
                title: editedOsasModule.title,
                description: editedOsasModule.description,
            },
        });
    osasAll.value = await $fetch("/api/osas");
};

const { data: osasFunction } = useFetch("/api/osasfunction");

const oFunction = ref({
    osasFunction: "",
});

const addOsasFunction = async (oFunction) => {
    let addedFunction = null;

    addedFunction = await $fetch("/api/osasfunction", {
        method: "POST",
        body: {
            osasFunction: oFunction.osasFunction,
        },
    });
    if (addedFunction) {
        oFunction.osasFunction = "";

        osasFunction.value = await $fetch("/api/osasfunction");
    }
};

const editedOsasFunction = ref({
    id: null,
    osasFunction: null,
});

const editOsasFunction = async (editedOsasFunction) => {
    let osasFunctions = null;

    if (editedOsasFunction.id && editedOsasFunction.osasFunction)
        osasFunctions = await $fetch("/api/osasfunction", {
            method: "PUT",
            body: {
                id: editedOsasFunction.id,
                osasFunction: editedOsasFunction.osasFunction,
            },
        });
    osasFunction.value = await $fetch("/api/osasfunction");
};

onMounted(() => {
    if (process.client) {
        const sliders = document.querySelectorAll(".card");

        const appearOptions = {
            threshold: 0,
            rootMargin: "-100px 0px -50px 0px",
        };

        const appearOnScroll = new IntersectionObserver(
            (entries, appearOnScroll) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "animate__animated",
                            "animate__slideInUp"
                        );
                        appearOnScroll.unobserve(entry.target);
                    }
                });
            },
            appearOptions
        );

        sliders.forEach((slider) => {
            appearOnScroll.observe(slider);
        });
    }
});
</script>

<style scoped>
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
.sm {
    font-size: medium;
}
.top-image {
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(13, 202, 107, 0.3);
    opacity: 0.9;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}
.top-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.custom-text {
    text-align: justify;
    text-justify: inter-word;
}
.indent {
    display: inline-block;
    text-indent: 2em; /* Adjust the indentation value as needed */
}
</style>
