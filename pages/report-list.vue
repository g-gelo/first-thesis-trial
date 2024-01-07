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
              editedFeedbackReport.id = report.id;
              editedFeedbackReport.feedback = report.feedback;
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
              editedFeedbackReport.id = report.id;
              editedFeedbackReport.feedback = report.feedback;
            }
          "
        >
          <h1 class="text-md font-semibold line-clamp-1">
            {{ report?.user?.name }}
          </h1>
        </div>
        <div class="col-start-5 ml-6" v-if="data.user.role == 'SUPERADMIN'">
          <button class="text-xs">
            <v-icon
              @click="
                ($event) => {
                  showDeleteIncidentReport = true;
                  Delete_Incident = report;
                }
              "
              >fa-solid fa-trash</v-icon
            >
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
              editedFeedbackReport.id = report.id;
              editedFeedbackReport.feedback = report.feedback;
            }
          "
        >
          <span :class="computedStatusColorClass(report.status)">{{
            report.status
          }}</span>
        </div>
        <!-- Show Full Report incident Information -->
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
              <div class="border-b-4 border-gray-900 col-span-4 my-3"></div>
              <!-- Feedback with predefined reasons -->
              <div class="mt-4">
                <h1 class="text-lg font-semibold mb-2">Feedback</h1>
                <div class="relative">
                  <textarea
                    id="reason"
                    v-model="editedFeedbackReport.feedback"
                    name="reason"
                    rows="4"
                    class="px-4 py-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feedback of the chosen status"
                    required
                  ></textarea>
                  <!-- Helper button -->
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                    @click="toggleReasonsList"
                  >
                    ?
                  </button>
                  <!-- Display reasons list -->
                  <div
                    v-show="showReasonsList"
                    class="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md"
                  >
                    <ul class="py-1">
                      <li
                        class="px-4 py-2 cursor-pointer"
                        @click="
                          selectReason(
                            'Thank you! Your report has been reviewed. You are invited to visit the guidance counselor within the next 3 to 5 days to discuss this matter further.'
                          )
                        "
                      >
                        Accepted (Modify if needed)
                      </li>
                      <li
                        class="px-4 py-2 cursor-pointer"
                        @click="
                          selectReason(
                            'Congratulations! Your reported incident has been successfully resolved. If you have any further concerns, feel free to reach out to the guidance counselor.'
                          )
                        "
                      >
                        Resolved (Modify if needed)
                      </li>
                      <li
                        class="px-4 py-2 cursor-pointer"
                        @click="
                          selectReason(
                            'We appreciate your concern, but after careful review, your report has been rejected. If you have additional information or questions, please contact the guidance counselor for clarification.'
                          )
                        "
                      >
                        Rejected (Modify if needed)
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
                  @click="
                    ($event) => updateFeedbackReport(editedFeedbackReport)
                  "
                >
                  SEND
                </button>
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
        <!-- Delete Modal -->
        <div v-if="showDeleteIncidentReport" class="modal2 h-screen w-full">
          <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-xl font-bold">Delete Incident?</h2>
            <span class="text-sm text-slate-500">
              This will delete this incident permanently. You cannot undo this
              action.</span
            >
            <div class="grid grid-cols-4">
              <div
                class="col-start-1 col-end-2 row-span-2 w-16 h-16 rounded-full overflow-hidden"
              >
                <img :src="Delete_Incident.user.image" alt="Avatar" />
              </div>
              <div class="col-start-2 col-span-3 ml-4">
                <h1 class="text-md font-semibold">
                  {{ Delete_Incident.user.name }}
                </h1>
              </div>
              <div class="row-start-2 col-start-2 col-span-2 ml-4 mt-2 mb-1.5">
                <span
                  class="text-md font-semibold text-zinc-600 line-clamp-2"
                  >{{ Delete_Incident.reason }}</span
                >
              </div>
            </div>
            <div class="flex justify-end">
              <button
                v-if="data?.user?.role == 'SUPERADMIN'"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                @click="
                  () => {
                    deleteReport(Delete_Incident.id);
                    showDeleteIncidentReport = false;
                  }
                "
              >
                Delete
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="() => (showDeleteIncidentReport = false)"
              >
                Cancel
              </button>
            </div>
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
const showDeleteIncidentReport = ref(false);
const Delete_Incident = ref(null);
const detailedIncident = ref(null);

const formatCreatedAt = (createdAtTimestamp) => {
  const parsedDate = new Date(createdAtTimestamp);
  // Format the incident in a human-readable way
  return parsedDate.toLocaleString(); // Adjust options as needed
};

const showReasonsList = ref(false);

// Function to toggle the display of the reasons list
const toggleReasonsList = () => {
  showReasonsList.value = !showReasonsList.value;
};

// Function to select a reason from the list
const selectReason = (reason) => {
  editedFeedbackReport.value.feedback = reason; // Update the textarea value
  showReasonsList.value = false; // Hide the reasons list
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
// Changing Status of the Report Incident
const updateStatusReport = async (reportId, newStatus) => {
  try {
    // Make an API request to update the incident status
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
const editedFeedbackReport = ref({
  id: null,
  feedback: null,
});
// Changing Status of the Incident Feedback
const updateFeedbackReport = async (editedFeedbackReport) => {
  try {
    // Make an API request to update the feedback
    const response = await fetch(`/api/reportFeedback`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editedFeedbackReport.id, // Include the reportId in the request body
        feedback: editedFeedbackReport.feedback,
      }),
    });

    // Parse the response body as JSON
    incidents.value = await $fetch("/api/report");
  } catch (error) {
    console.error("Error updating report status:", error);
    // Handle error, show a notification, etc.
  }
};

// Actual Deleting an appointment
const deleteReport = async (id) => {
  let deleteReport = null;
  if (id)
    deleteReport = await $fetch("/api/report", {
      method: "DELETE",
      body: {
        id,
      },
    });

  incidents.value = await $fetch("/api/report");
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
