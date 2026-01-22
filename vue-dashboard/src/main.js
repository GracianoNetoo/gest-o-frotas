import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
const userPhoto = localStorage.getItem('settings_user_photo');
createApp(App).component('Icon', Icon).mount('#app')
import { onMounted } from 'vue';

onMounted(() => {
  const auth = localStorage.getItem('isAuthenticated');
  
  if (auth !== 'true') {
    // Se não estiver logado, chuta o usuário de volta para o Login do Astro
    // Ajuste o link para a página de login da sua Landing Page
    window.location.href = 'http://localhost:4321/login'; 
  }
});
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userEmail');
  window.location.href = '/'; // Volta para a Landing Page
};