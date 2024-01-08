<template>
  <div>
    <!-- Bar Graph -->
    <div class="m-2">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const incidents = ref(null);

const content = {
  labels: [
    "Academic Issues",
    "Bullying",
    "Substance Abuse",
    "Theft",
    "Discrimination",
    "Conflict Resolution",
    "Health and Safety Concerns",
    "Other Concern",
  ],
  datasets: [
    {
      label: "Number of Incidents",
      data: Array(8).fill(0),
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const countIncidentOccurrences = (incidents) => {
  if (!Array.isArray(incidents)) {
    console.error("Incidents is not an array:", incidents);
    return Array(8).fill(0);
  }

  const incidentCounts = Array(8).fill(0);

  incidents.forEach((incident) => {
    if (incident && incident.incident) {
      const incidentIndex = content.labels.indexOf(incident.incident.trim());

      if (incidentIndex !== -1) {
        incidentCounts[incidentIndex]++;
      } else {
        console.warn(`Incident type not found: ${incident.incident}`);
      }
    } else {
      console.warn("Invalid incident data:", incident);
    }
  });

  console.log("Incident Counts:", incidentCounts);

  return incidentCounts;
};

onMounted(async () => {
  try {
    const response = await fetch("/api/report");
    const data = await response.json();
    incidents.value = data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const ctx = document.getElementById("myChart");

  if (incidents.value) {
    const incidentCounts = countIncidentOccurrences(incidents.value);
    content.datasets[0].data = incidentCounts;

    new Chart(ctx, {
      type: "bar",
      data: content,
      options: options,
    });
  }
});
</script>

<style scoped>
/* Your styles go here */
</style>
