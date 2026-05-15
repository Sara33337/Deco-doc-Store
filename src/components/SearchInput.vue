<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
const query = ref(props.modelValue);

watch(query, (value) => {
  emit('update:modelValue', value);
});
</script>

<template>
    <div class="flex justify-center items-center mt-24 mb-10">
        <input dir="rtl"
            type="text"
            v-model="query"
            placeholder="ابحث عن منتجك المفضل..."
            class="w-full max-w-md px-4 py-2 border border-subtitle rounded-xl focus:outline-none focus:ring-2 focus:ring-main"
        />
    </div>
</template>