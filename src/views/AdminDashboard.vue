<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { useProductStore } from '@/stores/ProductStore';
import type { Product, Category } from '@/types/product';
import { auth } from '@/firebase';
import AdminProductsList from '@/components/admin/AdminProductsList.vue';
import AdminProductForm from '@/components/admin/AdminProductForm.vue';
import AdminCategoriesList from '@/components/admin/AdminCategoriesList.vue';
import AdminCategoryForm from '@/components/admin/AdminCategoryForm.vue';

const store = useProductStore();
const activeTab = ref<'products' | 'categories'>('products');
const loadingAction = ref(false);
const message = ref<string | null>(null);
const selectedProductId = ref<string | null>(null);
const selectedCategoryId = ref<string | null>(null);
const router = useRouter();

const productForm = ref({
  name: '',
  description: '',
  price: 0,
  categoryId: '',
  imageUrl: '',
  imageFile: null as File | null,
  bestSeller: false,
  inStock: true,
  availableByOrder: false,
  discount: 0,
  colors: ''
});

const categoryForm = ref({
  name: '',
  imageUrl: '',
  imageFile: null as File | null,
});

const isEditingProduct = computed(() => !!selectedProductId.value);
const isEditingCategory = computed(() => !!selectedCategoryId.value);
const categoriesOptions = computed(() => store.categories);

const resetProductForm = () => {
  selectedProductId.value = null;
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    imageUrl: '',
    imageFile: null,
    bestSeller: false,
    inStock: true,
    availableByOrder: false,
    discount: 0,
    colors: ''
  };
};

const resetCategoryForm = () => {
  selectedCategoryId.value = null;
  categoryForm.value = {
    name: '',
    imageUrl: '',
    imageFile: null,
  };
};

const loadData = async () => {
  loadingAction.value = true;
  message.value = null;
  try {
    await store.fetchAllData(true);
  } catch (err) {
    message.value = 'حدث خطأ أثناء تحميل بيانات لوحة التحكم';
  } finally {
    loadingAction.value = false;
  }
};

onMounted(loadData);

const editProduct = (product: Product) => {
  selectedProductId.value = String(product.id);
  productForm.value = {
    name: product.name,
    description: product.description ?? '',
    price: product.price,
    categoryId: String(product.categoryId),
    imageUrl: product.imageUrl,
    imageFile: null,
    bestSeller: product.bestSeller,
    inStock: product.inStock,
    availableByOrder: product.availableByOrder,
    discount: product.discount ?? 0,
    colors: product.colors?.join(', ') ?? ''
  };
  activeTab.value = 'products';
};

const editCategory = (category: Category) => {
  selectedCategoryId.value = String(category.id);
  categoryForm.value = {
    name: category.name,
    imageUrl: category.imageUrl,
    imageFile: null,
  };
  activeTab.value = 'categories';
};

const handleProductImage = (file: File) => {
  productForm.value.imageFile = file;
};

const handleCategoryImage = (file: File) => {
  categoryForm.value.imageFile = file;
};

const submitProduct = async () => {
  loadingAction.value = true;
  message.value = null;

  try {
    let imageUrl = productForm.value.imageUrl;
    if (productForm.value.imageFile) {
      imageUrl = await store.uploadImage(productForm.value.imageFile);
    }

    const payload = {
      name: productForm.value.name,
      description: productForm.value.description,
      price: Number(productForm.value.price),
      imageUrl,
      bestSeller: Boolean(productForm.value.bestSeller),
      inStock: Boolean(productForm.value.inStock),
      availableByOrder: Boolean(productForm.value.availableByOrder),
      discount: Number(productForm.value.discount) || 0,
      colors: productForm.value.colors
        ? productForm.value.colors.split(',').map(color => color.trim()).filter(Boolean)
        : [],
      categoryId: productForm.value.categoryId
    } as Omit<Product, 'id'>;

    if (isEditingProduct.value && selectedProductId.value) {
      await store.updateProduct(selectedProductId.value, payload);
      message.value = 'تم تحديث المنتج بنجاح';
    } else {
      await store.addProduct(payload);
      message.value = 'تم إضافة المنتج بنجاح';
    }

    resetProductForm();
    await store.fetchAllData(true);
  } catch (err) {
    console.error(err);
    message.value = 'حدث خطأ أثناء حفظ المنتج';
  } finally {
    loadingAction.value = false;
  }
};

