<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2 mb-4">
        <Icon icon="mdi:gas-station" class="text-secondary" />
        Consumo de Combustível
      </h2>

      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50">
            <tr class="dark:border-gray-700 text-gray-700 dark:text-gray-200">
              <th>Veículo</th>
              <th>Média (km/L)</th>
              <th>Total Gasto</th>
              <th>Eficiência</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in fuelStats" :key="stat.id" class="hover:bg-base-200 dark:hover:bg-gray-700/50 dark:border-gray-700">
              <td class="font-bold">{{ stat.vehicle }}</td>
              <td>{{ stat.average }}</td>
              <td class="font-mono">{{ stat.totalCost }}</td>
              <td>
                <div :class="stat.efficiency > 3 ? 'text-success' : 'text-warning'" class="flex items-center gap-1">
                  <Icon :icon="stat.efficiency > 3 ? 'mdi:trending-up' : 'mdi:trending-down'" />
                  {{ stat.efficiency > 3 ? 'Alta' : 'Moderada' }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const fuelStats = ref([
    { id: 1, vehicle: 'Volvo FH540', average: '3.2', totalCost: '12.450KZ', efficiency: 3.5 },
    { id: 2, vehicle: 'VW Delivery', average: '6.8', totalCost: '4.200KZ', efficiency: 6.5 },{ id: 3, vehicle: 'Scania R450', average: '2.9', totalCost: '15.800KZ', efficiency: 2.8 }
]);
</script>