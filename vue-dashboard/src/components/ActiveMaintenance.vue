<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:wrench-clock" class="text-warning" />
        Em Andamento
      </h2>
      
      <div class="space-y-4 mt-4">
        <div v-for="item in activeMaintenances" :key="item.id" 
             class="p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg border-l-4 border-warning">
          
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold dark:text-white">{{ item.vehiclePlate }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Oficina: {{ item.workshop || 'Não informada' }}</p>
              <p class="text-xs italic opacity-70">{{ item.serviceType }}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="badge badge-warning text-xs font-bold animate-pulse">NO BOX</span>
              <button @click="finishMaintenance(item)" class="btn btn-xs btn-success text-white">
                Finalizar
              </button>
            </div>
          </div>

          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1.5 mt-3">
            <div 
              class="bg-warning h-1.5 rounded-full transition-all duration-500" 
              :style="{ width: (item.progress || 50) + '%' }"
            ></div>
          </div>
          
          <div class="flex justify-between items-center mt-1">
             <input 
              type="range" min="0" max="100" v-model="item.progress" 
              class="range range-warning range-xs w-24" 
              @change="fleetStore.saveToStorage()"
            />
            <p class="text-right text-[10px] dark:text-gray-400">{{ item.progress || 50 }}% concluído</p>
          </div>
        </div>

        <div v-if="activeMaintenances.length === 0" class="text-center py-6 opacity-50 text-sm">
          Nenhum veículo em reparação no momento.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

// 1. Filtra manutenções com status 'Em Curso'
const activeMaintenances = computed(() => {
  return (fleetStore.maintenances || []).filter(m => m.status === 'Em Curso');
});

// 2. Finaliza a manutenção e libera o veículo
const finishMaintenance = (item) => {
  if (confirm(`Confirmar conclusão da manutenção para o veículo ${item.vehiclePlate}?`)) {
    // Muda status da manutenção para Histórico
    item.status = 'Concluída';
    item.progress = 100;
    item.finishedAt = new Date().toISOString();

    // REGRA DE OURO: Liberar o veículo na frota principal
    const vehicle = fleetStore.vehicles.find(v => v.plate === item.vehiclePlate);
    if (vehicle) {
      vehicle.status = 'Disponível';
      vehicle.lastMaintenance = item.finishedAt;
    }

    fleetStore.saveToStorage();
    alert('Manutenção concluída! O veículo já está disponível para uso.');
  }
};
</script>