<template>
  <div>
    <!-- Hero Area -->
    <div class="text-white py-16 bg-green-800 mb-4">
      <div class="grid place-content-center">
        <img src="/img/reportIncident.png" alt="Hero Image" class="w-64" />
      </div>
      <div class="text-center mt-4">
        <h1 class="text-3xl font-bold">If you see something, say something.</h1>
      </div>
      <div class="grid grid-cols-3 mt-4">
        <button
          class="hero-button text-lg font-semibold py-2 px-2 active:bg-gray-800 rounded-lg inline-block text-green-800 col-start-2 col-span-2 mr-4"
          @click="showReportIncidentForm = !showReportIncidentForm"
        >
          Report an Incident!
        </button>
      </div>
    </div>
    <!-- Form Modal -->
    <div v-if="showReportIncidentForm" class="modal h-screen w-full">
      <div class="modal-wrapper bg-white p-4 rounded-lg w-10/12">
        <h1 class="font-bold text-lg mb-4 mt-2">Report an Incident</h1>
        <form
          class="space-y-4"
          @submit.prevent="addReport(report, data?.user?.id)"
        >
          <div>
            <label
              for="incident"
              class="block text-sm font-medium text-gray-700"
              >Incident:</label
            >
            <!-- Incident input field with helping button -->
            <div class="relative">
              <input
                v-model="report.incident"
                type="text"
                class="p-2 w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Incident"
                required
              />

              <!-- Helper button -->
              <button
                type="button"
                class="absolute inset-y-0 right-0 px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                @click="toggleIncidentList"
              >
                ?
              </button>

              <!-- Display incident choices list -->
              <div
                v-show="showIncidentList"
                class="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md"
              >
                <ul class="py-1">
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Academic Issues')"
                  >
                    Academic Issues
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Bullying')"
                  >
                    Bullying
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Substance Abuse')"
                  >
                    Alcohol and Substance Abuse
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Theft')"
                  >
                    Theft
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Discrimination')"
                  >
                    Discrimination
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Conflict Resolution')"
                  >
                    Conflict Resolution
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Health and Safety Concerns')"
                  >
                    Health and Safety Concerns
                  </li>
                  <li
                    class="px-4 py-2 cursor-pointer"
                    @click="selectIncident('Other Concern')"
                  >
                    Other Concern.
                  </li>
                </ul>
              </div>
            </div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
              >Description:</label
            >
            <textarea
              v-model="report.description"
              class="w-full p-2 border rounded mb-4"
              placeholder="Brief Description of an Incident"
              rows="2"
              required
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="showReportIncidentForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Edit/Reschedule Modal -->
    <div v-if="showReportIncidentEditForm" class="modal h-screen w-full">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Incident Report</h2>
        <div>
          <input
            v-model="editedReport.incident"
            type="incident"
            class="w-full p-2 border rounded mb-4"
            placeholder="Incident"
            required
          />
          <textarea
            v-model="editedReport.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Reason for Counseling"
            rows="2"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editReport(editedReport)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showReportIncidentEditForm = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- Delete Modal -->
    <div v-if="showReportIncidentDeleteModal" class="modal h-screen w-full">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Delete your Incident Report?</h2>
        <div class="grid grid-cols-4">
          <div class="col-start-1 col-span-4 ml-4">
            <h1 class="text-md font-semibold">
              {{ Archive_IncidentReport.incident }}
            </h1>
          </div>
          <div class="row-start-2 col-start-1 col-span-3 ml-4 mt-2 mb-1.5">
            <p class="line-clamp-2">
              {{ Archive_IncidentReport.description }}
            </p>
          </div>
          <div class="row-start-2 col-start-4 col-span-2 mt-2">
            <span
              :class="computedStatusColorClass(Archive_IncidentReport.status)"
              >{{ Archive_IncidentReport.status }}</span
            >
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="
              () => {
                archivingReport(Archive_IncidentReport.id);
                showReportIncidentDeleteModal = false;
              }
            "
          >
            Delete
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="() => (showReportIncidentDeleteModal = false)"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- Display Report / Report List -->
    <div
      class="grid place-content-center p-4"
      v-for="report in incidents"
      :key="report.id"
    >
      <div v-if="report.isArchive == false">
        <div
          class="rounded-lg bg-slate-300 p-3 mx-3 mb-4"
          v-if="data?.user?.name == report?.user?.name"
        >
          <div class="text-xl font-bold mb-4 border-b-2 border-white">
            <h2>Counseling Report</h2>
          </div>
          <div class="grid grid-cols-4">
            <div class="text-lg mb-2 col-start-1 col-span-2 row-span-2">
              <h3>
                <span class="font-semibold">{{ report.incident }}</span>
              </h3>
            </div>
            <div class="text-base mb-2 col-start-3 col-span-2">
              <h3>{{ formatCreatedAt(report.createdAt) }}</h3>
            </div>
            <div
              class="text-sm mb-2 col-start-1 col-span-4"
              @click="
                ($event) => {
                  detailedReportIncident = report;
                  showReportIncidentFullDetail = true;
                }
              "
            >
              <p class="line-clamp-3">Description: {{ report.description }}</p>
            </div>
            <button
              class="text-red-500 font-semibold col-start-2"
              variant="tonal"
              @click="
                ($event) => {
                  showReportIncidentDeleteModal = true;
                  Archive_IncidentReport = report;
                }
              "
            >
              Delete
            </button>
            <button
              class="text-blue-500 font-semibold col-start-3"
              @click="
                ($event) => {
                  editedReport.id = report.id;
                  editedReport.incident = report.incident;
                  editedReport.description = report.description;
                  editedReport.isArchive = report.isArchive;
                  showReportIncidentEditForm = true;
                }
              "
            >
              Edit
            </button>
            <span
              class="col-start-4"
              :class="computedStatusColorClass(report.status)"
              >{{ report.status }}</span
            >
          </div>
        </div>
      </div>
      <!-- Showing Full Detail and in order to see the feedback of the Admin -->
      <div v-if="showReportIncidentFullDetail" class="modal2 h-screen w-full">
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
          <h1 class="text-lg font-bold text-blue-500 mb-4">Full Details</h1>
          <div class="grid grid-cols-4 gap-4">
            <div class="col-start-1 col-span-4">
              <label class="text-base">Incident: </label>
              <span class="text-lg font-bold">{{
                detailedReportIncident.incident
              }}</span>
            </div>
            <div class="col-start-1 col-span-4">
              <label class="text-base">Description: </label>
              <span class="text-base font-bold">{{
                detailedReportIncident.description
              }}</span>
            </div>
            <div class="border-b-4 border-gray-900 col-span-4 my-3"></div>
            <div class="col-start-1 col-span-4">
              <label class="text-base">Feedback from the Guidance: </label>
              <span class="text-sm font-bold">{{
                detailedReportIncident.feedback
              }}</span>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-1 col-span-3 mt-4"
            @click="() => (showReportIncidentFullDetail = false)"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showReportIncidentForm = ref(false);
