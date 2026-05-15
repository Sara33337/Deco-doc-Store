<script setup lang="ts">
const props = defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
});
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    class="border border-main rounded-lg px-4 py-0.5 text-main cursor-pointer hover:bg-main hover:text-light-text transition-colors duration-300 text-center"
  >
    المزيد
  </router-link>

  <div
    v-else
    class="border border-main rounded-lg px-4 py-0.5 text-main cursor-pointer hover:bg-main hover:text-light-text transition-colors duration-300 text-center"
  >
    المزيد
  </div>
</template>