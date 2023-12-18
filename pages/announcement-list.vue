<template>
  <div class="p-4">
    <div class="flex justify-end">
      <NuxtLink
        to="/newAdmin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <i class="fa-solid fa-arrow-left"></i> Back
      </NuxtLink>
    </div>
    <div>
      <p class="mt-2">Create and manage announcements for students.</p>
    </div>

    <!-- Table For Seminar -->
    <div>
      <div class="mt-5 rounded-xl bg-slate-300">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold p-4"
        >
          Seminar and Event
        </h2>
        <div>
          <SeminarForm />
        </div>
      </div>
    </div>
    <!-- Table For Job Vacancy -->
    <div>
      <div class="mt-5 rounded-xl bg-slate-300">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold p-4"
        >
          Job Vacancy
        </h2>
        <div>
          <CareerForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Announcement Management",
});
definePageMeta({
  layout: "admin-layout",
});
</script>

<style scoped>
/*  */
</style>
