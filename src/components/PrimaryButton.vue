<script setup>
defineProps({
  buttonText: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: false,
    default: '#' 
  }
});

// تعريف الإشارة اللي الزرار هيطلعها
const emit = defineEmits(['click']);
</script>

<template>
  <a 
    :href="href" 
    @click.prevent="emit('click')" 
    class="inline-block py-3 px-10 bg-main text-light-text transition-opacity hover:opacity-90 rounded-lg cursor-pointer"
  >
    {{ buttonText }}
  </a>
</template>