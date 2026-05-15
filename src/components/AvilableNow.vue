<!-- <script setup lang="ts">
import ProductsSection from './ProductsSection.vue';
import { computed } from 'vue';
const products = [
    {id : 1,
        name : "رف",
        description :"رف خشبي بحبل مقاس 60 سم",
        imageUrl : "/images/robeShelf.svg",
        price : "1000 ج . م",
        bestSeller : true,
        inStock : false,
        avilableByOrder : true,
        colors : ["#000000","#FFFFFF","#FF0000"],
    },
    {id : 2,
        name : "طاولة",
        description :"طاولة خشبية بحبل مقاس 60 سم",
        imageUrl : "/images/robeShelf.svg",
        price : "1000 ج . م",
        bestSeller : false,
        inStock : true,
        avilableByOrder : true,
        colors : ["#000000","#FFFFFF","#FF0000"],
    },
    {id : 2,
        name : "طاولة",
        description :"طاولة خشبية بحبل مقاس 60 سم",
        imageUrl : "/images/robeShelf.svg",
        price : "1000 ج . م",
        bestSeller : true,
        inStock : false,
        avilableByOrder : true,
        colors : ["#000000","#FFFFFF","#FF0000"],
    },
    {id : 2,
        name : "طاولة",
        description :"طاولة خشبية قابلة للتجميع بحبل مقاس 60 سم ",
        imageUrl : "/images/robeShelf.svg",
        price : "1000 ج . م",
        bestSeller : true,
        inStock : false,
        avilableByOrder : true,
        colors : ["#000000","#FFFFFF","#FF0000"],
    },
];

const availableNowProducts = computed(() => {
  return products.filter(product => product.inStock === true);
});


</script>
<template>
       <ProductsSection title="متوفر حاليا :" :products="availableNowProducts"/>

</template> -->