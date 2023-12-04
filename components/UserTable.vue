<template>
    <div>
        <h1 class="pb-4">All Account</h1>
        <div class="btn">
            <button
                v-if="!showAccountTable"
                @click="
                    ($event) => {
                        showAccountTable = true;
                    }
                "
            >
                Show Account Table
            </button>
            <button
                v-else
                @click="
                    ($event) => {
                        showAccountTable = false;
                    }
                "
            >
                Hide Account Table
            </button>
        </div>
        <div
            v-if="showAccountTable"
            class="mt-4 flex items-center justify-center space-x-4 ma-3"
        >
            <div
                class="flex flex-col items-start sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
            >
                <label for="search" class="text-sm font-semibold"
                    >Search:</label
                >
                <input
                    id="search"
                    v-model="searchKeyword"
                    type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search"
                />
            </div>
            <div class="flex items-center space-x-2">
                <label for="filter" class="text-sm font-semibold"
                    >Filter:</label
                >
                <select
                    id="filter"
                    v-model="selectedFilter"
                    class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="role">Role</option>
                </select>
            </div>
            <button
                class="px-2 py-1 bg-gray-300 text-gray-600 rounded-md focus:outline-none hover:bg-gray-400"
                @click="resetFilters"
            >
                Reset Filters
            </button>
        </div>

        <div
            v-if="showAccountTable"
            class="mt-4 flex items-center justify-center space-x-4"
        >
            <button
                :disabled="currentPage === 1"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                @click="prevPage"
            >
                &lt; Prev
            </button>
            <span class="text-sm font-semibold">{{ currentPage }}</span>
            <button
                :disabled="currentPage * itemsPerPage >= allAccount.length"
                class="px-2 py-1 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-300"
                @click="nextPage"
            >
                Next &gt;
            </button>
        </div>
        <div v-if="showAccountTable">
            <div>
                The database received {{ allAccount?.length || 0 }} records:
            </div>
            <div class="table-container">
                <table density="compact" class="min-w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in pagedUsers" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td v-if="data?.user?.role == `SUPERADMIN`">
                                <div class="flex items-center space-x-2">
                                    <select
                                        id="role"
                                        class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        @change="
                                            confirmUpdateUserRole(
                                                user.id,
                                                $event.target.value
                                            )
                                        "
                                    >
                                        <option
                                            value="SUPERADMIN"
                                            :selected="
                                                user.role === 'SUPERADMIN'
                                            "
                                        >
                                            Super Admin
                                        </option>
                                        <option
                                            value="ADMIN"
                                            :selected="user.role === 'ADMIN'"
                                        >
                                            Admin
                                        </option>
                                        <option
                                            value="USER"
                                            :selected="user.role === 'USER'"
                                        >
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
const showAccountTable = ref(false);

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
.btn button {
    display: flex;
    width: 100%;
    padding: 1em;
    justify-content: center;
    margin-bottom: 2em;
    background-color: #d1d1d1;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
}

.btn button:active {
    opacity: 0.5;
}
.table-container {
    overflow-x: auto;
    max-width: 100%;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
}
td {
    height: 100px;
}
td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
tr:nth-child(odd) {
    background-color: #b5bbc4;
}
</style>
