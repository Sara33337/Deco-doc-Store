<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/ProductStore';
import ProductCard from '@/components/ProductCard.vue';
import Title from '@/components/Title.vue';
import CaregoryCard from '@/components/CategoryCard.vue';

const store = useProductStore();

onMounted(async () => {
  if (store.products.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
   
  <div class="wrapper" dir="rtl">
    <CategoryCard/>
    <div class="flex justify-between items-center mb-8" dir="rtl">
      <Title title="كل المنتجات" />
    </div>

    <div v-if="store.loading" class="flex justify-center items-center min-h-[40vh]">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="store.error" class="text-red-500 bg-red-100 border border-red-200 rounded-xl p-4">
      {{ store.error }}
    </div>

    <div v-else-if="store.products.length === 0" class="text-center text-subtitle py-16">
      لم يتم العثور على أي منتجات.
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4">
      <ProductCard
        v-for="product in store.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
