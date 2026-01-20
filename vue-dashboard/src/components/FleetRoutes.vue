<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:map-marker-distance" class="text-primary" />
          Rotas em Execução
        </h2>
        <button @click="$emit('navigate', 'add-route')" class="btn btn-xs btn-primary">Iniciar Rota</button>
      </div>

      <div class="space-y-6">
        <div v-for="route in runningRoutes" :key="route.id" class="p-4 bg-base-200 dark:bg-gray-900/40 rounded-xl transition-all hover:shadow-md">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-bold dark:text-white">{{ route.vehiclePlate }}</span>
            <span class="badge badge-primary badge-outline text-xs px-3">{{ route.driverName }}</span>
          </div>

          <div class="flex items-center gap-4 my-4">
            <div class="flex flex-col items-center">
              <Icon icon="mdi:circle-slice-8" class="text-success w-3 h-3" />
              <div class="w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
              <Icon icon="mdi:map-marker" class="text-error w-4 h-4" />
            </div>
            <div class="flex-1 text-sm space-y-4 dark:text-gray-300">
              <p><span class="opacity-60 text-[10px] uppercase block">Origem</span> {{ route.origin }}</p>
              <p><span class="opacity-60 text-[10px] uppercase block">Destino</span> {{ route.destination }}</p>
            </div>
            
            <div class="flex flex-col items-center gap-2">
              <div class="radial-progress text-primary" :style="`--value:${route.progress}; --size:3.5rem; --thickness: 4px;`" role="progressbar">
                <span class="text-[10px] font-bold">{{ route.progress }}%</span>
              </div>
              <button @click="completeRoute(route)" class="btn btn-ghost btn-xs text-success" title="Concluir Viagem">
                <Icon icon="mdi:check-all" class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <input type="range" min="0" max="100" v-model="route.progress" 
                 @change="fleetStore.saveToStorage()"
                 class="range range-primary range-xs opacity-40 hover:opacity-100 transition-opacity" />
        </div>

        <div v-if="runningRoutes.length === 0" class="text-center py-10 opacity-40 italic text-sm">
          Nenhuma rota ativa no momento.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const emit = defineEmits(['navigate']);

const runningRoutes = computed(() => {
  return (fleetStore.routes || []).filter(r => r.status === 'Em Execução');
});

const completeRoute = (route) => {
  if(confirm("Deseja finalizar esta rota e liberar o veículo?")) {
    route.status = 'Concluída';
    route.progress = 100;
    route.finishedAt = new Date().toISOString();

    // Libera o veículo
    const vehicle = fleetStore.vehicles.find(v => v.plate === route.vehiclePlate);
    if (vehicle) {
      vehicle.status = 'Disponível';
      vehicle.driver = ''; // Remove o motorista do veículo ao fim da rota
    }

    fleetStore.saveToStorage();
  }
};
</script>