<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700 w-full">
    <div class="card-body">
      <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2 mb-4">
        <Icon icon="mdi:history" class="text-success" />
        Histórico de Manutenções
      </h2>
      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50">
            <tr class="dark:border-gray-700 text-gray-700 dark:text-gray-200">
              <th>Data</th>
              <th>Veículo</th>
              <th>Serviço Realizado</th>
              <th>Custo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in history" :key="h.id" class="hover:bg-base-200 dark:hover:bg-gray-700/50 dark:border-gray-700">
              <td class="text-sm">{{ h.date }}</td>
              <td class="font-bold">{{ h.vehicle }}</td>
              <td>{{ h.service }}</td>
              <td class="font-mono text-success font-bold">{{ h.cost }}</td>
              <td><span class="badge badge-success text-white">Concluído</span></td>
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

const history = ref([
  { id: 1, date: '15/01/2026', vehicle: 'Scania R450', service: 'Troca de Pneus', cost: '14.200,00KZ' },
  { id: 2, date: '10/01/2026', vehicle: 'Iveco Hi-Way', service: 'Reparo Elétrico', cost: '18.500,00KZ' },
  { id: 3, date: '05/01/2026', vehicle: 'VW Delivery', service: 'Alinhamento', cost: '13.200,00KZ' }
]);
</script>