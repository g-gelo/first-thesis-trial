<template>
    <div class="content-container">
        <div class="image-container">
            <v-img
                aspect-ratio="16/9"
                src="/img/CvSULogo.jpg"
                class="top-image"
            >
                <div class="text-overlay card">
                    <span class="announcement-text"
                        ><a href="#event" class="event">Events</a></span
                    >
                    <span class="events-text"
                        ><a href="#career" class="event">Career</a></span
                    >
                </div>
            </v-img>
        </div>
        <v-container>
            <div class="hierarchy-text card">
                <h1 class="main-title">Announcement and Events</h1>
                <p class="subtitle">
                    Stay informed about the upcoming seminars, memos, and
                    important announcements. Get ready to experience an all-new
                    offline mobile application that can still help you whenever
                    you need help. Empowering you with knowledge and
                    opportunities for growth.
                </p>
            </div>
        </v-container>
        <TheTitle
            id="event"
            class="card"
            title="Amazing Seminars & Guest Speakers"
            backgroundImage="/img/seminar.png"
            svgBlob="/img/seminarBlob.svg"
        />
        <v-container>
            <div>
                <TheSeminar />
            </div>
        </v-container>
        <TheTitle
            id="career"
            class="card"
            title="Career / Job Opportunities"
            backgroundImage="/img/career.png"
            svgBlob="/img/careerBlob.svg"
        />
        <v-container>
            <div>
                <TheCareer />
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheTitle from "@/components/TheTitle.vue";
import TheSeminar from "@/components/TheSeminar.vue";
import TheCareer from "~/components/TheCareer.vue";
import "intersection-observer";
import "animate.css";

onMounted(() => {
    if (process.client) {
        const sliders = document.querySelectorAll(".card");
        const appearOptions = {
            threshold: 0.5, // Adjust the threshold value as needed
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
.image-container {
    position: relative;
}
.event {
    text-decoration: none;
    color: #333;
    padding: 0.3em;
    border-radius: 25px;
    box-shadow: 1px 1px 5px #808080;
}
.event a:visited {
    color: #333;
}

.text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.announcement-text,
.events-text {
    font-size: clamp(1rem, -0.25rem + 4vw, 2rem);
}
.hierarchy-text {
    margin: 2%;
}
.main-title {
    font-size: clamp(1.5rem, -0.25rem + 5vw, 3rem);
    font-weight: bold;
    margin-bottom: 10px;
}
.subtitle {
    font-size: clamp(1rem, -0.25rem + 4vw, 2rem);
    line-height: 1.4;
}
.content-container {
    height: 500vh;
}
</style>
