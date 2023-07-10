<template>
    <div class="container">
        <v-card class="login-card rounded-lg">
            <v-card-title class="login-card-title">Login</v-card-title>
            <v-card-text class="login-card-form rounded-xl">
                <v-btn color="bg300" @click="loginWithGoogle">
                    <v-icon start>fa-brands fa-google</v-icon> Login with
                    Google</v-btn
                >
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
const loginWithGoogle = () => {
    //
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-image: url("../img/cvsu-imus.jpg");
    background-size: cover;
    background-position: center;
}

.login-card {
    width: 80%;
    height: auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.login-card-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.login-card-form {
    background-color: #e8f5e9;
    padding: 20px;
    margin-bottom: 20px;
}
</style>
