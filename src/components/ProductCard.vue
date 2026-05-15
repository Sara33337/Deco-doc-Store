<script setup lang="ts">
import { computed } from 'vue';
import LabelCard from './LabelCard.vue';
import PrimaryButton from './PrimaryButton.vue';

const props = defineProps({
    product : {
        type : Object,
        required : true
    }
});

const productLink = computed(() => ({
  name: 'product',
  params: { productId: String(props.product.id) }
}));
</script>

<template>
    <router-link :to="productLink" class="shrink-0 w-60 md:w-70 flex flex-col gap-3 p-4 relative group" dir="rtl">
      <div v-if="product.bestSeller">
        <LabelCard label="الأكثر مبيعاً"/>
      </div>
      <div v-else-if="product.inStock">
        <LabelCard label="فوري"/>
      </div>

      <!-- الصورة -->
      <div class="w-full h-52 overflow-hidden relative">
        <img :src="product.imageUrl" alt="Product Image" class="w-full h-full object-contain hover:scale-105 transition-transform duration-300">
      </div>

      <!-- تفاصيل المنتج -->
      <div class="flex flex-col gap-1 grow">
        <h3 class="text-lg font-bold text-main line-clamp-1">{{ product.name }}</h3>
        <p class="text-sm text-subtitle font-regular line-clamp-2 h-10">
          {{ product.description }}
        </p>
        <p class="text-xl font-bold text-main mt-2">{{ product.price }} ج . م</p>
      </div>

      <div class="mt-auto flex justify-center w-full">
        <PrimaryButton buttonText="اطلب الآن" class="px-8 py-1.5 text-center" />
      </div>
    </router-link>
</template>

