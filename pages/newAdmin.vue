<template>
  <div class="p-4">
    <!-- 4 Content -->
    <div class="grid grid-cols-2 gap-4">
      <NuxtLink to="/content-list">
        <div
          class="bg-green-400 shadow-md rounded-lg overflow-hidden p-4 text-white"
        >
          <h1 class="text-base font-bold">Content Update</h1>
          <div class="flex mt-10">
            <span class="text-white mt-4 font-bold text-xs"
              >View & Edit Content</span
            >
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/announcement-list">
        <div
          class="bg-yellow-400 shadow-md rounded-lg overflow-hidden p-4 text-white"
        >
          <h1 class="text-base font-bold">Announcement List</h1>
          <div class="flex">
            <span class="text-white mt-4 font-bold text-xs"
              >Publish New Announcement</span
            >
          </div>
        </div>
      </NuxtLink>
      <div
        class="bg-orange-400 shadow-md rounded-lg overflow-hidden p-4 text-white"
      >
        <h1 class="text-base font-bold">Reports</h1>
        <!-- <p class="mt-2 line-clamp-1">
          Review and analyze user reports for improvement.
        </p> -->
        <div class="flex mt-10">
          <span class="text-white font-bold text-xs mr-4"
            >View & Manage Reports</span
          >
        </div>
      </div>
      <div
        class="bg-blue-400 shadow-md rounded-lg overflow-hidden p-4 text-white"
      >
        <h1 class="text-base font-bold">Appointments & Referrals</h1>
        <!-- <p class="mt-2 line-clamp-1">
          Manage appointments, referrals, and patient interactions.
        </p> -->
        <div class="flex">
          <span class="text-white mt-4 font-bold text-xs"
            >Schedule Appointments</span
          >
        </div>
      </div>
    </div>
    <!-- You Projects -->
    <div>
      <div class="mt-8 rounded-xl bg-slate-300 p-4">
        <h2 class="text-xl font-bold mb-4 border-b-2 border-white">
          User Management
        </h2>
        <div>
          <UserTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Admin",
});

definePageMeta({
  layout: "admin-layout",
});
</script>

<style scoped>
/*  */
</style>
