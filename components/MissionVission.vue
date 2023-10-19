<template>
    <div>
        <h1>Mission and Vision</h1>
        <div class="btn">
            <button
                v-if="!showModalSeminar"
                @click="
                    ($event) => {
                        showModalSeminar = true;
                    }
                "
            >
                Mission and Vision Database
            </button>
        </div>
    </div>
</template>

<script setup>
const showModalSeminar = ref(false);
</script>

<style scoped>
.btn button {
    display: flex;
    width: 100%;
    padding: 1em;
    justify-content: center;
    margin-bottom: 2em;
    background-color: #d1d1d1;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
}
.btn button:active {
    opacity: 0.5;
}
</style>
