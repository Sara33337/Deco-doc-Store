<script setup>
import { computed } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  // Use 'to' for internal Vue Router paths (e.g., /about)
  to: {
    type: [String, Object],
    default: null
  },
  // Use 'href' for external links (e.g., https://google.com)
  href: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['click']);

// Determine if the component should be a router-link, an anchor, or a button
const isRouterLink = computed(() => !!props.to);
const isExternalLink = computed(() => !!props.href);

const handleClick = (event) => {
  if (!isRouterLink.value && !isExternalLink.value) {
    event.preventDefault();
  }
  emit('click', event);
};
</script>

<template>
  <!-- 1. Internal Routing -->
  <router-link 
    v-if="isRouterLink" 
    :to="to" 
    class="inline-block  px-10 bg-main text-white transition-opacity hover:opacity-90 rounded-lg cursor-pointer text-center"
  >
    {{ buttonText }}
  </router-link>

  <!-- 2. External Link -->
  <a 
    v-else-if="isExternalLink" 
    :href="href" 
    target="_blank"
    class="btn-style"
  >
    {{ buttonText }}
  </a>

  <!-- 3. Action Button -->
  <button 
    v-else 
    type="button"
    @click="handleClick" 
    class="inline-block px-10 bg-main text-white transition-opacity hover:opacity-90 rounded-lg cursor-pointer text-center"
  >
    {{ buttonText }}
  </button>
</template>
