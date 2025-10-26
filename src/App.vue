<template>
  <!-- App root -->
  <router-view />
</template>

<script setup>
// no logic needed here   routing handled in router/index.js
</script>

<style>
/* optional global app-level styling */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}
</style>
