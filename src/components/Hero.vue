<script setup>
import PrimaryButton from './PrimaryButton.vue';
const heroImage = '/images/heroImage.svg';
</script>

<template>
  <section class="relative min-h-screen w-full flex items-center justify-center overflow-hidden" dir="rtl">
    
    <div class="absolute inset-0 z-0">
      <div 
        class="h-full w-full bg-center bg-no-repeat bg-cover"
        :style="{ backgroundImage: `url(${heroImage})` }"
      ></div>
      <div class="absolute inset-0 bg-black/10 md:bg-black/10 "></div>
    </div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          امنحي منزلكِ روحاً من الطبيعة.
        </h1>

        <p class="text-base sm:text-lg md:text-xl text-gray-200 mx-auto max-w-2xl mb-8 leading-relaxed">
          أرفف وديكورات خشبية مصممة بعناية لتضيف لمسة دافئة وأنيقة لكل زاوية في بيتك.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <PrimaryButton buttonText="استكشف إبداعاتنا"/>
        </div>

      </div>
    </div>

  </section>
</template>
