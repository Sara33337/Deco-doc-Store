<script setup>
// تأكدي من استيراد الـ Icon لو بتستخدمي Iconify
import { Icon } from '@iconify/vue';
import PrimaryButton from './PrimaryButton.vue';
import { ref, onMounted } from 'vue';
import Popup from './Popup.vue';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const isVisible = ref(false);
const testimonials = ref([]);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const loadTestimonials = async () => {
  try {
    const testimonialsQuery = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(testimonialsQuery);
    testimonials.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Failed to load testimonials:', error);
  }
};

const handleAddTestimonial = async (payload) => {
  const optimisticItem = {
    name: payload.name,
    quote: payload.quote,
    rating: payload.rating,
    createdAt: new Date()
  };

  testimonials.value.unshift(optimisticItem);

  try {
    await addDoc(collection(db, 'testimonials'), {
      name: payload.name,
      quote: payload.quote,
      rating: payload.rating,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Failed to add testimonial:', error);
    testimonials.value = testimonials.value.filter(item => item !== optimisticItem);
  } finally {
    isVisible.value = false;
  }
};

onMounted(loadTestimonials);

</script>

<template>
  <div dir="rtl">
    <h2 class="text-2xl md:text-[1.7rem] font-bold mb-8 text-right pt-10">آراء العملاء:</h2>

    <div class="overflow-x-auto pb-4">
      <div class="flex gap-6 min-w-max">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.id || testimonial.name"
          class="flex-shrink-0 w-[280px] sm:w-[320px] p-6 bg-white border border-main rounded-xl shadow-sm text-right flex flex-col justify-between"
        >
          <div class="flex items-center gap-0.5 mb-6">
            <Icon 
              v-for="i in testimonial.rating" 
              :key="i"
              icon="ic:round-star" 
              class="w-6 h-6 text-[#F9DD5C]" 
            />
          </div>

          <p class="text-subtitle text-md leading-relaxed mb-10 ">
            {{ testimonial.quote }}
          </p>

          <div class="flex items-center gap-2 justify-start mt-auto">
            <span class="w-3 h-3 bg-main rounded-xl"></span>
            <span class="text-main text-xl font-medium">
              {{ testimonial.name }}
            </span>
          </div>
        </div>
      </div>
    </div>


    <div class="flex justify-center items-center m-10">
      <PrimaryButton
      @click="toggleVisibility"
    buttonText="اترك تعليقا"
    class="py-2.5"
    />
      
    </div>
    
  </div>

  <div v-if="isVisible" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
<Popup @submit="handleAddTestimonial" @cancel="toggleVisibility"/>
  </div>
</template>