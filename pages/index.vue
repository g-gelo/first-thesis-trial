<template>
    <div class="content-container">
        <v-img aspect-ratio="16/9" src="/img/CvSULogo.jpg" class="top-image"
            ><date-time
        /></v-img>
        <marquee
            class="border-bottom"
            width="100%"
            behavior="scroll"
            direction="left"
            scrollamount="5"
        >
            Cavite State University - Imus Campus
        </marquee>
        <div class="category">
            <ul>
                <li><a href="#Osas" class="font-display">OSAS</a></li>
                <li><a href="#GCO" class="font-display">GCO</a></li>
                <li><a href="#Contact" class="font-display">Contact</a></li>
            </ul>
        </div>
        <v-carousel class="card" hide-delimiters show-arrows="hover">
            <v-container>
                <div>
                    <v-carousel-item>
                        <the-card
                            class="custom-card card"
                            logo="fa-solid fa-bullseye"
                            title="Mission"
                            content="Cavite State University shall provide excellent, equitable and relevant educational opportunities in the arts, sciences and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled and morally upright individuals for global competitiveness."
                        />
                    </v-carousel-item>
                    <v-carousel-item>
                        <the-card
                            class="custom-card card"
                            logo="fa-solid fa-bullseye"
                            title="Hangarin"
                            content="Ang Cavite State university ay makapagbigay ng mahusay, pantay at makabuluhang edukasyon sa sining, agham at teknolohiya sa pamamagitan ng may kalidad na pagtuturo at tumutugon sa pangangailangang pananaliksik at mga gawaing pangkaunlaran. Makalikha ito ng mga indibidwal ng dalubhasa, may kasaysayan at kagandahan-asal sa pandaigdigang kakayahan."
                        />
                    </v-carousel-item>
                    <v-carousel-item>
                        <the-card
                            class="custom-card card"
                            logo="fa-regular fa-eye"
                            title="Vision"
                            content="The Premier University in historic Cavite globally recognized for excellence in character development, academics, research, innovation and sustainable community engagement."
                        />
                    </v-carousel-item>
                    <v-carousel-item>
                        <the-card
                            class="custom-card card"
                            logo="fa-regular fa-eye"
                            title="Mithiin"
                            content="Ang nangungunang pamantasan sa makasaysayang Kabite na kinikilala sa kahusayan sa paghubog ng mga indibidwal na may pandaigdigang kakayahan at kagandahang asal."
                        />
                    </v-carousel-item>
                </div>
            </v-container>
        </v-carousel>
        <div class="bg">
            <the-title
                id="Osas"
                class="card"
                title="Office Of Student Affairs And Services"
                backgroundImage="/img/osas.png"
                svgBlob="/img/osasBlob.svg"
            />
        </div>
        <v-container>
            <the-osas />
        </v-container>
        <the-title
            id="GCO"
            class="card"
            title="Guidance and Counseling Office"
            backgroundImage="/img/GCO.png"
            svgBlob="/img/gcoBlob.svg"
        />
        <div>
            <v-container>
                <the-box
                    class="card"
                    title=""
                    subtitle=""
                    :items="[
                        {
                            id: 1,
                            content: `The Guidance and Counseling Office (GCO) serves as the students’ partner in achieving success in their career, personal and social domains. It is a place where any student can go and talk about concerns that affect his/her life as a college student and as an individual. Concerns or issues discussed in individual sessions with any of the counselors are treated with confidentiality and do not appear in the students’ academic records.
`,
                        },
                    ]"
                />
            </v-container>
        </div>
        <div>
            <v-container>
                <the-box
                    class="card"
                    title="Services Offered"
                    subtitle="The Guidance and Counseling Office (GCO) offers the following services:"
                    :items="[
                        {
                            id: 1,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Counseling Referral',
                        },
                        {
                            id: 2,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Career Placement',
                        },
                        {
                            id: 3,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Individual Inventory',
                        },
                        {
                            id: 4,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Information',
                        },
                        {
                            id: 5,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Testing',
                        },
                        {
                            id: 6,
                            icon: 'fa-regular fa-circle-dot',
                            content: 'Follow-up and Research evaluation',
                        },
                    ]"
                />
            </v-container>
        </div>
        <the-title
            id="Contact"
            class="card"
            title="Emergency Hotline"
            backgroundImage="/img/emergencyHotline.png"
            svgBlob="/img/emergencyBlob.svg"
        />
        <div>
            <v-container>
                <the-emergency
                    class="card"
                    logo="/img/policeLogo.png"
                    name="Philippine National Police"
                    contact="0998 598 5601"
                    address="9WVC+F57, Imus, Cavite"
                    info="For more police station number, just tap the message icon and type 'Police'."
                />
            </v-container>
        </div>
        <div>
            <v-container>
                <the-emergency
                    class="card"
                    logo="/img/mentalHealthLogo.png"
                    name="Mental Health Resources"
                    contact="1553 (Luzon-wide and landline toll-free)"
                    address="Philippines"
                    info="For more information, just tap the message icon and type 'Mental'."
                />
            </v-container>
        </div>
        <div>
            <v-container>
                <the-emergency
                    class="card"
                    logo="/img/pdrrmoLogo.png"
                    name="PDRRMO"
                    contact="Telephone: (046) 424-0203 Cellphone No.: 0917-858-8263 && 0919-061-6584"
                    address="Cavite, Philippines"
                    info="For more information, visit this link"
                />
            </v-container>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import TheCard from "@/components/TheCard.vue";
import TheTitle from "@/components/TheTitle.vue";
import TheOsas from "@/components/TheOsas.vue";
import TheBox from "@/components/TheBox.vue";
import DateTime from "@/components/DateTime.vue";
import TheEmergency from "@/components/TheEmergency.vue";
import "animate.css";
import "intersection-observer";

useHead({
    title: "Home",
});

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
body {
    overflow-x: hidden;
}

marquee {
    background-color: #bdf5a8;
    color: #003b1b;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
}
.font-display {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
}
.category {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
}
.category ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
}
.category ul li {
    font-size: 1.2rem;
    background-color: #d9facd;
    border-radius: 50px;
    box-shadow: 1px 1px 5px #808080;
}
.category ul li a {
    margin: 0 1rem;
    text-decoration: none;
}
.category ul li a:visited {
    margin: 0 1rem;
    text-decoration: none;
    color: inherit;
}

.border-bottom {
    box-shadow: 0px 10px 10px -15px #111;
}
.content-container {
    height: 600vh;
}
.bg .svgBlob {
    position: relative;
    bottom: 0;
    right: 0;
}
</style>
