<template>
  <div class="card bg-base-100 dark:bg-gray-800 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-2xl text-gray-800 dark:text-white mb-6">
        <Icon icon="mdi:cog" class="text-primary" /> Configurações
      </h2>

      <div role="tablist" class="tabs tabs-bordered mb-8">
        <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'profile' }" @click="activeTab = 'profile'">Perfil da Conta</a>
        <a role="tab" class="tab" :class="{ 'tab-active': activeTab === 'system' }" @click="activeTab = 'system'">Preferências do Sistema</a>
      </div>

      <div v-if="activeTab === 'profile'" class="space-y-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold dark:text-white">Administrador da Frota</h3>
            <p class="text-sm dark:text-gray-400">admin@transportes.com</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label"><span class="label-text dark:text-gray-300">Nome de Exibição</span></label>
            <input type="text" placeholder="Nome" class="input input-bordered dark:bg-gray-700 dark:text-white" value="Admin" />
          </div>
          <div class="form-control w-full">
            <label class="label"><span class="label-text dark:text-gray-300">Idioma</span></label>
            <select class="select select-bordered dark:bg-gray-700 dark:text-white">
              <option selected>Português (BR)</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'system'" class="space-y-4">
        <div class="form-control p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg">
          <label class="label cursor-pointer">
            <span class="label-text font-bold dark:text-white">Notificações por E-mail</span>
            <input type="checkbox" class="toggle toggle-primary" checked />
          </label>
          <span class="text-xs dark:text-gray-400 pl-1">Receber alertas de CNH vencida e manutenções agendadas.</span>
        </div>

        <div class="form-control p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg">
          <label class="label cursor-pointer">
            <span class="label-text font-bold dark:text-white">Backup Automático</span>
            <input type="checkbox" class="toggle toggle-secondary" checked />
          </label>
          <span class="text-xs dark:text-gray-400 pl-1">Sincronizar dados na nuvem a cada 24 horas.</span>
        </div>

        <div class="form-control p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg">
          <label class="label cursor-pointer">
            <span class="label-text font-bold dark:text-white">Unidade de Medida</span>
            <div class="join">
              <input class="join-item btn btn-xs" type="radio" name="unit" aria-label="KM" checked />
              <input class="join-item btn btn-xs" type="radio" name="unit" aria-label="MI" />
            </div>
          </label>
        </div>
      </div>

      <div class="card-actions justify-end mt-10">
        <button class="btn btn-primary px-10">Salvar Alterações</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activeTab = ref('profile');
</script>