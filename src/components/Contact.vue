
<script setup>
import { Icon } from '@iconify/vue';
const socialMediaLinks = [
  { icon: 'mdi:facebook', url: 'https://www.facebook.com/share/1BF5tGudW9/?mibextid=wwXIfr' },
  { icon: 'mdi:instagram', url: 'https://www.instagram.com/decodoc20?igsh=d2VsMmNoajN2MmZu' },
  { icon: 'mdi:whatsapp', url: 'https://wa.me/yourphonenumber' },
];

</script>

<template>

    <div dir="rtl" id="contact">
        <h2 dir="rtl" class="text-2xl md:text-[1.7rem] font-bold mb-10 md:mb-0">تواصل معنا : </h2>

         <div class="flex flex-col items-center gap-4">
      
        <div class="flex gap-4 mt-2">
         <a 
    v-for="link in socialMediaLinks" 
    :key="link.icon"
    :href="link.url" 
    target="_blank" 
    class="hover:text-subtitle transition-colors text-main"
  >
    <Icon :icon="link.icon" class="md:w-20 md:h-20 w-14 h-14" />
  </a>
         
        </div>
      </div>
    </div>

</template>