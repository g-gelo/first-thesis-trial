<template>
  <div class="p-4">
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
