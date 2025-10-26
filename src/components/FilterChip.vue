<template>
  <button
    class="chip"
    :class="{ 'chip--active': active }"
    type="button"
    @click="emit('click')"
    :aria-pressed="active"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);
</script>

<style scoped></style>