const showReportIncidentEditForm = ref(false);
const showReportIncidentDeleteModal = ref(false);
const showReportIncidentFullDetail = ref(false);
const detailedReportIncident = ref(null);

const showIncidentList = ref(false);

const toggleIncidentList = () => {
  showIncidentList.value = !showIncidentList.value;
};

const selectIncident = (incident) => {
  report.value.incident = incident;
  showIncidentList.value = false;
};

// Status color of the Report
const statusColorMapping = {
  Accepted: "text-green-500 font-semibold",
  Rejected: "text-red-500 font-semibold",
  Pending: "text-yellow-500 font-semibold",
  Resolved: "text-blue-500 font-semibold",
};

const computedStatusColorClass = (status) =>
  statusColorMapping[status] || "text-gray-500";

// Formatting Time
const formatCreatedAt = (createdAtTimestamp) => {
  const parsedDate = new Date(createdAtTimestamp);
  // Format the incident in a human-readable way
  return parsedDate.toLocaleString(); // Adjust options as needed
};

const { data: incidents } = useFetch("/api/report");
const { data } = useAuth();

// Creating Report Incident Logic
const report = ref({
  incident: "",
  description: "",
});

const addReport = async (report, userId) => {
  try {
    const addedReport = await $fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incident: report.incident,
        description: report.description,
        userId: userId,
      }),
    });
    if (addedReport) {
      // Reset form fields
      report.incident = "";
      report.description = "";

      // Update the list of report
      incidents.value = await $fetch("/api/report");
    } else {
      console.error("Error adding report:", addedReport);
      // Handle the case where the report was not added successfully
    }
  } catch (error) {
    console.error("Error in addReport:", error);
    // Handle any other errors that might occur
  }
};
// Editing / Reschedule of the Report
const editedReport = ref({
  id: null,
  incident: null,
  description: null,
  isArchive: false,
});

const editReport = async (editedReport) => {
  let incident = null;
  try {
    if (editedReport.id) {
      incident = await $fetch("/api/report", {
        method: "PUT",
        body: {
          id: editedReport.id,
          incident: editedReport.incident,
          description: editedReport.description,
          isArchive: editedReport.isArchive,
        },
      });

      // Optionally, you can fetch the updated report here
      incidents.value = await $fetch("/api/report");

      // Close the modal or perform any other actions
      showReportIncidentEditForm.value = false;
    }
  } catch (error) {
    console.error("Error updating incident:", error);
  }
};

const Archive_IncidentReport = ref(null);

const archivingReport = async (id) => {
  let response = null;
  try {
    if (id) {
      // Update the isArchive property to true
      report.isArchive = true;

      // Send a PUT request to update the report
      response = await $fetch("/api/reportsArchive", {
        method: "PUT",
        body: {
          id: id,
          isArchive: report.isArchive,
        },
      });

      // Fetch the updated list of report
      incidents.value = await $fetch("/api/report");
    }
  } catch (error) {
    console.error("Error archiving report:", error);

    // Handle any errors that might occur during the archiving process
  } finally {
    // Close the delete modal
    showReportIncidentDeleteModal.value = false;
  }
};
</script>

<style scoped>
.hero-button {
  background-color: #c7ffb2;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
