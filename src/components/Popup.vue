<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const hoverRating = ref(0);
const selectedRating = ref(0);
const userName = ref('');
const userComment = ref('');

const emit = defineEmits(['submit', 'cancel']);

const resetForm = () => {
  userName.value = '';
  userComment.value = '';
  selectedRating.value = 0;
  hoverRating.value = 0;
};

const submitForm = () => {
  if (!userName.value.trim() || !userComment.value.trim() || selectedRating.value === 0) {
    return;
  }

  emit('submit', {
    name: userName.value.trim(),
    quote: userComment.value.trim(),
    rating: selectedRating.value
  });

  resetForm();
};

const cancelForm = () => {
  resetForm();
  emit('cancel');
};

</script>
<template>
    <div class="bg-light-text p-6 rounded-xl w-full max-w-md" dir="rtl">
        <h3 class="text-xl font-bold mb-4">اترك تعليقك</h3>

        <p class="text-subtitle">ما هو تقييمك؟</p>

        <div class="flex flex-row-reverse items-center gap-1 justify-center mb-4">
            <button v-for="star in 5" :key="star" @mouseenter="hoverRating = star" @mouseleave="hoverRating = 0"
                @click="selectedRating = star" class="transition-transform duration-150 active:scale-90">
                <Icon   :icon="star <= (hoverRating || selectedRating) ? 'ic:round-star' : 'ic:round-star-border'"
                    class="w-10 h-10 transition-colors duration-200"
                    :class="star <= (hoverRating || selectedRating) ? 'text-[#F9DD5C]' : 'text-main'" />
            </button>
        </div>

        <input v-model="userName" class="w-full p-3 border border-gray-300 rounded-lg mb-4" placeholder="الاسم" />

        <textarea v-model="userComment" class="w-full p-3 border border-gray-300 rounded-lg mb-4" rows="4"
            placeholder="اكتب تعليقك هنا..."></textarea>
        <div class="flex justify-end gap-4">

            <button type="button" @click="submitForm" class="px-4 py-2 bg-main text-light-text rounded-lg disabled:opacity-50"
          :disabled="!userName.trim() || !userComment.trim() || selectedRating === 0">
                إرسال
            </button>
            <button type="button" @click="cancelForm" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                إلغاء
            </button>
        </div>
    </div>
</template>