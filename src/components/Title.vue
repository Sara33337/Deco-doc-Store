<script setup>
defineProps({
  title: {
    type: String,
    default: "الأكثر مبيعاً"
  }
})
</script>
<template>
      <h1 class="text-xl md:text-[1.7rem] font-bold text-main " dir="rtl">{{ title }}</h1>
</template>