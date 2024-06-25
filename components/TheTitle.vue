<template>
  <v-container
    gutter
    class="custom-container"
    :style="{
      backgroundColor: $vuetify.theme.themes.myCustomLightTheme.colors.bg100,
      backgroundImage: `url(${backgroundImage}), url(${svgBlob})`,
    }"
  >
    <h1
      class="custom-title custom-center"
      :style="{
        color: $vuetify.theme.themes.myCustomLightTheme.colors.primary300,
      }"
    >
      {{ title }}
    </h1>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  backgroundImage: string;
  svgBlob: string;
}>();
</script>

<style scoped>
.custom-container {
  height: 20vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right bottom;
}
.custom-title {
  font-size: 24px;
  font-weight: bold;
  margin: 10% 10% 12% 4%;
  border-left: 5px solid #286400;
  padding-left: 1rem;
}
</style>
