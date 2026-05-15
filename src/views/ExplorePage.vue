<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CategoryCard from '@/components/CategoryCard.vue';
import Navbar from '@/components/Navbar.vue';
import SearchInput from '@/components/SearchInput.vue';
import AllProducts from '@/components/AllProducts.vue';
import Footer from '@/components/Footer.vue';
import Decoration from '@/components/Decoration.vue';
import ProductsSection from '@/components/ProductsSection.vue';
import { useProductStore } from '@/stores/ProductStore';

const store = useProductStore();
const searchQuery = ref('');

const searchResults = computed(() => {
  return store.searchProducts(searchQuery.value);
});

onMounted(async () => {
  if (store.products.length === 0) {
    await store.fetchAllData();
  }
});
</script>

<template>
    <Navbar />
    <div class="wrapper">
      <SearchInput v-model="searchQuery" />
      <CategoryCard />

      <template v-if="searchQuery">
        <ProductsSection
          title="نتائج البحث"
          :products="searchResults"
          hideMore
        />
      </template>

      <AllProducts v-else />

      <Decoration />
    </div>
    <Footer />
</template>