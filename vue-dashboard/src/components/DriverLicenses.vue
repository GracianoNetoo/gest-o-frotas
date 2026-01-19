<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <div class="flex justify-between items-center mb-6">
        <h2 class="card-title text-2xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:card-account-details" class="text-secondary" />
          Controle de Licenças (CNH)
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50">
            <tr class="dark:border-gray-700 text-gray-700 dark:text-gray-200">
              <th>Motorista</th>
              <th>Nº Registro</th>
              <th>Categoria</th>
              <th>Vencimento</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="license in licenses" :key="license.id" class="hover:bg-base-200 dark:hover:bg-gray-700/50 border-base-200 dark:border-gray-700">
              <td class="font-medium">{{ license.driverName }}</td>
              <td class="font-mono">{{ license.number }}</td>
              <td>
                <span class="badge badge-outline dark:text-gray-300">{{ license.category }}</span>
              </td>
              <td>{{ license.expiryDate }}</td>
              <td>
                <div :class="statusBadge(license.daysLeft)" class="badge gap-1 p-3">
                  <Icon :icon="statusIcon(license.daysLeft)" />
                  {{ statusText(license.daysLeft) }}
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

// Dados simulados
const licenses = ref([
  { id: 1, driverName: 'João Silva', number: '12345678910', category: 'Vans', expiryDate: '2025-10-20', daysLeft: 300 },
  { id: 2, driverName: 'Maria Santos', number: '98765432100', category: 'Carros', expiryDate: '2024-05-15', daysLeft: 15 },
  { id: 3, driverName: 'Carlos Oliveira', number: '45612378955', category: 'Caminhões', expiryDate: '2023-12-01', daysLeft: -10 }
]);

const statusBadge = (days) => {
  if (days < 0) return 'badge-error text-white';
  if (days <= 30) return 'badge-warning text-black';
  return 'badge-success text-white';
};

const statusIcon = (days) => {
  if (days < 0) return 'mdi:alert-octagon';
  if (days <= 30) return 'mdi:alert';
  return 'mdi:check-decagram';
};

const statusText = (days) => {
  if (days < 0) return 'Vencida';
  if (days <= 30) return 'Vence em breve';
  return 'Regular';
};
</script>