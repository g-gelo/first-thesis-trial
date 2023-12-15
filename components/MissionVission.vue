<template>
  <div>
    <button
      v-if="!showModalMisnVis"
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
      @click="
        ($event) => {
          showModalMisnVis = true;
        }
      "
    >
      Show Mission and Vision
    </button>
    <button
      v-else
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
      @click="
        ($event) => {
          showModalMisnVis = false;
        }
      "
    >
      Hide Mission and Vision
    </button>
    <div v-if="showModalMisnVisEdit" class="modal z-40">
      <div class="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 class="text-xl font-bold mb-4">Edit Mission and Vision</h2>
        <div>
          <input
            v-model="editedMisnVis.title"
            class="w-full p-2 border rounded mb-4"
            placeholder="Title"
            required
          />
          <textarea
            v-model="editedMisnVis.description"
            class="w-full p-2 border rounded mb-4"
            placeholder="Description"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            v-if="data?.user?.role == `SUPERADMIN`"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="($event) => editMisnVis(editedMisnVis)"
          >
            Save
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="showModalMisnVisEdit = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showModalMisnVis"
      class="mt-4 flex items-center justify-center space-x-4 ma-3"
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
        :disabled="currentPage * itemsPerPage >= missionvision.length"
        class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
        @click="nextPage"
      >
        Next &gt;
      </button>
    </div>
    <div v-if="showModalMisnVis">
      <div class="mb-4 text-sm font-semibold">
        The database received {{ missionvision?.length || 0 }} records:
      </div>
      <div class="overflow-x-auto">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b text-left">Title</th>
              <th class="py-2 px-4 border-b text-left">Description</th>
              <th class="py-2 px-4 border-b text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="misnvis in pagedMisNVis"
              :key="misnvis.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">{{ misnvis.title }}</td>
              <td class="py-3 px-4 border-b line-clamp-3">
                {{ misnvis.description }}
              </td>
              <td class="py-3 px-4 border-b">
                <v-btn
                  v-if="!showModalMisnVisEdit"
                  variant="tonal"
                  @click="
                    ($event) => {
                      editedMisnVis.id = misnvis.id;
                      editedMisnVis.title = misnvis.title;
                      editedMisnVis.description = misnvis.description;
                      showModalMisnVisEdit = true;
                    }
                  "
                >
                  Edit
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = useAuth();

const currentPage = ref(1);
const itemsPerPage = 2;

const pagedMisNVis = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return missionvision.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < missionvision.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
const showModalMisnVis = ref(false);
const showModalMisnVisEdit = ref(false);

const { data: missionvision } = useFetch("/api/missionvision");

const editedMisnVis = ref({
  id: null,
  title: null,
  description: null,
});

const editMisnVis = async (editedMisnVis) => {
  let missionNVision = null;

  if (editedMisnVis.id && editedMisnVis.title && editedMisnVis.description)
    missionNVision = await $fetch("/api/missionvision", {
      method: "PUT",
      body: {
        id: editedMisnVis.id,
        title: editedMisnVis.title,
        description: editedMisnVis.description,
      },
    });
  missionvision.value = await $fetch("/api/missionvision");
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
