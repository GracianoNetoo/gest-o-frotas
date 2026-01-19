<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2 mb-4">
        <Icon icon="mdi:map-marker-distance" class="text-primary" />
        Rotas em Execução
      </h2>

      <div class="space-y-6">
        <div v-for="route in activeRoutes" :key="route.id" class="p-4 bg-base-200 dark:bg-gray-900/40 rounded-xl">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-bold dark:text-white">{{ route.vehicle }}</span>
            <span class="badge badge-primary badge-outline text-xs">{{ route.driver }}</span>
          </div>

          <div class="flex items-center gap-4 my-4">
            <div class="flex flex-col items-center">
              <Icon icon="mdi:circle-slice-8" class="text-success w-3 h-3" />
              <div class="w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
              <Icon icon="mdi:map-marker" class="text-error w-4 h-4" />
            </div>
            <div class="flex-1 text-sm space-y-4 dark:text-gray-300">
              <p><strong>Origem:</strong> {{ route.origin }}</p>
              <p><strong>Destino:</strong> {{ route.destination }}</p>
            </div>
            <div class="text-right">
              <div class="radial-progress text-primary" :style="`--value:${route.progress}; --size:3rem; --thickness: 4px;`" role="progressbar">
                <span class="text-[10px]">{{ route.progress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activeRoutes = ref([
  { id: 1, vehicle: 'Volvo FH - JKL1234', driver: 'Marcos P.', origin: 'Luanda, Cazenga', destination: 'Panguila, Bengo', progress: 65 },
  { id: 2, vehicle: 'Scania R - MNO5678', driver: 'Ana L.', origin: 'Luanda, Cacuaco', destination: 'Asa Branca, Luanda', progress: 30 }
]);
</script>