const submitCategory = async () => {
  loadingAction.value = true;
  message.value = null;

  try {
    let imageUrl = categoryForm.value.imageUrl;
    if (categoryForm.value.imageFile) {
      imageUrl = await store.uploadImage(categoryForm.value.imageFile);
    }

    const payload = {
      name: categoryForm.value.name,
      imageUrl
    };

    if (isEditingCategory.value && selectedCategoryId.value) {
      await store.updateCategory(selectedCategoryId.value, payload);
      message.value = 'تم تحديث القسم بنجاح';
    } else {
      await store.addCategory(payload);
      message.value = 'تم إضافة القسم بنجاح';
    }

    resetCategoryForm();
    await store.fetchAllData(true);
  } catch (err) {
    console.error(err);
    message.value = 'حدث خطأ أثناء حفظ القسم';
  } finally {
    loadingAction.value = false;
  }
};

const removeProduct = async (id: string) => {
  if (!confirm('هل أنت متأكد من حذف المنتج؟')) return;
  loadingAction.value = true;
  message.value = null;
  try {
    await store.deleteProduct(id);
    message.value = 'تم حذف المنتج';
    await store.fetchAllData(true);
  } catch (err) {
    console.error(err);
    message.value = 'حدث خطأ أثناء حذف المنتج';
  } finally {
    loadingAction.value = false;
  }
};

const removeCategory = async (id: string) => {
  if (!confirm('هل أنت متأكد من حذف القسم؟')) return;
  loadingAction.value = true;
  message.value = null;
  try {
    await store.deleteCategory(id);
    message.value = 'تم حذف القسم';
    await store.fetchAllData(true);
  } catch (err) {
    console.error(err);
    message.value = 'حدث خطأ أثناء حذف القسم';
  } finally {
    loadingAction.value = false;
  }
};

const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Logout failed', err);
  }
  router.push({ name: 'admin-login' });
};
</script>

<template>
  <div class="wrapper py-10" dir="rtl">
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold">لوحة التحكم</h1>
        <p class="text-base text-slate-400">إضافة، تحديث، وحذف المنتجات والأقسام.</p>
      </div>
      <div class="flex gap-2 flex-wrap items-center">
        <button
          @click="activeTab = 'products'"
          :class="activeTab === 'products' ? 'btn btn-primary' : 'btn btn-outline'"
        >المنتجات</button>
        <button
          @click="activeTab = 'categories'"
          :class="activeTab === 'categories' ? 'btn btn-primary' : 'btn btn-outline'"
        >الأقسام</button>
        <button @click="loadData" class="btn btn-ghost">تحديث البيانات</button>
        <button @click="logoutAdmin" class="btn btn-error">تسجيل الخروج</button>
      </div>
    </div>

    <div v-if="message" class="mb-6 rounded-lg border border-success/20 bg-success/10 p-4 text-success">{{ message }}</div>
    <div v-if="store.error" class="mb-6 rounded-lg border border-error/20 bg-error/10 p-4 text-error">{{ store.error }}</div>

    <div v-if="loadingAction || store.loading" class="mb-6 rounded-lg bg-base-200 p-6 text-center">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-3">جارٍ معالجة البيانات...</p>
    </div>

    <div v-if="activeTab === 'products'" class="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
      <AdminProductsList
        :products="store.products"
        @edit="editProduct"
        @delete="removeProduct"
      />
      <AdminProductForm
        :form="productForm"
        :categories="categoriesOptions"
        :is-editing="isEditingProduct"
        :loading="loadingAction"
        @image-change="handleProductImage"
        @submit="submitProduct"
        @reset="resetProductForm"
      />
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
      <AdminCategoriesList
        :categories="store.categories"
        @edit="editCategory"
        @delete="removeCategory"
      />
      <AdminCategoryForm
        :form="categoryForm"
        :is-editing="isEditingCategory"
        :loading="loadingAction"
        @image-change="handleCategoryImage"
        @submit="submitCategory"
        @reset="resetCategoryForm"
      />
    </div>
  </div>
</template>
