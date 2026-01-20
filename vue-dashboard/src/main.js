import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
const userPhoto = localStorage.getItem('settings_user_photo');

createApp(App).component('Icon', Icon).mount('#app')
