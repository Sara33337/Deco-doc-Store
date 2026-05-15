<script setup>
const props = defineProps({
    amount: {
        type: Number,
        default: 1
    }
});

// تصحيح السبلينج هنا
const emit = defineEmits(['increase', 'decrease']);
</script>

<template>
    <!-- أضفنا flex و items-center و gap لتنسيق العناصر بالداخل -->
    <div class="inline-flex items-center gap-4 border border-main rounded-lg px-4 py-1 text-main dir-rtl">
        <button 
            @click="emit('increase')" 
            class="hover:font-bold transition-all"
        >+</button>
        
        <span class="font-medium min-w-5 text-center">
            {{ amount }}
        </span>
        
        <button 
            @click="emit('decrease')" 
            class="hover:font-bold transition-all"
        >-</button>
    </div>
</template>