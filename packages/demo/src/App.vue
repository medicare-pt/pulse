<script setup lang="ts">
import PulseInput from '../../pulse-input/src/PulseInput.vue'
</script>

<template>
  <main class="max-w-4xl">
    <PulseInput label="Nome"
      placeholder="Primeiro Ultimo"
      name="Pulse"
      value="Lorem Ipsum"
      _hint="Lorem Ipsum"
      _error="Lorem Ipsum"
    />
  </main>
</template>

<style scoped>
@reference "tailwindcss";
@config '../tailwind.config.js';
</style>
