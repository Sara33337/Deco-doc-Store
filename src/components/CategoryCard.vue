<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/ProductStore';

const store = useProductStore();
const categories = computed(() => store.categories);

onMounted(async () => {
  if (store.categories.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
 <div 
  dir="rtl" 
  class="grid grid-flow-col auto-cols-[calc((100%-1.5rem)/3)] gap-3 overflow-x-auto pb-4 no-scrollbar 
         md:grid-flow-row md:grid-cols-4 
         lg:grid-cols-6">
    
    <router-link
      v-for="category in categories"
      :key="category.id"
      :to="{ name: 'category', params: { categoryId: String(category.id) } }"
      class="bg-card-background/44 rounded-lg h-40 cursor-pointer flex flex-col items-center justify-center gap-2 p-2 border border-transparent hover:border-main transition-all"
    >
      <!-- تصغير الصورة شوية عشان تناسب الصفين -->
      <img :src="category.imageUrl" alt="Category Image" class="w-full h-20 object-contain">
      
      <!-- تصغير الخط شوية للموبايل -->
      <span class="text-main font-medium text-sm text-center line-clamp-1">
        {{ category.name }}
      </span>
    </router-link>

  </div>
</template>

<style scoped>

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>