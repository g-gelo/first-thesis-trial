<template>
  <div>
    <div class="flex justify-end p-4">
      <NuxtLink
        to="/admin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <i class="fa-solid fa-arrow-left"></i> Back
      </NuxtLink>
    </div>
    <!-- Appointment Container -->
    <div class="bg-slate-300 p-4 rounded-t-xl h-fit">
      <h1 class="text-lg font-bold my-2">Manage Appointment</h1>
      <!-- Filtering -->
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
            <option value="reason">Reason</option>
            <option value="course">Course</option>
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
      <!-- Appointment List Card -->
      <div
        v-for="book in pagedAppointment"
        :key="book.id"
        class="bg-white p-4 rounded-xl mb-4 grid grid-cols-5"
      >
        <div
          class="col-start-1 col-end-2 row-span-2 w-16 h-16 rounded-full overflow-hidden"
          @click="
            ($event) => {
              detailedAppointment = book;
              showFullInfo = true;
            }
          "
        >
          <img :src="book?.user?.image" alt="Avatar" />
        </div>
        <div
          class="col-start-2 col-span-3 ml-4"
          @click="
            ($event) => {
              detailedAppointment = book;
              showFullInfo = true;
            }
          "
        >
          <h1 class="text-md font-semibold">{{ book?.user?.name }}</h1>
        </div>
        <div v-if="data.user.role == 'SUPERADMIN'" class="col-start-5 ml-6">
          <button class="text-xs">
            <v-icon
              @click="
                ($event) => {
                  showDeleteModal = true;
                  Delete_Appointment = book;
                }
              "
              >fa-solid fa-trash</v-icon
            >
          </button>
        </div>
        <div class="row-start-2 col-start-2 col-span-2 ml-4 mt-2">
          <span
            class="text-md font-semibold text-zinc-600 line-clamp-1"
            @click="showFullInfo = true"
            >{{ book.reason }}</span
          >
        </div>
        <div class="row-start-2 col-start-4 ml-12">
          <span :class="computedStatusColorClass(book.status)">{{
            book.status
          }}</span>
        </div>
        <!-- Show Full Appointment Information -->
        <div v-if="showFullInfo" class="modal2 h-screen w-full">
          <!-- Modal content goes here -->
          <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-lg font-semibold">Full Details</h2>
            <div class="bg-white px-3 pt-3 pb-4 sm:p-6 sm:pb-4">
              <div class="mt-2 grid grid-cols-4">
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Name: {{ detailedAppointment?.user?.name }}
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-3">
                  Date: {{ detailedAppointment?.date }}
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-3">
                  Time: {{ detailedAppointment?.time }}
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-3">
                  Course: {{ detailedAppointment?.course }}
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-4">
                  Reason for Counseling: {{ detailedAppointment?.reason }}
                </p>
                <p class="text-sm text-gray-500 my-2 col-start-1 col-span-3">
                  Year: {{ detailedAppointment?.year }}
                </p>
                <p
                  v-if="detailedAppointment?.status === 'Canceled'"
                  class="text-sm text-gray-500 my-2 col-start-1 col-span-3"
                >
                  Reason for Canceling: {{ detailedAppointment?.cancel_reason }}
                </p>
                <div class="col-start-3 col-span-4">
                  <select
                    v-if="data?.user?.role == 'SUPERADMIN'"
                    id="status"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    @change="
                      updateStatusAppointment(
                        detailedAppointment.id,
                        detailedAppointment,
                        $event.target.value,
                        data?.user?.name,
                        data?.user?.email
                      )
                    "
                  >
                    <option
                      value="Pending"
                      :selected="detailedAppointment?.status === 'Pending'"
                    >
                      Pending
                    </option>
                    <option
                      value="Rejected"
                      :selected="detailedAppointment?.status === 'Rejected'"
                    >
                      Rejected
                    </option>
                    <option
                      value="Accepted"
                      :selected="detailedAppointment?.status === 'Accepted'"
                    >
                      Accepted
                    </option>
                    <option
                      value="Finished"
                      :selected="detailedAppointment?.status === 'Finished'"
                    >
                      Finished
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-1 col-span-3"
              @click="() => (showFullInfo = false)"
            >
              Close
            </button>
          </div>
        </div>
        <!-- Delete Modal -->
        <div v-if="showDeleteModal" class="modal2 h-screen w-full">
          <div class="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 class="text-xl font-bold">Delete Appointment?</h2>
            <span class="text-sm text-slate-500">
              This will delete this appointment permanently. You cannot undo
              this action.</span
            >
            <div class="grid grid-cols-4">
              <div
                class="col-start-1 col-end-2 row-span-2 w-16 h-16 rounded-full overflow-hidden"
              >
                <img :src="Delete_Appointment.user.image" alt="Avatar" />
              </div>
              <div class="col-start-2 col-span-3 ml-4">
                <h1 class="text-md font-semibold">
                  {{ Delete_Appointment.user.name }}
                </h1>
              </div>
              <div class="row-start-2 col-start-2 col-span-2 ml-4 mt-2 mb-1.5">
                <span
                  class="text-md font-semibold text-zinc-600 line-clamp-2"
                  >{{ Delete_Appointment.reason }}</span
                >
              </div>
            </div>
            <div class="flex justify-end">
              <button
                v-if="data?.user?.role == 'SUPERADMIN'"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                @click="
                  () => {
                    deleteAppointment(Delete_Appointment.id);
                    showDeleteModal = false;
                  }
                "
              >
                Delete
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="() => (showDeleteModal = false)"
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
          :disabled="currentPage * itemsPerPage >= (appointments?.length ?? 0)"
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
  title: "Appointment Management",
});

