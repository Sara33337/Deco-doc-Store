<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const submitLogin = async () => {
  error.value = '';
  if (!email.value.trim() || !password.value.trim()) {
    error.value = 'الرجاء إدخال البريد الإلكتروني وكلمة المرور';
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push({ name: 'admin' });
  } catch (err: any) {
    error.value = err?.message || 'فشل تسجيل الدخول، تحقق من بياناتك';
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
    <div class="w-full max-w-md rounded-3xl border border-base-200 bg-white p-8 shadow-lg">
      <h1 class="text-2xl font-bold text-main mb-2">تسجيل دخول المسؤول</h1>
      <p class="text-sm text-subtitle mb-6">الرجاء إدخال بريدك وكلمة المرور للوصول إلى لوحة التحكم.</p>

      <div class="space-y-4">
        <label class="w-full">
          <span class="label-text">البريد الإلكتروني</span>
          <input
            v-model="email"
            type="email"
            class="input input-bordered w-full"
            placeholder="admin@example.com"
          />
        </label>

        <label class="w-full">
          <span class="label-text">كلمة المرور</span>
          <input
            v-model="password"
            type="password"
            class="input input-bordered w-full"
            placeholder="كلمة المرور"
          />
        </label>

        <button @click="submitLogin" class="btn btn-primary w-full">دخول</button>

        <p v-if="error" class="text-sm text-error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
