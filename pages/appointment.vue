<template>
  <div>
    <!-- Hero Area -->
    <div class="text-white py-16 bg-green-800">
      <div class="grid place-content-center">
        <img src="/img/BookAppointment.png" alt="Hero Image" class="w-64" />
      </div>
      <div class="text-center mt-4">
        <h1 class="text-3xl font-bold">
          Guidance awaits. Let's unpack your challenges.
        </h1>
      </div>

      <div class="grid grid-cols-3 mt-4">
        <button
          class="hero-button text-lg font-semibold py-2 px-2 active:bg-gray-800 rounded-lg inline-block text-green-800 col-start-2 col-span-2 mr-4"
          @click="showAppointmentForm = !showAppointmentForm"
        >
          Book an Appointment!
        </button>
      </div>
    </div>
    <!-- Form Modal -->
    <div v-if="showAppointmentForm" class="modal h-screen w-full">
      <div class="modal-wrapper bg-white p-4 rounded-lg w-10/12">
        <h1 class="font-bold text-lg mb-4 mt-2">Book Your Appointment</h1>
        <form
          class="space-y-4"
          @submit.prevent="addAppointment(appointment, data?.user?.id)"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="col-span-1 md:col-span-1">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Date:</label
              >
              <input
                id="date"
                v-model="appointment.date"
                type="date"
                name="date"
                class="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div class="col-span-1 md:col-span-1">
              <label for="time" class="block text-sm font-medium text-gray-700"
                >Time:</label
              >
              <input
                id="time"
                v-model="appointment.time"
                type="time"
                name="time"
                min="08:00"
                max="17:00"
                class="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div class="col-span-1 md:col-span-1">
              <label
                for="reason"
                class="block text-sm font-medium text-gray-700"
                >Reason for Counseling:</label
              >
              <div class="relative mt-1">
                <textarea
                  id="reason"
                  v-model="appointment.reason"
                  name="reason"
                  rows="2"
                  class="p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Reason for Counseling"
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
                      @click="selectReason('Academic Concern')"
                    >
                      Academic Concern
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer"
                      @click="selectReason('Behavior Maladjustments')"
                    >
                      Behavior Maladjustments
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer"
                      @click="
                        selectReason(
                          'Violation to school Rules, specifically...'
                        )
                      "
                    >
                      Violation to school Rules, specifically...
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer"
                      @click="selectReason('Other Concern, Specify')"
                    >
                      Other Concern, Specify.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-span-1 md:col-span-1">
              <label
                for="course"
                class="block text-sm font-medium text-gray-700"
                >Course:</label
              >
              <select
                id="course"
                v-model="appointment.course"
                name="course"
                class="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="bsit">BSIT</option>
                <option value="bscs">BSCS</option>
                <option value="bsoa">BSOA</option>
              </select>
            </div>
            <div class="col-span-1 md:col-span-1">
              <label for="year" class="block text-sm font-medium text-gray-700"
                >Year:</label
              >
              <select
                id="year"
                v-model="appointment.year"
                name="year"
                class="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
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
              @click="showAppointmentForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Appointment List Card -->
    <div
      class="grid place-content-center"
      v-for="book in appointments"
      :key="book.id"
    >
      <div
        class="mt-8 rounded-lg bg-slate-300 p-3 mx-3"
        v-if="data?.user?.name == book?.user?.name"
      >
        <div class="text-xl font-bold mb-4 border-b-2 border-white">
          <h2>Appointment List</h2>
        </div>
        <!-- List Content -->
        <div class="bg-white p-4 rounded-lg mb-4">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-semibold mr-2">{{ book?.user?.name }}</h3>
            <span class="text-gray-500">{{ book.date }} | {{ book.time }}</span>
          </div>
          <p class="text-gray-700 mt-2">
            {{ book.course }} - Year {{ book.year }}
          </p>
          <p class="text-gray-700 mt-2">Reason: {{ book.reason }}</p>
          <div class="mt-4 flex justify-end space-x-4">
            <button
              class="text-red-500 font-semibold"
              variant="tonal"
              @click="
                ($event) => {
                  showDeleteModal = true;
                  Delete_Appointment = book;
                }
              "
            >
              Delete
            </button>
            <button
              class="text-blue-500 font-semibold"
              @click="
                ($event) => {
                  editedAppointment.id = book.id;
                  editedAppointment.date = book.date;
                  editedAppointment.time = book.time;
                  editedAppointment.reason = book.reason;
                  editedAppointment.course = book.course;
                  editedAppointment.year = book.year;
                  editedAppointment.isArchive = book.isArchive;
                  showReschedule = true;
                }
              "
            >
              Reschedule
            </button>
            <span :class="computedStatusColorClass(book.status)">{{
              book.status
            }}</span>
          </div>
        </div>
      </div>
      <!-- Edit/Reschedule Modal -->
      <div v-if="showReschedule" class="modal2 h-screen w-full">
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
          <h2 class="text-xl font-bold mb-4">Edit Appointment</h2>
          <div>
            <input
              v-model="editedAppointment.date"
              type="date"
              class="w-full p-2 border rounded mb-4"
              placeholder="Date"
              required
            />
            <input
              v-model="editedAppointment.time"
              type="time"
              class="w-full p-2 border rounded mb-4"
              placeholder="Time"
              required
            />
            <textarea
              v-model="editedAppointment.reason"
              class="w-full p-2 border rounded mb-4"
              placeholder="Reason for Counseling"
              rows="2"
              required
            ></textarea>
            <label for="course" class="block text-sm font-medium text-gray-700"
              >Course:</label
            >
            <select
              id="course"
              v-model="editedAppointment.course"
              name="course"
              class="w-full p-2 border rounded mb-4"
              required
            >
              <option value="bsit">BSIT</option>
              <option value="bscs">BSCS</option>
              <option value="bsoa">BSOA</option>
            </select>
            <label for="year" class="block text-sm font-medium text-gray-700"
              >Year:</label
            >
            <select
              id="year"
              v-model="editedAppointment.year"
              name="year"
              class="w-full p-2 border rounded mb-4"
              required
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <!-- dapat wala tong status, delete ko sya later -->
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status:</label
            >
            <select
              v-model="editedAppointment.isArchive"
              class="w-full p-2 border rounded mb-4"
            >
              <option :value="false">Active</option>
              <option :value="true">Archived</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              v-if="
                data?.user?.role == `SUPERADMIN` || data?.user?.role == `ADMIN`
              "
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              @click="($event) => editAppointment(editedAppointment)"
            >
              Save
            </button>
            <button
              class="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="showReschedule = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <!-- Delete Modal -->
      <div v-if="showDeleteModal" class="modal2 h-screen w-full">
        <div class="bg-white shadow-lg rounded-lg p-6 w-80">
          <h2 class="text-xl font-bold mb-4">Delete your appointment?</h2>
          <div class="grid grid-cols-4">
            <div class="col-start-1 col-span-4 ml-4">
              <h1 class="text-md font-semibold">
                {{ Delete_Appointment.user.name }}
              </h1>
            </div>
            <div class="row-start-2 col-start-1 col-span-2 ml-4 mt-2 mb-1.5">
              <span class="text-md font-semibold text-zinc-600 line-clamp-1">{{
                Delete_Appointment.reason
              }}</span>
            </div>
            <div class="row-start-2 col-start-4 col-span-2 mt-2">
              <span
                :class="computedStatusColorClass(Delete_Appointment.status)"
                >{{ Delete_Appointment.status }}</span
              >
            </div>
          </div>
          <div class="flex justify-end mt-2">
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
  </div>
