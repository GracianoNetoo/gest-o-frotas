<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:calendar-clock" class="text-info" />
        Agendadas
      </h2>
      <div class="space-y-4 mt-4">
        <div v-for="item in scheduled" :key="item.id" 
             class="flex items-center justify-between p-4 bg-base-200 dark:bg-gray-700/50 rounded-lg border-l-4 border-info">
          <div>
            <h3 class="font-bold dark:text-white">{{ item.vehicle }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.service }}</p>
            <div class="flex items-center gap-2 mt-1 text-xs font-semibold text-info">
              <Icon icon="mdi:calendar" /> {{ item.date }}
            </div>
          </div>
          <button class="btn btn-sm btn-ghost dark:text-gray-300">
            <Icon icon="mdi:pencil" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const scheduled = ref([
  { id: 1, vehicle: 'Scania R450 - ABC1234', service: 'Troca de Óleo e Filtros', date: '22/01/2026' },
  { id: 2, vehicle: 'Volvo FH540 - DEF5678', service: 'Revisão de Freios', date: '25/01/2026' }
]);
</script>