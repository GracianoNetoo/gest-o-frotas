<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 dark:bg-[#0f172a] p-4 transition-colors duration-300">
    <div class="max-w-md w-full bg-white dark:bg-white/5 dark:backdrop-blur-md p-8 rounded-2xl shadow-xl border border-base-200 dark:border-white/10">
      
      <div class="text-center mb-8">
        <div class="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:car-speedometer" class="w-10 h-10 text-primary" />
        </div>
        <h1 class="text-2xl font-bold text-base-content">Fleet Manager</h1>
        <p class="text-sm opacity-60">Entre para gerir a sua frota</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="form-control">
          <label class="label"><span class="label-text">E-mail</span></label>
          <div class="relative">
            <Icon icon="mdi:email-outline" class="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input v-model="email" type="email" placeholder="admin@admin.com" class="input input-bordered w-full pl-10 dark:bg-black/20" required />
          </div>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Senha</span></label>
          <div class="relative">
            <Icon icon="mdi:lock-outline" class="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input v-model="password" type="password" placeholder="••••••" class="input input-bordered w-full pl-10 dark:bg-black/20" required />
          </div>
        </div>

        <div v-if="error" class="alert alert-error text-sm py-2 shadow-sm">
          <span>Credenciais inválidas!</span>
        </div>

        <button type="submit" class="btn btn-primary w-full text-white mt-4">
          Entrar no Sistema
          <Icon icon="mdi:arrow-right" class="w-5 h-5" />
        </button>
      </form>
      
      <div class="mt-8 text-center">
        <p class="text-xs opacity-40">Acesso restrito a administradores</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const email = ref('');
const password = ref('');
const error = ref(false);

const handleLogin = () => {
  const success = fleetStore.login({
    email: email.value,
    password: password.value
  });

  if (!success) {
    error.value = true;
    setTimeout(() => error.value = false, 3000);
  }
};
</script>