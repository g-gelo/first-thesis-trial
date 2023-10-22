<template>
    <div>
        <div class="container">
            <v-img
                aspect-ratio="16/9"
                src="/img/osas-personnel.jpg"
                class="top-image card"
            ></v-img>
        </div>
        <div v-for="osas in osasModule" :key="osas.id">
            <div class="flex flex-col bg-bg100 mt-4 shadow-lg rounded-t-lg">
                <div class="px-4 py-2 bg-secondary-100">
                    <h2 class="text-2xl font-medium ma-2">{{ osas.title }}</h2>
                </div>
                <div class="px-4 py-2 bg-slate-50 rounded-b-lg">
                    <p class="indent text-base text-justify leading-relaxed">
                        {{ osas.description }}
                    </p>
                </div>
            </div>
        </div>

        <div>
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
                        <v-icon class="mr-2 sm">fa-regular fa-circle-dot</v-icon
                        >{{ functions.osasFunction }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import "animate.css";
import { ref, onMounted } from "vue";

const { data: osasModule } = useFetch("/api/osas");
const { data: osasFunction } = useFetch("/api/osasfunction");

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
