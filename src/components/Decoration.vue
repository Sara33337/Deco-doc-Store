<script setup lang="ts">
import MoreButton from './MoreButton.vue';
import Title from './Title.vue';

const gallery = [

    { url: '/images/whiteshelf.svg', size: 'small' }, // عمود 2 - فوق
    { url: '/images/whiteshelf.svg', size: 'large' }, // عمود 3 - فوق
    { url: '/images/eidmubark.svg', size: 'small' }, // عمود 1 - تحت
    { url: '/images/coffeeCorner.svg', size: 'large' }, 
    { url: '/images/eidmubark.svg', size: 'small' }, // عمود 1 - تحت
    { url: '/images/coffeeCorner.svg', size: 'large' },

];

</script>

<template>
    <div class=" mt-10 mb-2" dir="rtl">
        <Title title="التنسيق والديكور :" />
    </div>
    <div class="flex justify-between items-center mb-5" dir="rtl">
        <p class="text-main font-regular text-md md:text-lg">شاهد كيف قام عملاءنا بتنسيق منتجاتنا</p>
        <MoreButton />
    </div>

    <div class="grid md:grid-flow-col grid-cols-1  lg:grid-cols-3 grid-rows-3 gap-3 md:h-200" dir="rtl">
        <div v-for="(image, index) in gallery" :key="index"
            :class="image.size === 'large' ? 'md:row-span-2' : 'md:row-span-1 row-span-1'">
            <img :src="image.url" class="w-full h-full object-cover ">
        </div>
    </div>
</template>