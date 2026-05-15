<script setup>
import { onMounted } from 'vue';
import ProductsSection from './ProductsSection.vue';
import { useProductStore} from '@/stores/ProductStore';

// استدعاء الستور - Pinia هيقوم بدور الـ Source of Truth
const store = useProductStore();

onMounted(async () => {
  // جلب البيانات فقط لو مش موجودة (تجنب الـ Overfetching)
  if (store.products.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
  <!-- عرض الـ Loader باستخدام DaisyUI -->
  <div v-if="store.loading" class="flex justify-center items-center min-h-[40vh]">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>

  <!-- عرض الأقسام بناءً على الـ Getters المحسوبة في الستور -->
  <main v-else class="space-y-12 py-8">
    <div v-if="store.error" class="text-red-500 bg-red-100 border border-red-200 rounded-xl p-4">
      {{ store.error }}
    </div>
    
    <!-- قسم الأكثر مبيعاً - هيظهر فقط لو فيه منتجات فعلاً -->
     <ProductsSection 
      title="منتجاتنا :" 
      :products="store.products" 
      :moreLink="{ name: 'products' }"
    />
    <ProductsSection 
      v-if="store.bestSellers.length > 0"
      title="الأكثر مبيعا :"
      :products="store.bestSellers" 
      :moreLink="{ name: 'products' }"
    />

    <!-- قسم المتوفر الآن -->
    <ProductsSection 
      v-if="store.availableNow.length > 0"
      title="متوفر حاليا :"
      :products="store.availableNow" 
    />

    <!-- قسم كل المنتجات -->
    
    
  </main>
</template>