<!-- components/ProductDetails.vue -->
<script setup lang="ts">
import type { Product, Category } from '@/types/product'; // Adjust path based on your types
import PrimaryButton from './PrimaryButton.vue';
import IncreaseButton from './IncreaseButton.vue';
import { ref } from 'vue';
defineProps<{
    product: Product;
    category: Category | null;
}>();

const quantity = ref(1);

const handleIncrease = () => {
    quantity.value++;
};

const handleDecrease = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};
</script>

<template>
    <div dir="rtl" class="grid md:grid-cols-12 items-start">
        <!-- Image Section -->
        <!-- <div class="flex col-span-7"> -->
            <!-- <div class="flex flex-col gap-4">
                <div class="col-span-2 justify-center items-center">
                    <img :src="product.imageUrl" :alt="product.name" class="w-full h-20 object-contain " />

                </div>
                <div class="col-span-2">
                    <img :src="product.imageUrl" :alt="product.name" class="w-full h-20 object-contain" />

                </div>
            </div> -->
            <div class="p-6 col-span-7">
                <img :src="product.imageUrl" :alt="product.name" class="w-full h-90 object-contain" />
            </div>
        <!-- </div> -->




        <!-- Info Section -->
        <div class="space-y-6 col-span-5">
            <div>
                <p class="text-sm text-subtitle">{{ category?.name ?? 'فئة غير معروفة' }}</p>
                <h1 class="text-3xl font-bold text-main mt-2">{{ product.name }}</h1>
            </div>

            <div class="space-y-3 text-right">
                <p class="text-lg text-subtitle">{{ product.description }}</p>
                <p class="text-2xl font-bold text-main">{{ product.price }} ج . م</p>
                <p class="text-sm text-muted">
                    {{ product.bestSeller ? 'منتج الأكثر مبيعاً' : product.inStock ? 'متوفر حالياً' : 'يتطلب طلب مسبق'
                    }}
                </p>
            </div>

            <div class="flex flex-wrap gap-3">
                <span class="inline-flex items-center rounded-full bg-background/70 px-4 py-2 text-sm text-main">
                    اللون: {{ product.colors?.join('، ') ?? 'غير محدد' }}
                </span>
                <span v-if="product.discount"
                    class="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
                    خصم {{ product.discount }}
                </span>
            </div>

            <div class="flex gap-4 col-span-5">
                <PrimaryButton buttonText="اطلب الآن" class="px-8 py-2.5 text-center" />
                <IncreaseButton :amount="quantity" @increase="handleIncrease" @decrease="handleDecrease" />
            </div>

            <PrimaryButton buttonText="تواصل معنا" class="col-span-5 py-2.5 text-center" />

        </div>
    </div>
</template>