<script setup>
defineProps({
    label : {
        type : String,
        required : true
    }
})
</script>

<template>
    <div class="absolute top-6 right-6 z-20 bg-light-text text-main text-xs font-medium px-4 py-1 "> {{ label }} </div>
</template>