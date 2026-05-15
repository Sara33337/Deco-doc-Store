<script setup lang="ts">
import MoreButton from './MoreButton.vue';
import ProductCard from './ProductCard.vue';
import Title from './Title.vue';
import type { Product } from '@/types/product';

const props = defineProps<{
  title: string;
  products: Product[];
  moreLink?: string | Record<string, unknown>;
  hideMore?: boolean;
}>();

</script>
<template>
    <div class="flex justify-between items-center mt-10 mb-2" dir="rtl">
    <Title :title="title"/>
    <MoreButton v-if="!props.hideMore" :to="props.moreLink"/>
    </div>
  
    <div class="flex overflow-x-auto flex-nowrap gap-2 md:gap-3  no-scrollbar" dir="rtl">
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product"
    />
  </div>
</template>