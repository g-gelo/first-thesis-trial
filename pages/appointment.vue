<template>
  <div>
    <!-- Hero Area -->
    <div class="text-white py-16 bg-green-800">
      <div class="grid place-content-center">
        <img src="../img/BookAppointment.png" alt="Hero Image" class="w-64" />
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
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="col-span-1 md:col-span-1">
              <label for="date" class="block text-sm font-medium text-gray-700"
                >Date:</label
              >
              <input
                id="date"
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
                <input
                  id="reason"
                  v-model="reasonsInput"
                  class="p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Reason for Counseling"
                  @input="watchInput"
                />
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
                      class="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      @click="selectReason('Academic Concern')"
                    >
                      Academic Concern
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      @click="selectReason('Behavior Maladjustments')"
                    >
                      Behavior Maladjustments
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      @click="
                        selectReason(
                          'Violation to school Rules, specifically...'
                        )
                      "
                    >
                      Violation to school Rules, specifically...
                    </li>
                    <li
                      class="px-4 py-2 cursor-pointer hover:bg-blue-100"
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
                name="year"
                class="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
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
    <div class="grid place-content-center">
      <div class="mt-8 rounded-lg bg-slate-300 p-3">
        <div class="text-xl font-bold mb-4 border-b-2 border-white">
          <h2>Appointment List</h2>
        </div>
        <!-- List Content -->
        <div class="bg-white p-4 rounded-lg mb-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold mr-2">John Doe</h3>
            <span class="text-gray-500">Dec 25, 2023 | 3:00 PM</span>
          </div>
          <p class="text-gray-700 mt-2">BSIT - Year 2</p>
          <p class="text-gray-700 mt-2">Reason: Academic Concern</p>
          <div class="mt-4 flex justify-end space-x-4">
            <button
              class="text-red-500 font-semibold"
              @click="deleteAppointment"
            >
              Delete
            </button>
            <button
              class="text-blue-500 font-semibold"
              @click="rescheduleAppointment"
            >
              Reschedule
            </button>
            <span class="text-green-500 font-semibold">Accepted</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showAppointmentForm = ref(false);
const showReasonsList = ref(false);
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
</style>
