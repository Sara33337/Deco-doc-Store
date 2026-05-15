import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/style/main.css'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
