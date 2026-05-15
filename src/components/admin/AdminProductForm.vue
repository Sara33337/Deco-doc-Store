<script setup lang="ts">
import type { Category } from '@/types/product';

interface ProductForm {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  imageFile: File | null;
  bestSeller: boolean;
  inStock: boolean;
  availableByOrder: boolean;
  discount: number;
  colors: string;
}

interface Props {
  form: ProductForm;
  categories: Category[];
  isEditing: boolean;
  loading: boolean;
}

interface Emits {
  (e: 'update:form', value: ProductForm): void;
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
    <h2 class="mb-4 text-xl font-semibold">{{ isEditing ? 'تحديث المنتج' : 'إضافة منتج جديد' }}</h2>
    <div class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="input-group">
          <span>الاسم</span>
          <input v-model="form.name" type="text" class="input input-bordered w-full" />
        </label>
        <label class="input-group">
          <span>السعر</span>
          <input v-model.number="form.price" type="number" class="input input-bordered w-full" />
        </label>
      </div>

      <label class="input-group w-full">
        <span>القسم</span>
        <select v-model="form.categoryId" class="select select-bordered w-full">
          <option value="">اختر قسم</option>
          <option v-for="category in categories" :key="category.id" :value="String(category.id)">{{ category.name }}</option>
        </select>
      </label>

      <label class="input-group w-full">
        <span>الصورة</span>
        <input type="file" accept="image/*" @change="handleImageChange" class="file-input file-input-bordered w-full" />
      </label>

      <label class="input-group w-full">
        <span>رابط الصورة</span>
        <input v-model="form.imageUrl" type="text" class="input input-bordered w-full" placeholder="يمكنك تركها فارغة إذا اخترت ملفًا" />
      </label>

      <label class="input-group w-full">
        <span>الوصف</span>
        <textarea v-model="form.description" class="textarea textarea-bordered w-full" rows="3"></textarea>
      </label>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="input-group">
          <span>الخصم</span>
          <input v-model.number="form.discount" type="number" class="input input-bordered w-full" />
        </label>
        <label class="input-group">
          <span>الألوان</span>
          <input v-model="form.colors" type="text" class="input input-bordered w-full" placeholder="أخضر, أحمر" />
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <label class="cursor-pointer flex items-center gap-2">
          <input type="checkbox" v-model="form.bestSeller" class="checkbox" />
          الأكثر مبيعاً
        </label>
        <label class="cursor-pointer flex items-center gap-2">
          <input type="checkbox" v-model="form.inStock" class="checkbox" />
          متوفر
        </label>
        <label class="cursor-pointer flex items-center gap-2">
          <input type="checkbox" v-model="form.availableByOrder" class="checkbox" />
          متاح بالطلب
        </label>
      </div>

      <button @click="emit('submit')" :disabled="loading" class="btn btn-primary w-full">
        {{ isEditing ? 'حفظ التعديلات' : 'إضافة المنتج' }}
      </button>
      <button v-if="isEditing" @click="emit('reset')" class="btn btn-outline w-full">إلغاء التعديل</button>
    </div>
  </section>
</template>