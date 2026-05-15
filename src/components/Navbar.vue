<script setup lang="ts">
import { Icon } from '@iconify/vue';
const navBarItems = [{
    name : 'الرئيسية',
    href : '/#'
},
{
    name : 'من نحن',
    href : '/#about'
},
{
    name : 'خدماتنا',
    href : '/#services'
},
{
    name :'تواصل معنا',
    href : '/#contact'
},
{
    name : 'منتجاتنا',
    href : '/explore',
    routerLink: true
},
]

const logoImage = '/images/logosvg.svg';

</script>
<template>
  <header dir="rtl" class="absolute top-0 left-0 w-full z-50 bg-[#47342B]/40  rounded-b-4xl">
    <div class="mx-auto flex max-w-7xl  justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <nav class="hidden md:flex items-center gap-7 text-medium font-medium text-light-text">
        <template v-for="item in navBarItems" :key="item.name">
          <router-link
            v-if="item.routerLink"
            :to="item.href"
            class="transition hover:text-white border-b-2 border-transparent hover:border-white py-1"
          >
            {{ item.name }}
          </router-link>
          <a
            v-else
            :href="item.href"
            class="transition hover:text-white border-b-2 border-transparent hover:border-white py-1"
          >
            {{ item.name }}
          </a>
        </template>
      </nav>

      <div class="md:hidden">
        <div class="dropdown dropdown-end w-full"> 
          <label tabindex="0" class="btn btn-ghost btn-squre my-3 text-light-text">
            <Icon icon="line-md:menu" class="flex h-8 w-8 text-light-text  " />
          </label>
          
          <ul tabindex="0" 
              class="dropdown-content menu fixed left-0 top-20  w-screen bg-[#47342B] p-6 shadow-2xl text-light-text border-t border-white/10">
            <li v-for="item in navBarItems" :key="item.name" class="border-b border-white/5 last:border-0">
              <template v-if="item.routerLink">
                <router-link :to="item.href" class="py-4 text-lg active:bg-white/10 block">{{ item.name }}</router-link>
              </template>
              <template v-else>
                <a :href="item.href" class="py-4 text-lg active:bg-white/10 block">{{ item.name }}</a>
              </template>
            </li>
          </ul>
        </div>
      </div>

      <div class="mx-3 md:mx-0">
        <img :src="logoImage" alt="deco-doc logo" class="md:w-25 md:h-17 w-20 h-15 object-contain ">
      </div>

    </div>
  </header>
</template>