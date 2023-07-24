<!-- <script setup lang="ts">
const { data: examples } = useFetch("/api/examples");
</script>

<template>
    <div>
        Prisma ORM Data from the database, received
        {{ examples?.length || 0 }} records:
        <pre>{{ examples }}</pre>

        <v-table density="compact">
            <thead>
                <tr>
                    <th class="text-left">Id</th>
                    <th class="text-left">Details</th>
                    <th class="text-left">Calories</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detail, index) in examples" :key="detail.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.details }}</td>
                    <td>Evang</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template> -->

<script setup lang="ts">
const { data: seminars } = useFetch("/api/seminars");
</script>

<template>
    <div>
        <div>
            <v-table density="compact">
                <thead>
                    <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Time</th>
                        <th class="text-left">Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="seminar in seminars" :key="seminar.id">
                        <td>{{ seminar.title }}</td>
                        <td>{{ seminar.description }}</td>
                        <td>{{ seminar.time }}</td>
                        <td>{{ seminar.location }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>
