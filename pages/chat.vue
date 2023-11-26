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
        <div class="chat-input">
            <v-text-field
                v-model="newMessage"
                placeholder="Type your message..."
                rows="1"
                auto-grow
            ></v-text-field>
            <v-btn color="bg200" @click="sendMessage"
                ><v-icon color="bg300">fa-solid fa-paper-plane</v-icon></v-btn
            >
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import "animate.css";
import "intersection-observer";

const allChatData = ref([]);

const fetchData = async () => {
    try {
        const response = await fetch("/api/faq");
        const data = await response.json();
        allChatData.value = data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchData to populate allChatData
fetchData();

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

        // Check if allChatData is an array or initialize it as an empty array
        const keywords = Array.isArray(allChatData.value)
            ? allChatData.value.map((item) => item.keyword)
            : [];

        let foundKeyword = false;

        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            if (
                newMessage.value.toLowerCase().includes(keyword.toLowerCase())
            ) {
                const chatbotResponse = {
                    sender: "Guidance Connect",
                    text: getAnswer(keyword),
                };
                messages.value.push(chatbotResponse);
                foundKeyword = true;
                break;
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
    const matchingItem = Array.isArray(allChatData.value)
        ? allChatData.value.find((item) => item.keyword === keyword)
        : null;

    if (matchingItem) {
        return matchingItem.answer;
    } else {
        return "I'm sorry, I don't have information about that.";
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
    background-color: #c7ffb2;
}
.background {
    background-color: #95ed8a;
}
.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.chat-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}
.chat-input {
    flex-shrink: 0; /* Keeps this part from growing and stays at the bottom */
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #d9facd;
    border-top: 1px solid #333;
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
