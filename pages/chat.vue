<template>
    <div class="chat-container">
        <v-container class="chat-content" fluid>
            <div>
                <div v-for="(message, index) in messages" :key="index">
                    <div
                        v-if="message.sender === 'Guidance Connect'"
                        class="answer-container"
                    >
                        <div v-if="message.text">
                            <span class="username">{{ message.sender }}</span>
                            <div
                                v-if="loading && index === messages.length - 1"
                                class="loading-animation"
                            >
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                            <div
                                v-else
                                class="answer card ma-2 pa-4 rounded-e-xl rounded-ts-xl"
                            >
                                {{ message.text }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="user">
                            <span class="username">{{ message.me }}</span>
                            <div
                                class="background card ma-2 pa-4 rounded-s-xl rounded-te-xl"
                            >
                                <span class="message">{{
                                    message.myText
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Chat messages -->
            <div v-if="showBusinessHours" class="answer-container">
                <span class="username">{{ messages[0].sender }}</span>
                <div v-if="loadingBusinessHours" class="loading-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div v-else class="answer ma-2 pa-4 rounded-e-xl rounded-ts-xl">
                    {{ messages[0].text1 }}
                </div>
            </div>
            <div
                class="background card ma-2 pa-4 rounded-s-xl rounded-te-xl"
                @click="toggleBusinessHours"
            >
                <span> What are your business Hours? </span>
            </div>
            <div v-if="showLocation" class="answer-container">
                <span class="username">{{ messages[0].sender }}</span>
                <div v-if="loadingLocation" class="loading-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div v-else class="answer ma-2 pa-4 rounded-e-xl rounded-ts-xl">
                    {{ messages[0].text2 }}
                </div>
            </div>
            <div
                class="background card ma-2 pa-4 rounded-s-xl rounded-te-xl"
                @click="toggleShowLocation"
            >
                <span> Where are you located? </span>
            </div>
            <div v-if="showContactInfo" class="answer-container">
                <span class="username">{{ messages[0].sender }}</span>
                <div v-if="loadingContactInfo" class="loading-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div v-else class="answer ma-2 pa-4 rounded-e-xl rounded-ts-xl">
                    {{ messages[0].text3 }}
                    <a
                        href="https://www.facebook.com/CvSUImusAdmissions"
                        target="_blank"
                        >Click here</a
                    >.
                </div>
            </div>
            <div
                class="background card ma-2 pa-4 rounded-s-xl rounded-te-xl"
                @click="toggleContactInfo"
            >
                <span> How else can I contact you? </span>
            </div>
        </v-container>
        <div class="pls">
            <div class="chat-input">
                <v-text-field
                    v-model="newMessage"
                    placeholder="Type your message..."
                    rows="1"
                    auto-grow
                ></v-text-field>
                <v-btn color="bg200" @click="sendMessage"
                    ><v-icon color="primary300"
                        >fa-solid fa-paper-plane</v-icon
                    ></v-btn
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import "animate.css";
import "intersection-observer";

const showBusinessHours = ref(false);
const loadingBusinessHours = ref(false);
const showLocation = ref(false);
const loadingLocation = ref(false);
const showContactInfo = ref(false);
const loadingContactInfo = ref(false);
const loading = ref(false);

const messages = ref([
    {
        sender: "Guidance Connect",
        text1: `We are open Monday to Thursday, from 7 in the morning until 5 in the afternoon. The counseling schedule is from 1 in the afternoon to 5.`,
        text2: `The Guidance and Counseling Office is located on the ground floor of the new building, next to the OSAS.`,
        text3: `You can contact or directly send a message on our official Facebook page. This is our Facebook page, `,
    },
]);

const newMessage = ref("");

const toggleBusinessHours = () => {
    showBusinessHours.value = !showBusinessHours.value;
    if (showBusinessHours.value) {
        loadingBusinessHours.value = true;
        setTimeout(() => {
            loadingBusinessHours.value = false;
        }, 1000);
    }
};

const toggleShowLocation = () => {
    showLocation.value = !showLocation.value;
    if (showLocation.value) {
        loadingLocation.value = true;
        setTimeout(() => {
            loadingLocation.value = false;
        }, 1000);
    }
};

const toggleContactInfo = () => {
    showContactInfo.value = !showContactInfo.value;
    if (showContactInfo.value) {
        loadingContactInfo.value = true;
        setTimeout(() => {
            loadingContactInfo.value = false;
        }, 1000);
    }
};

const sendMessage = () => {
    if (newMessage.value.trim() !== "") {
        const userMessage = {
            me: "You",
            myText: newMessage.value,
        };
        messages.value.push(userMessage);

        const keywords = [
            "counselor",
            "guidance",
            "problem",
            "police",
            "mental",
            "hi",
            "hello",
            "academic calendar",
            "calendar",
        ]; // Add more keywords as needed

        let foundKeyword = false; // Flag to track if a keyword is found

        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            if (newMessage.value.toLowerCase().includes(keyword)) {
                const chatbotResponse = {
                    sender: "Guidance Connect",
                    text: getAnswer(keyword), // Call a function to get the corresponding answer
                };
                messages.value.push(chatbotResponse);
                foundKeyword = true;
                break; // Exit the loop after finding a match
            }
        }

        if (!foundKeyword) {
            const chatbotResponse = {
                sender: "Guidance Connect",
                text: "I'm sorry, I don't have information about that.",
            };
            messages.value.push(chatbotResponse);
        }

        newMessage.value = "";
        loading.value = true;

        // Simulate the response from the chatbot
        setTimeout(() => {
            const chatbotResponse = {
                sender: "Guidance Connect",
            };
            messages.value.push(chatbotResponse);
            loading.value = false;
        }, 1000);
    }
};

const getAnswer = (keyword) => {
    switch (keyword) {
        case "counselor":
            return "A counselor is a person trained to give guidance on personal, social, or psychological problems.";
        case "guidance":
            return "Guidance refers to the process of advising or providing support and direction in making decisions or solving problems.";
        case "problem":
            return "A problem is a matter or situation that requires attention, consideration, or resolution.";
        case "hello":
        case "hi":
            return `Hello! 👋 Welcome to our offline chatbot. While I'm offline, I can still provide you
            with useful information. Feel free to ask about emergency hotlines, school calendar, mental health
            support hotline, or anything else you'd like to know. Just type your question, and I'll do my best to assist you!`;
        case "police":
            return `
        Cavite Police Stations:
            Cavite City: 0998-967-3349 
            Kawit: 0998-967-3356 
            Noveleta: 0998-967-3357 
            Rosario: 0998-967-3358 
            City of Bacoor: 0998-967-3348 
            City of Dasmarinas: 0998-967-3350 
            Carmona: 0998-967-3359 
            GMA: 0998-967-3360 
            Silang: 0998-598-5622 
            Gen. Trias: 0998-967-3361 
            Amadeo: 0998-967-3365 
            Indang: 0998-967-3367 
            Tanza: 0998-967-3362 
            Trece Martires City: 0998-967-3354 
            Alfonso: 0998-967-3364 
            Gen. Emilio Aguinaldo: 0998-967-3512
            Magallanes: 0998-967-3368 
            Maragondon: 0998-967-3369 
            Mendez: 0998-967-3370 
            Naic: 0998-967-3371 
            Tagaytay City: 0998-967-3352 
            Ternate: 0998-967-3374 
        
    `;
        case "mental":
            return `
            National Center for Mental Health 
            - Psychiatric emergencies 
            - Suicidal thoughts 
            - Depression 
            - Grief and loss 
            - Relationship issues 
            - Sexual orientation issues 
            - School and career issues 
            - referral to other agencies that can provide specific mental services in the 
            Philippines. 
            GLOBE/TM Subscribers: 0966-351-4518 & 0917-899-8727
            SMART/SUN/TNT Subscribers: 0908-639-2672
            `;
        default:
            return "I'm sorry, I don't have information about that.";
        case "academic calendar":
        case "calendar":
            return `Academic Calendar | A.Y. 2023-2024
            First Semester_________________
            September 05 - Beginning of Classes
            November 20 - 25 - Midterm Examination
            December 23 - January 02 - Christmas Break
            January 22 - 27 - Final Examination (Graduating)
            January 29 - February 03 - Final Examination (Non-Graduating)
            Graduation Day - TBA -------------
            February 05 - 24 Semestral Break
            Second Semester___________________
            February 26 - Beginning of Classes
            April 22 - 27 - Midterm Examination
            June 17 - 22 - Final Examination (Graduating)
            June 24 - 29 - Final Examination (Non-Graduating)
            Graduation Day - TBA --------------------
            July 01 - Start of Vacation`;
    }
};

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
.background,
.answer {
    display: inline-block;
    max-width: 100%; /* Adjust the maximum width as needed */
    word-break: break-word;
}
.user {
    display: flex;
    flex-direction: row-reverse;
}
.username {
    font-weight: bold;
}
.answer {
    background-color: #95ed8a;
}
.background {
    background-color: #afe3a8;
}
.chat-container {
    display: flex;
    flex-direction: column;
    height: 85vh;
}
.chat-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}
.chat-input {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px;
    background-color: #f1f1f1;
}
.pls {
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}
.loading-animation {
    display: flex;
    justify-content: center;
    align-items: center;
}
.dot {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    border-radius: 50%;
    background-color: #aaa;
    animation: dots 1.4s infinite ease-in-out both;
}
.dot:nth-child(1) {
    animation-delay: -0.32s;
}
.dot:nth-child(2) {
    animation-delay: -0.16s;
}
@keyframes dots {
    0%,
    80%,
    100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
</style>
