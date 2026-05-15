<script setup lang="ts">
interface CategoryForm {
  name: string;
  imageUrl: string;
  imageFile: File | null;
}

interface Props {
  form: CategoryForm;
  isEditing: boolean;
  loading: boolean;
}

interface Emits {
  (e: 'update:form', value: CategoryForm): void;
  (e: 'submit'): void;
  (e: 'reset'): void;
  (e: 'image-change', file: File): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    emit('image-change', target.files[0]);
  }
};
</script>

<template>
  <section class="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">{{ isEditing ? 'تحديث القسم' : 'إضافة قسم جديد' }}</h2>
    <div class="space-y-4">
      <label class="input-group w-full">
        <span>الاسم</span>
        <input v-model="form.name" type="text" class="input input-bordered w-full" />
      </label>

      <label class="input-group w-full">
        <span>الصورة</span>
        <input type="file" accept="image/*" @change="handleImageChange" class="file-input file-input-bordered w-full" />
      </label>

      <label class="input-group w-full">
        <span>رابط الصورة</span>
        <input v-model="form.imageUrl" type="text" class="input input-bordered w-full" placeholder="يمكنك تركها فارغة إذا اخترت ملفًا" />
      </label>

      <button @click="emit('submit')" :disabled="loading" class="btn btn-primary w-full">
        {{ isEditing ? 'حفظ التعديلات' : 'إضافة القسم' }}
      </button>
      <button v-if="isEditing" @click="emit('reset')" class="btn btn-outline w-full">إلغاء التعديل</button>
    </div>
  </section>
</template>