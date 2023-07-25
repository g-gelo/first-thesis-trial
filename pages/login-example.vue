<template>
    <div class="container">
        <v-btn @click="signIn('google')">Login with Google</v-btn>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/admin",
    },
});

const { signIn } = useAuth();
</script>
