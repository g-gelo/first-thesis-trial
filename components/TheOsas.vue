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
            <v-card
                title="Functions"
                class="mt-4 rounded-xl rounded-be-xl card"
                color="bg100"
            >
                <div class="custom-text">
                    <span class="indent ma-3 mt-0"
                        >To attain these goals, the OSAS performs the following
                        functions:</span
                    >
                    <v-list>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide counseling and testing to students so
                                that they may recognize and accept themselves
                                and develop their
                                potentials;</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide information, training, placement and
                                follow-up services to students, graduates and
                                other clienteles;</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide avenues to hone students’ talents and
                                interest to ensure social and cultural growth;
                                and</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Develop skills and potentials of student
                                writers.</v-list-item-content
                            >
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script setup>
import "animate.css";
import { ref, onMounted } from "vue";

const { data: osasModule } = useFetch("/api/osas");

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
