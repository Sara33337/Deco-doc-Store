export interface Product {
  id: string | number;
  name: string;
  description?: string; // أضفته لأنه موجود في بياناتك الأصلية
  price: number;
  imageUrl: string;
  bestSeller: boolean;
  inStock: boolean;
  availableByOrder: boolean;
  note?: string;
  colors?: string[];
  productImageUrls?: string[];
  discount?: number;
  categoryId: number | string; // للربط مع الـ Categories
}

export interface Category {
  id: number | string;
  name: string;
  imageUrl: string;
}