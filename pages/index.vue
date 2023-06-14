<template>
    <div>
        <v-img
            aspect-ratio="16/9"
            src="/img/CvSULogo.jpg"
            class="top-image"
        ></v-img>
        <v-container>
            <div>
                <the-card
                    class="custom-card"
                    logo="fa-regular fa-eye"
                    @click="toggleFlipped"
                    :cardHeight="isFlipped ? '37vh' : '30vh'"
                    :position="1"
                    englishTitle="Vision"
                    englishContent="The premier university in historic Cavite recognized for excellence in the development of globally competitive and morally upright individuals."
                    tagalogTitle="niiʜɈiM"
                    tagalogContent="Ang nangungunang pamantasan sa makasaysayang Kabite na kinikilala sa kahusayan sa paghubog ng mga indibidwal na may pandaigdigang kakayahan at kagandahang asal."
                />

                <the-card
                    class="custom-card"
                    logo="fa-solid fa-bullseye"
                    @click="toggleFlipped"
                    :cardHeight="isFlipped ? '67vh' : '52vh'"
                    :position="2"
                    englishTitle="Mission"
                    englishContent="Cavite State University shall provide excellent, equitable and relevant educational opportunities in the arts, sciences and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled and morally upright individuals for global competitiveness."
                    tagalogTitle="niɿɒϱnɒH"
                    tagalogContent="Ang Cavite State university ay makapagbigay ng mahusay, pantay at makabuluhang edukasyon sa sining, agham at teknolohiya sa pamamagitan ng may kalidad na pagtuturo at tumutugon sa pangangailangang pananaliksik at mga gawaing pangkaunlaran. Makalikha ito ng mga indibidwal ng dalubhasa, may kasaysayan at kagandahan-asal sa pandaigdigang kakayahan."
                />
            </div>
        </v-container>
        <div class="bg">
            <the-title
                title="Office Of Student Affairs And Services"
                backgroundImage="/img/osas.png"
                svgBlob="/img/osasBlob.svg"
            />
        </div>
        <v-container>
            <the-osas />
        </v-container>
        <the-title
            title="Guidance and Counseling Office"
            backgroundImage="/img/GCO.png"
            svgBlob="/img/gcoBlob.svg"
        />
        <div>
            <v-container>
                <the-box
                    title=""
                    subtitle=""
                    :items="[
                        {
                            id: 1,
                            content: `The Guidance and Counseling Unit (GCU) serves as the students’ partner in achieving success in their career, personal and social domains. It is a place where any student can go and talk about concerns that affect his/her life as a college student and as an individual. Concerns or issues discussed in individual sessions with any of the counselors are treated with confidentiality and do not appear in the students’ academic records.

`,
                        },
                    ]"
                />
            </v-container>
        </div>
        <div>
            <v-container>
                <the-box
                    title="Services Offered"
                    subtitle="The Guidance and Counseling Unit (GCU) offers the following services:"
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
    </div>
</template>
<script setup>
import TheCard from "@/components/TheCard.vue";
import TheTitle from "@/components/TheTitle.vue";
import TheOsas from "@/components/TheOsas.vue";
import TheBox from "@/components/TheBox.vue";
import { ref } from "vue";
const isFlipped = ref(false);

const toggleFlipped = () => {
    isFlipped.value = !isFlipped.value;
};
</script>

<style scoped>
.bg .svgBlob {
    position: relative;
    bottom: 0;
    right: 0;
}
/* .justify-text {
    display: flex;
    justify-content: center;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
} */
.custom-card {
    font-size: 14px; /* Adjust the font size as needed */
}
.custom-card englishTitle {
    font-size: 20px; /* Adjust the font size as needed */
}
</style>
