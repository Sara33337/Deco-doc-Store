<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductsSection from '@/components/ProductsSection.vue';
import { useProductStore } from '@/stores/ProductStore';

const route = useRoute();
const store = useProductStore();
const categoryId = computed(() => String(route.params.categoryId ?? ''));
const category = computed(() => store.categoryById(categoryId.value));
const products = computed(() => store.productsByCategory(categoryId.value));

onMounted(async () => {
  if (store.products.length === 0 || store.categories.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
  <div class="wrapper" dir="rtl">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-main">
        {{ category?.name ?? 'منتجات الفئة' }}
      </h1>
      <p v-if="category" class="text-subtitle mt-2">عرض جميع المنتجات من هذه الفئة.</p>
    </div>

    <div v-if="store.loading" class="flex justify-center items-center min-h-[40vh]">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="!category" class="text-center text-red-500 bg-red-100 border border-red-200 rounded-xl p-6">
      فئة غير موجودة.
    </div>

   
    <div v-else>
      <ProductsSection title="المنتجات" :products="products" :hideMore="true" class="flex-wrap" />
      <div v-if="products.length === 0" class="text-center text-subtitle py-16">
        لا توجد منتجات مرتبطة بهذه الفئة.
      </div>
    </div>
  </div>
</template>