definePageMeta({
  layout: "admin-layout",
});

const { data } = useAuth();
const { data: appointments } = useFetch("/api/appointment");

const showDeleteModal = ref(false);
const showFullInfo = ref(false);
const detailedAppointment = ref(null);
const Delete_Appointment = ref(null);

const statusColorMapping = {
  Accepted: "text-green-500 font-semibold",
  Rejected: "text-red-500 font-semibold",
  Pending: "text-yellow-500 font-semibold",
  Finished: "text-blue-500 font-semibold",
  Canceled: "text-orange-500 font-semibold",
};

const computedStatusColorClass = (status) =>
  statusColorMapping[status] || "text-gray-500";

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const pagedAppointment = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredAppointment.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < appointments.value.length) {
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
const selectedFilter = ref("status");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "status";
  currentPage.value = 1;
};

const filteredAppointment = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return (
    appointments.value?.filter((appointment) =>
      appointment[filterKey]
        .toLowerCase()
        .includes(searchKeyword.value.toLowerCase())
    ) ?? []
  );
});

// Changing Status of the Appointment
const updateStatusAppointment = async (
  appointmentId,
  detailedAppointment,
  newStatus,
  userName,
  userEmail
) => {
  try {
    // Make an API request to update the appointment status
    const response = await fetch(`/api/appointmentAction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: appointmentId, // Include the appointmentId in the request body
        newStatus,
        date: detailedAppointment.date,
        time: detailedAppointment.time,
        reason: detailedAppointment.reason,
        course: detailedAppointment.course,
        year: detailedAppointment.year,
        name: userName,
        email: userEmail,
      }),
    });

    // Parse the response body as JSON
    appointments.value = await $fetch("/api/appointment");
  } catch (error) {
    console.error("Error updating appointment status:", error);
    // Handle error, show a notification, etc.
  }
};

// Actual Deleting an appointment
const deleteAppointment = async (id) => {
  let deletedAppointment = null;
  if (id)
    deletedAppointment = await $fetch("/api/appointment", {
      method: "DELETE",
      body: {
        id,
      },
    });

  appointments.value = await $fetch("/api/appointment");
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
