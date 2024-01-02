<template>
  <div>
    <div class="flex justify-end p-4">
      <NuxtLink
        to="/newAdmin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <i class="fa-solid fa-arrow-left"></i> Back
      </NuxtLink>
    </div>
    <div class="bg-slate-300 p-4 rounded-t-xl h-fit">
      <h1 class="text-lg font-bold my-2">Incident Report</h1>
      <!-- Report List Card -->
      <div
        class="mt-4 flex items-center justify-center space-x-4 ma-3 col-start-1 col-span-3"
      >
        <div
          class="flex flex-col items-start sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <label for="search" class="text-sm font-semibold">Search:</label>
          <input
            id="search"
            v-model="searchKeyword"
            type="text"
            class="appearance-none shadow-sm bg-white border border-blue-500 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
          />
        </div>
        <div class="flex items-space-x-2">
          <label for="filter" class="text-sm font-semibold">Filter:</label>
          <select
            id="filter"
            v-model="selectedFilter"
            class="appearance-none px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
          >
            <option value="incident">Incident</option>
            <option value="description">Description</option>
            <option value="status">Status</option>
          </select>
        </div>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md border border-blue-500 hover:bg-blue-700 focus:outline-none focus:border-blue-700"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
      <div
        class="bg-white p-4 rounded-xl mb-4 grid grid-cols-5"
        v-for="report in pagedIncident"
        :key="report.id"
      >
        <div
          class="col-start-1 col-end-2 row-span-2 w-16 h-16 rounded-full overflow-hidden"
          @click="
            ($event) => {
              detailedIncident = report;
              showFullIncidentReport = true;
            }
          "
        >
          <img :src="report?.user?.image" alt="Avatar" />
        </div>
        <div
          class="col-start-2 col-span-3 ml-4"
          @click="
            ($event) => {
              detailedIncident = report;
              showFullIncidentReport = true;
            }
          "
        >
          <h1 class="text-md font-semibold line-clamp-1">
            {{ report?.user?.name }}
          </h1>
        </div>
        <div class="col-start-5 ml-6" v-if="data.user.role == 'SUPERADMIN'">
          <button class="text-xs">
            <v-icon>fa-solid fa-trash</v-icon>
          </button>
        </div>
        <div class="row-start-2 col-start-2 col-span-2 ml-4 mt-2">
          <span class="text-md font-semibold text-zinc-600 line-clamp-1">{{
            report.incident
          }}</span>
        </div>
        <div
          class="row-start-2 col-start-4 ml-12"
          @click="
            ($event) => {
              detailedIncident = report;
              showFullIncidentReport = true;
            }
          "
        >
          <span :class="computedStatusColorClass(report.status)">{{
            report.status
          }}</span>
        </div>
        <!-- Show Full Appointment Information -->
        <div v-if="showFullIncidentReport" class="modal2 h-screen w-full">
          <!-- Modal content goes here -->
          <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-lg font-semibold">Full Details</h2>
            <div class="bg-white px-3 pt-3 pb-4 sm:p-6 sm:pb-4">
              <div class="mt-2 grid grid-cols-4">
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Name:
                  <strong class="text-gray-600"
                    >{{ detailedIncident?.user?.name }}
                  </strong>
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Incident:
                  <strong class="text-gray-600">{{
                    detailedIncident.incident
                  }}</strong>
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Description:
                  <strong class="text-gray-600">{{
                    detailedIncident.description
                  }}</strong>
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Date and Time:
                  <strong class="text-gray-600">
                    {{ formatCreatedAt(detailedIncident.createdAt) }}
                  </strong>
                </p>
                <div class="col-start-3 col-span-4">
                  <select
                    id="status"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    @change="
                      updateStatusReport(
                        detailedIncident.id,
                        $event.target.value
                      )
                    "
                  >
                    <option
                      value="Pending"
                      :selected="detailedIncident.status === 'Pending'"
                    >
                      Pending
                    </option>
                    <option
                      value="Rejected"
                      :selected="detailedIncident.status === 'Rejected'"
                    >
                      Rejected
                    </option>
                    <option
                      value="Accepted"
                      :selected="detailedIncident.status === 'Accepted'"
                    >
                      Accepted
                    </option>
                    <option
                      value="Resolved"
                      :selected="detailedIncident.status === 'Resolved'"
                    >
                      Resolved
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-1 col-span-3"
              @click="() => (showFullIncidentReport = false)"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div
        class="mt-4 flex items-center justify-center space-x-4 ma-3 col-start-1 col-span-3"
      >
        <button
          :disabled="currentPage === 1"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="prevPage"
        >
          &lt; Prev
        </button>
        <span class="text-sm font-semibold">{{ currentPage }}</span>
        <button
          :disabled="currentPage * itemsPerPage >= incidents.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>
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
const { data } = useAuth();
// Status color of the Report
const statusColorMapping = {
  Accepted: "text-green-500 font-semibold",
  Rejected: "text-red-500 font-semibold",
  Pending: "text-yellow-500 font-semibold",
  Resolved: "text-blue-500 font-semibold",
};

const computedStatusColorClass = (status) =>
  statusColorMapping[status] || "text-gray-500";

const showFullIncidentReport = ref(false);
const detailedIncident = ref(null);

const formatCreatedAt = (createdAtTimestamp) => {
  const parsedDate = new Date(createdAtTimestamp);
  // Format the incident in a human-readable way
  return parsedDate.toLocaleString(); // Adjust options as needed
};

const { data: incidents } = useFetch("/api/report");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const pagedIncident = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredIncident.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < incidents.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

// Filtering
const searchKeyword = ref("");
const selectedFilter = ref("incident");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "incident";
  currentPage.value = 1;
};

const filteredIncident = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return incidents.value.filter((report) =>
    report[filterKey].toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});
// Changing Status of the Appointment
const updateStatusReport = async (reportId, newStatus) => {
  try {
    // Make an API request to update the appointment status
    const response = await fetch(`/api/reportAction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reportId, // Include the reportId in the request body
        newStatus,
      }),
    });

    // Parse the response body as JSON
    incidents.value = await $fetch("/api/report");
  } catch (error) {
    console.error("Error updating report status:", error);
    // Handle error, show a notification, etc.
  }
};
</script>

<style scoped>
.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
