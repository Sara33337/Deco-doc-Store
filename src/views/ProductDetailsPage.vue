<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/ProductStore';
import ProductDetails from '@/components/ProductDetails.vue'; 
import CategoryCard from '@/components/CategoryCard.vue';

const route = useRoute();
const store = useProductStore();

const productId = computed(() => String(route.params.productId ?? ''));
const product = computed(() => store.productById(productId.value));
const category = computed(() => {
  if (product.value) {
    return store.categoryById(String(product.value.categoryId)) ?? null;
  }
  return null;
});

onMounted(async () => {
  if (store.products.length === 0 || store.categories.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
    
  <div dir="rtl" class="wrapper">
     <CategoryCard/>
    <!-- Loading State -->
    <div v-if="store.loading" class="flex justify-center items-center ]">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Error State -->
    <div v-else-if="!product" class="text-center text-red-500 bg-red-100 border border-red-200 rounded-xl p-6">
      المنتج غير موجود.
    </div>

    <!-- Extracted Component -->
    <ProductDetails 
      v-else 
      :product="product" 
      :category="category" 
    />
  </div>
</template>