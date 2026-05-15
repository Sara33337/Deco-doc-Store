<script setup lang="ts">
import type { Category } from '@/types/product';

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">قائمة الأقسام</h2>
    <div class="overflow-x-auto">
      <table class="table w-full text-right">
        <thead>
          <tr>
            <th>اسم القسم</th>
            <th>الصورة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.imageUrl ? 'موجودة' : 'بدون صورة' }}</td>
            <td class="flex flex-wrap gap-2">
              <button @click="onEdit(category)" class="btn btn-sm btn-secondary">تعديل</button>
              <button @click="onDelete(String(category.id))" class="btn btn-sm btn-error">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>