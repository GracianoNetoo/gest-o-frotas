<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:wrench-clock" class="text-warning" />
        Em Andamento
      </h2>
      <div class="space-y-4 mt-4">
        <div v-for="item in active" :key="item.id" class="p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg border-l-4 border-warning">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold dark:text-white">{{ item.vehicle }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Oficina: {{ item.workshop }}</p>
            </div>
            <span class="badge badge-warning text-xs font-bold animate-pulse">NO BOX</span>
          </div>
          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1.5 mt-3">
            <div class="bg-warning h-1.5 rounded-full" :style="{ width: item.progress + '%' }"></div>
          </div>
          <p class="text-right text-[10px] mt-1 dark:text-gray-400">{{ item.progress }}% concluído</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const active = ref([
  { id: 1, vehicle: 'Mercedes Atego - GHI9012', workshop: 'Mecânica Central', progress: 65 }
]);
</script>