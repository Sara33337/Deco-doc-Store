<script setup lang="ts">
import type { Product } from '@/types/product';
import { useProductStore } from '@/stores/ProductStore';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const props = defineProps<Props>();
const store = useProductStore();
</script>

<template>
  <section class="rounded-3xl border border-base-200 bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-xl font-semibold">قائمة المنتجات</h2>
    <div class="overflow-x-auto">
      <table class="table w-full text-right">
        <thead>
          <tr>
            <th>اسم المنتج</th>
            <th>القسم</th>
            <th>السعر</th>
            <th>مستودع</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ store.categoryById(String(product.categoryId))?.name || '-' }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.inStock ? 'متوفر' : 'غير متوفر' }}</td>
            <td class="flex flex-wrap gap-2">
              <button @click="onEdit(product)" class="btn btn-sm btn-secondary">تعديل</button>
              <button @click="onDelete(String(product.id))" class="btn btn-sm btn-error">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>