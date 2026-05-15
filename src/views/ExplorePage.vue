<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue';
import Navbar from '@/components/Navbar.vue';
import SearchInput from '@/components/SearchInput.vue';
import BestSeller from '@/components/BestSeller.vue';
import AvilableNow from '@/components/AvilableNow.vue';
import AvilableByOrder from '@/components/AvilableByOrder.vue';
import AllProducts from '@/components/AllProducts.vue';
import Footer from '@/components/Footer.vue';
import Decoration from '@/components/Decoration.vue';

</script>

<template  >

    <Navbar />
    <div class="wrapper">
   <SearchInput />
    <CategoryCard/>
    <AllProducts/>

    <Decoration/>

    
    </div>
    <Footer/>
 
</template>