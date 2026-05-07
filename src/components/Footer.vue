<script setup>
import { Icon } from '@iconify/vue';

const socialMediaLinks = [
  { icon: 'mdi:facebook', url: 'https://www.facebook.com/share/1BF5tGudW9/?mibextid=wwXIfr' },
  { icon: 'mdi:instagram', url: 'https://www.instagram.com/decodoc20?igsh=d2VsMmNoajN2MmZu' },
  { icon: 'mdi:whatsapp', url: 'https://wa.me/yourphonenumber' },
];

const navLinks = [
  { name: 'الرئيسية', href: '#' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'آراء العملاء', href: '#contact' },
];

const logoImage = '/images/logosvg.svg';
</script>

<template>
  <footer dir="rtl" class="bg-[#5D5A4A] text-white py-12 px-6 md:px-20">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center">
      
      <div class="flex flex-col items-center gap-4">
        <h3 class="text-xl font-bold text-light-text ">تواصل معنا :</h3>
        <div class="flex gap-4 mt-2">
         <a 
    v-for="link in socialMediaLinks" 
    :key="link.icon"
    :href="link.url" 
    target="_blank" 
    class="hover:text-subtitle transition-colors text-light-text"
  >
    <Icon :icon="link.icon" class="w-8 h-8" />
  </a>
         
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <a 
        v-for="navItem in navLinks" :href="navItem.href" class="hover:underline text-lg text-light-text">{{ navItem.name }}</a>
      </div>

      <div class="flex flex-col items-center gap-4">
        <div class="mx-3 md:mx-0">
        <img :src="logoImage" alt="deco-doc logo" class="md:w-25 md:h-17 w-20 h-15 object-contain ">
      </div>

        <p class="text-lg leading-relaxed max-w-63">
          أرفف وديكورات خشبية مصممة خصيصاً لتناسب احتياجك
        </p>
      </div>

    </div>
  </footer>
</template>