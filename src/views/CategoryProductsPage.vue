<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/ProductStore';
import ProductCard from '@/components/ProductCard.vue';
import Footer from '@/components/Footer.vue';

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
      <div v-if="products.length === 0" class="text-center text-subtitle py-16">
        لا توجد منتجات مرتبطة بهذه الفئة.
      </div>
      <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-4 justify-items-center">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
  <Footer/>
</template>
