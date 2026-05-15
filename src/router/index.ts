import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import CategoryProductsPage from '../views/CategoryProductsPage.vue'
import ProductDetailsPage from '../views/ProductDetailsPage.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import { auth } from '@/firebase'
const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExplorePage
  },
  {
    path : '/products',
    name : 'products',
    component : ProductsPage
  },
  {
    path : '/categories/:categoryId',
    name : 'category',
    component : CategoryProductsPage
  },
  {
    path : '/products/:productId',
    name : 'product',
    component : ProductDetailsPage
  },
  {
    path : '/admin/login',
    name : 'admin-login',
    component : AdminLoginPage
  },
  {
    path : '/admin',
    name : 'admin',
    component : AdminDashboard,
    meta: { requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next({ name: 'admin-login' });
    return;
  }

  if (to.name === 'admin-login' && user) {
    next({ name: 'admin' });
    return;
  }

  next();
});

export default router