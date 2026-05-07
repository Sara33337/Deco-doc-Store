<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Hero  from '@/components/Hero.vue';
import About from '@/components/About.vue';
import Services from '@/components/Services.vue';
import Comment from '@/components/Comment.vue';
import Footer from '@/components/Footer.vue';
import Contact from '@/components/Contact.vue';


</script>

<template>
  <Navbar/>
  <Hero/>

  <div class="m-10 bg-background">
    <About/>
    <Services/>
    <Comment/>
    <Contact/>
  </div>
  <Footer/>


</template>

<style scoped></style>
