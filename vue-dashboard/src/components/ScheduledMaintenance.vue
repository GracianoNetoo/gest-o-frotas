<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" class="text-info" />
          Agendas Próximas
        </h2>
        <button 
          @click="$emit('navigate', 'add-maintenance')" 
          class="btn btn-sm btn-info text-white shadow-lg"
        >
          <Icon icon="mdi:plus" /> Agendar
        </button>
      </div>

      <div class="space-y-4">
        <div v-for="item in upcomingMaintenances" :key="item.id" 
             class="flex items-center justify-between p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg border-l-4 border-info hover:scale-[1.01] transition-transform">
          <div>
            <h3 class="font-bold dark:text-white">{{ item.vehiclePlate }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.serviceType }}</p>
            <div class="flex items-center gap-2 mt-1 text-xs font-semibold text-info">
              <Icon icon="mdi:calendar" /> {{ formatDate(item.plannedDate) }}
            </div>
          </div>
          <div class="flex gap-1">
             <button @click="startMaintenance(item)" class="btn btn-sm btn-ghost text-success" title="Iniciar Agora">
              <Icon icon="mdi:play" class="w-5 h-5"/>
            </button>
            <button @click="deleteMaintenance(item.id)" class="btn btn-sm btn-ghost text-error">
              <Icon icon="mdi:trash-can" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-if="upcomingMaintenances.length === 0" class="text-center py-6 opacity-50 text-sm">
          Nenhum serviço agendado para os próximos dias.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore'; // Conexão com a Store

const emit = defineEmits(['navigate']);

// 1. Filtrar apenas o que está "Agendado" vindo da Store
const upcomingMaintenances = computed(() => {
  return (fleetStore.maintenances || [])
    .filter(m => m.status === 'Agendada')
    .sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

const deleteMaintenance = (id) => {
  if(confirm("Deseja cancelar este agendamento?")) {
    const idx = fleetStore.maintenances.findIndex(m => m.id === id);
    if(idx !== -1) {
      fleetStore.maintenances.splice(idx, 1);
      fleetStore.saveToStorage();
    }
  }
};

// Função para mudar o status de Agendada para "Em Curso"
const startMaintenance = (item) => {
    item.status = 'Em Curso';
    fleetStore.saveToStorage();
    alert('Manutenção iniciada!');
};


</script>