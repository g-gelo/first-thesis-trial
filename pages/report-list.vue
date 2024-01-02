<template>
  <div class="p-4">
    <div class="flex justify-end p-4">
      <NuxtLink
        to="/newAdmin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <i class="fa-solid fa-arrow-left"></i> Back
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Report Management",
});

definePageMeta({
  layout: "admin-layout",
});
</script>

<style scoped>
/*  */
</style>