</template>

<script setup>
const showDeleteModal = ref(false);
const Delete_Appointment = ref(null);

const { data } = useAuth();

// Status color of the Appointment
const statusColorMapping = {
  Accepted: "text-green-500 font-semibold",
  Rejected: "text-red-500 font-semibold",
  Pending: "text-yellow-500 font-semibold",
  Finished: "text-blue-500 font-semibold",
};

const computedStatusColorClass = (status) =>
  statusColorMapping[status] || "text-gray-500";

const showAppointmentForm = ref(false);
const showReasonsList = ref(false);
const showReschedule = ref(false);
const selectedReason = ref("");
const reasonsInput = ref("");

// Function to toggle the display of the reasons list
const toggleReasonsList = () => {
  showReasonsList.value = !showReasonsList.value;
};

// Function to select a reason from the list
const selectReason = (reason) => {
  selectedReason.value = reason;
  reasonsInput.value = reason; // Optionally, update the input field value
  showReasonsList.value = false; // Hide the reasons list
};
const watchInput = () => {
  showReasonsList.value = false; // Hide the reasons list when the user types
};
// Get All Appointment Data
const { data: appointments } = useFetch("/api/appointment");

// Creating Appointment Logic
const appointment = ref({
  date: "",
  time: "",
  reason: "",
  course: "",
  year: "",
});

const addAppointment = async (appointment, userId) => {
  console.log("userId:", userId);
  try {
    const addedAppointment = await $fetch("/api/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
        course: appointment.course,
        year: appointment.year,
        userId: userId,
      }),
    });

    console.log("Added Appointment:", addedAppointment);

    if (addedAppointment) {
      // Reset form fields
      appointment.date = "";
      appointment.userId = "";
      appointment.time = "";
      appointment.reason = "";
      appointment.course = "";
      appointment.year = "";

      // Update the list of appointments
      appointments.value = await $fetch("/api/appointment");
    } else {
      console.error("Error adding appointment:", addedAppointment);
      // Handle the case where the appointment was not added successfully
    }
  } catch (error) {
    console.error("Error in addAppointment:", error);
    // Handle any other errors that might occur
  }
};
// Editing / Reschedule of the Appointment
const editedAppointment = ref({
  id: null,
  date: null,
  time: null,
  reason: null,
  course: null,
  year: null,
  status: null,
  isArchive: false,
});

const editAppointment = async (editedAppointment) => {
  let appointment = null;
  try {
    if (editedAppointment.id) {
      appointment = await $fetch("/api/appointment", {
        method: "PUT",
        body: {
          id: editedAppointment.id,
          date: editedAppointment.date,
          time: editedAppointment.time,
          reason: editedAppointment.reason,
          course: editedAppointment.course,
          year: editedAppointment.year,
          status: editedAppointment.status,
          isArchive: editedAppointment.isArchive,
        },
      });

      // Handle the response as needed (check status, show success message, etc.)
      console.log("PUT request response:", appointment);

      // Optionally, you can fetch the updated appointments here
      appointments.value = await $fetch("/api/appointment");

      // Close the modal or perform any other actions
      showReschedule.value = false;
    }
  } catch (error) {
    console.error("Error updating appointment:", error);

    // Optionally, you can show an error message to the user
    // or perform other error-handling actions
    // For example, you might set an error message to be displayed in the UI
    // errorMessage.value = "Error updating appointment: " + error.message;
  }
};

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
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
