<template>
  <div class="p-4">
    <div class="flex justify-end">
      <NuxtLink
        to="/admin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <i class="fa-solid fa-arrow-left"></i> Back
      </NuxtLink>
    </div>
    <div>
      <p class="mt-2">
        Manage and update your application's content efficiently.
      </p>
    </div>
    <!-- Table For Mission and Vision -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold"
        >
          Mission and Vision
        </h2>
        <div>
          <MissionVission />
        </div>
      </div>
    </div>
    <!-- Table For OSAS -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold"
        >
          OSAS Profile
        </h2>
        <div>
          <OsasModule />
        </div>
      </div>
    </div>
    <!-- Table For GCO -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold"
        >
          GCO Profile
        </h2>
        <div>
          <GCOProfile />
        </div>
      </div>
    </div>
    <!-- Table For Emergency Hotline -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold"
        >
          Emergency Hotline
        </h2>
        <div>
          <EmergencyHotline />
        </div>
      </div>
    </div>
    <!-- Table For Frequently Ask Questions -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2
          class="text-xl font-bold mb-4 border-b-2 border-white mb-4 text-sm font-semibold"
        >
          Frequently Ask Questions
        </h2>
        <div>
          <FaqsForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Content Management",
});
definePageMeta({
  layout: "admin-layout",
});
</script>

<style scoped>
/*  */
</style>
