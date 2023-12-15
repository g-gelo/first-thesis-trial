<template>
  <div>
    <button
      v-if="!showUserTable"
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
      @click="
        ($event) => {
          showUserTable = true;
        }
      "
    >
      Create a Job Career Event
    </button>
    <button
      v-else
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 rounded-lg"
      @click="
        ($event) => {
          showUserTable = false;
        }
      "
    >
      Hide Job Career Event
    </button>
    <div v-if="showUserTable" class="grid grid-cols-3">
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
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
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
        class="mt-4 flex items-center justify-center space-x-4 col-start-1 col-span-3"
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
          :disabled="currentPage * itemsPerPage >= allAccount.length"
          class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-500"
          @click="nextPage"
        >
          Next &gt;
        </button>
      </div>

      <div class="my-2 text-sm font-semibold col-start-1 col-span-3">
        The database received {{ allAccount?.length || 0 }} records:
      </div>
    </div>
    <div v-if="showUserTable">
      <div class="overflow-x-auto">
        <table
          class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
        >
          <thead class="bg-green-800 text-white">
            <tr>
              <th class="py-2 px-4 border-b">Name</th>
              <th class="py-2 px-4 border-b">Email</th>
              <th class="py-2 px-4 border-b">Role</th>
              <th
                v-if="data?.user?.role == 'SUPERADMIN'"
                class="py-2 px-4 border-b"
              >
                Roles
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in pagedUsers"
              :key="user.id"
              class="hover:bg-gray-50"
            >
              <td class="py-3 px-4 border-b">{{ user.name }}</td>
              <td class="py-3 px-4 border-b">{{ user.email }}</td>
              <td class="py-3 px-4 border-b">{{ user.role }}</td>
              <td
                v-if="data?.user?.role == 'SUPERADMIN'"
                class="py-3 px-4 border-b"
              >
                <div class="flex items-center space-x-2">
                  <select
                    id="role"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    @change="
                      confirmUpdateUserRole(user.id, $event.target.value)
                    "
                  >
                    <option
                      value="SUPERADMIN"
                      :selected="user.role === 'SUPERADMIN'"
                    >
                      Super Admin
                    </option>
                    <option value="ADMIN" :selected="user.role === 'ADMIN'">
                      Admin
                    </option>
                    <option value="USER" :selected="user.role === 'USER'">
                      User
                    </option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const showUserTable = ref(false);
// Pagination
const currentPage = ref(1);
const itemsPerPage = 3;

const pagedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredUsers.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < allAccount.value.length) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
// Filter
const searchKeyword = ref("");
const selectedFilter = ref("name");

const resetFilters = () => {
  searchKeyword.value = "";
  selectedFilter.value = "name";
  currentPage.value = 1;
};
const filteredUsers = computed(() => {
  const filterKey = selectedFilter.value.toLowerCase();
  return allAccount.value.filter((acc) =>
    acc[filterKey].toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});
const { data: allAccount } = await useFetch("/api/users");
const { data } = useAuth();

const updateUserRole = async (userId, newRole) => {
  try {
    // Make an API request to update the user role
    const response = await fetch(`/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, // Include the userId in the request body
        newRole,
      }),
    });

    // Parse the response body as JSON
    const updatedUser = await response.json();

    // Find the index of the updated user in the array and replace it
    const userIndex = allAccount.value.findIndex(
      (user) => user.id === updatedUser.id
    );
    if (userIndex !== -1) {
      allAccount.value[userIndex] = updatedUser;
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    // Handle error, show a notification, etc.
  }
};

const confirmUpdateUserRole = (userId, newRole) => {
  const isConfirmed = confirm(
    "Are you sure you want to change the user's role?"
  );
  if (isConfirmed) {
    updateUserRole(userId, newRole);
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
</style>
