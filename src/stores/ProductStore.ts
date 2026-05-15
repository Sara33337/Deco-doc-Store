import { defineStore } from 'pinia';
import { db } from '@/firebase';
import type { Product, Category } from '@/types/product';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // المنتجات الأكثر مبيعاً
    bestSellers: (state) => state.products.filter(p => p.bestSeller),

    // المنتجات المتوفرة حالياً
    availableNow: (state) => state.products.filter(p => p.inStock),

    // فلترة حسب القسم
    productsByCategory: (state) => (categoryId: string | number) => {
      return state.products.filter(p => p.categoryId === categoryId);
    },

    // المنتجات مع حساب السعر النهائي بعد الخصم
    discountedProducts: (state) => {
      return state.products.map(p => ({
        ...p,
        finalPrice: p.discount ? p.price - p.discount : p.price
      }));
    },
    productById: (state) => (id: string) => {
      return state.products.find(product => String(product.id) === id);
    },
    categoryById: (state) => (id: string) => {
      return state.categories.find(category => String(category.id) === id);
    },
    searchProducts: (state) => (query: string) => {
      const searchTerm = query.toLowerCase().trim();
      if (!searchTerm) return state.products;
      return state.products.filter(p =>
        p.name.toLowerCase().includes(searchTerm)
      );
    }
  },

  actions: {
    async fetchAllData(forceRefresh = false) {
      if (!forceRefresh && this.products.length > 0 && this.categories.length > 0) return;
      this.loading = true;
      this.error = null;
      try {
        const [prodSnap, catSnap] = await Promise.all([
          getDocs(collection(db, 'products')),
          getDocs(collection(db, 'categories'))
        ]);

        this.products = prodSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        this.categories = catSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];

      } catch (err: any) {
        this.error = "حدث خطأ أثناء تحميل البيانات";
        console.error("Firebase Fetch Error:", err);
      } finally {
        this.loading = false;
      }
    },

    async uploadImage(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            resolve(result);
          } else {
            reject(new Error('Failed to read file as data URL'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    },

    async addCategory(category: Omit<Category, 'id'>) {
      const categoryRef = await addDoc(collection(db, 'categories'), {
        ...category,
        createdAt: serverTimestamp()
      });
      const newCategory = {
        id: categoryRef.id,
        ...category
      } as Category;
      this.categories.push(newCategory);
      return categoryRef.id;
    },

    async updateCategory(id: string, category: Partial<Category>) {
      await updateDoc(doc(db, 'categories', id), {
        ...category,
        updatedAt: serverTimestamp()
      });
      const index = this.categories.findIndex(item => String(item.id) === id);
      if (index >= 0) {
        this.categories[index] = {
          ...this.categories[index],
          ...category
        } as Category;
      }
    },

    async deleteCategory(id: string) {
      await deleteDoc(doc(db, 'categories', id));
      this.categories = this.categories.filter(item => String(item.id) !== id);
    },

    async addProduct(product: Omit<Product, 'id'>) {
      const productRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: serverTimestamp()
      });
      const newProduct = {
        id: productRef.id,
        ...product
      } as Product;
      this.products.push(newProduct);
      return productRef.id;
    },

    async updateProduct(id: string, product: Partial<Product>) {
      await updateDoc(doc(db, 'products', id), {
        ...product,
        updatedAt: serverTimestamp()
      });
      const index = this.products.findIndex(item => String(item.id) === id);
      if (index >= 0) {
        this.products[index] = {
          ...this.products[index],
          ...product
        } as Product;
      }
    },

    async deleteProduct(id: string) {
      await deleteDoc(doc(db, 'products', id));
      this.products = this.products.filter(item => String(item.id) !== id);
    }
  }

});