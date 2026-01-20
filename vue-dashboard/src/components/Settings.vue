<template>
  <div class="card bg-base-100 dark:bg-gray-800 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-2xl text-gray-800 dark:text-white mb-6">
        <Icon icon="mdi:cog" class="text-primary" /> Configurações
      </h2>

      <div role="tablist" class="tabs tabs-bordered mb-8">
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'profile' }" @click="activeTab = 'profile'">Perfil</button>
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'system' }" @click="activeTab = 'system'">Sistema</button>
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'data' }" @click="activeTab = 'data'">Gerenciar Dados</button>
      </div>

      <div v-if="activeTab === 'profile'" class="space-y-6 animate-fadeIn">
        <div class="flex items-center gap-6 mb-6">
          <div class="relative group">
            <div class="avatar">
              <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200">
                <img v-if="userPhoto" :src="userPhoto" class="object-cover w-full h-full" />
                <img v-else src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              </div>
            </div>
            
            <label class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Icon icon="mdi:camera" class="text-white text-2xl" />
              <input type="file" class="hidden" accept="image/*" @change="handlePhotoUpload" />
            </label>
          </div>

          <div>
            <h3 class="text-lg font-bold dark:text-white">{{ userName || 'Administrador' }}</h3>
            <p class="text-sm dark:text-gray-400">Nível: Gestor de Frota</p>
            <button v-if="userPhoto" @click="userPhoto = null" class="text-xs text-error mt-1 hover:underline">Remover foto</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Nome de Exibição</span></label>
            <input v-model="userName" type="text" class="input input-bordered dark:bg-gray-700 dark:text-white" />
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Idioma</span></label>
            <select class="select select-bordered dark:bg-gray-700 dark:text-white">
              <option selected>Português (AO)</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'system'" class="space-y-4 animate-fadeIn">
        <div class="form-control p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg">
          <label class="label cursor-pointer">
            <span class="label-text font-bold dark:text-white">Notificações por E-mail</span>
            <input type="checkbox" class="toggle toggle-primary" checked />
          </label>
          <span class="text-xs dark:text-gray-400 pl-1">Alertas de CNH e Manutenções agendadas.</span>
        </div>
        
        <div class="form-control p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg">
          <label class="label cursor-pointer">
            <span class="label-text font-bold dark:text-white">Modo Escuro Automatizado</span>
            <input type="checkbox" class="toggle toggle-accent" checked />
          </label>
        </div>
      </div>

      <div v-if="activeTab === 'data'" class="space-y-6 animate-fadeIn">
        <div class="alert alert-info shadow-sm text-sm">
          <Icon icon="mdi:information" class="text-xl" />
          <span>Use estas ferramentas para salvar ou resetar os dados locais da sua frota.</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border border-base-200 dark:border-gray-700 rounded-lg hover:bg-base-200 transition-colors">
            <h4 class="font-bold mb-2 flex items-center gap-2">
              <Icon icon="mdi:database-export" /> Exportar Backup
            </h4>
            <p class="text-xs mb-4 opacity-70">Descarrega todos os veículos, motoristas e rotas em um arquivo JSON.</p>
            <button @click="exportData" class="btn btn-outline btn-sm w-full font-bold">Download Backup</button>
          </div>

          <div class="p-4 border border-error/30 rounded-lg bg-error/5 hover:bg-error/10 transition-colors">
            <h4 class="font-bold mb-2 text-error flex items-center gap-2">
              <Icon icon="mdi:alert-octagon" /> Zona de Perigo
            </h4>
            <p class="text-xs mb-4 opacity-70">Apaga permanentemente todos os registros deste computador.</p>
            <button @click="clearAllData" class="btn btn-error btn-sm btn-outline w-full">Limpar Sistema</button>
          </div>
        </div>
      </div>

      <div class="card-actions justify-end mt-10 border-t pt-6 dark:border-gray-700">
        <button @click="saveSettings" class="btn btn-primary px-10 text-white shadow-lg">Salvar Alterações</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const activeTab = ref('profile');

// Estado reativo persistente
const userName = ref(localStorage.getItem('settings_user_name') || 'Admin');
const userPhoto = ref(localStorage.getItem('settings_user_photo') || null);

// Sincronizar nome com o localStorage automaticamente
watch(userName, (val) => localStorage.setItem('settings_user_name', val));

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    alert("A imagem deve ser menor que 1MB para garantir performance.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    userPhoto.value = e.target.result;
    localStorage.setItem('settings_user_photo', e.target.result);
  };
  reader.readAsDataURL(file);
};

const saveSettings = () => {
  alert("Configurações atualizadas com sucesso!");
};

const exportData = () => {
  const data = {
    vehicles: fleetStore.vehicles,
    drivers: fleetStore.drivers,
    maintenances: fleetStore.maintenances,
    routes: fleetStore.routes
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `backup_frota_${new Date().toISOString().slice(0,10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const clearAllData = () => {
  if (confirm("TEM CERTEZA? Esta ação é irreversível e apagará todos os dados.")) {
    localStorage.clear();
    location.reload();
  }
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>