<!-- components/ProductDetails.vue -->
<script setup lang="ts">
import type { Product, Category } from '@/types/product'; // Adjust path based on your types
import PrimaryButton from './PrimaryButton.vue';
import IncreaseButton from './IncreaseButton.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    product: Product;
    category: Category | null;
}>();

const { product, category } = props;
const quantity = ref(1);

const adminWhatsappNumber = String(import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER ?? '201065818575').replace(/\D/g, '');
const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

const orderMessage = computed(() => {
  const lines = [
    'مرحباً، أريد طلب المنتج التالي:',
    `اسم المنتج: ${product.name}`,
    `الفئة: ${category?.name ?? 'غير محددة'}`,
    `الكمية: ${quantity.value}`,
    `السعر لكل وحدة: ${product.price} ج.م`,
    `المجموع: ${product.price * quantity.value} ج.م`,
    `رابط المنتج: ${currentUrl}`
  ];
  return encodeURIComponent(lines.join('\n'));
});

const orderHref = computed(() => `https://wa.me/${adminWhatsappNumber}?text=${orderMessage.value}`);

const contactMessage = computed(() => {
  const lines = [
    'مرحباً، أريد الاستفسار عن منتجاتكم.',
    'ما هو استفسارك؟'
  ];
  return encodeURIComponent(lines.join('\n'));
});

const contactHref = computed(() => `https://wa.me/${adminWhatsappNumber}?text=${contactMessage.value}`);

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
    <div dir="rtl" class="grid md:grid-cols-12 items-start ">

            <div class="p-6 col-span-7">
                <img :src="product.imageUrl" :alt="product.name" class="w-full h-90 object-contain" />
            </div>
    

      
        <div class="space-y-6 col-span-5">
            <div>
                <p class="text-sm text-subtitle">{{ category?.name ?? 'فئة غير معروفة' }}</p>
                <h1 class="md:text-2xl text-xl font-bold text-main mt-2">{{ product.name }}</h1>
            </div>

            <div class="space-y-3 text-right">
                <p class="text-lg text-subtitle">{{ product.description }}</p>
                <p class="md:text-2xl text-xl font-bold text-main">{{ product.price }} ج . م</p>
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
            
           <div class="grid grid-cols-5 gap-4 w-full max-w-md justify-center "> <!-- تقدري تتحكمي في العرض الكلي من هنا مثل max-w-md -->
    

    <div class="col-span-5 flex gap-4">
        <PrimaryButton :href="orderHref" buttonText="اطلب الآن" class="flex-1 py-2.5 text-center" />
    
        <IncreaseButton :amount="quantity" @increase="handleIncrease" @decrease="handleDecrease" class="flex-1" />
    </div>
    <a :href="contactHref" target="_blank" rel="noreferrer" class="col-span-5 flex items-center justify-center gap-2 px-10 py-2.5 rounded-lg border border-main text-main transition-all hover:bg-main hover:text-white cursor-pointer text-center">
        <span>تواصل معنا</span>
    </a>
</div>
          


           

        </div>
    </div>
</template>