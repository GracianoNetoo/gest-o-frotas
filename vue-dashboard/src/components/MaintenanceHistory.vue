<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700 w-full">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:history" class="text-success" />
          Histórico de Manutenções
        </h2>
        <div class="badge badge-outline border-success text-success p-4 gap-2">
          Total Gasto: <span class="font-bold font-mono">KZ{{ totalSpent.toFixed(3) }}</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50">
            <tr class="dark:border-gray-700 text-gray-700 dark:text-gray-200">
              <th>Data Conclusão</th>
              <th>Veículo</th>
              <th>Serviço</th>
              <th>Oficina</th>
              <th>Custo</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in maintenanceHistory" :key="h.id" class="hover:bg-base-200 dark:hover:bg-gray-700/50 dark:border-gray-700">
              <td class="text-sm">{{ formatDate(h.finishedAt || h.plannedDate) }}</td>
              <td class="font-bold">{{ h.vehiclePlate }}</td>
              <td>{{ h.serviceType }}</td>
              <td class="text-xs opacity-70">{{ h.workshop || '---' }}</td>
              <td class="font-mono text-success font-bold">KZ{{ parseFloat(h.estimatedCost || 0).toFixed(3) }}</td>
              <td class="text-center">
                <button @click="deleteEntry(h.id)" class="btn btn-ghost btn-xs text-error">
                  <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr v-if="maintenanceHistory.length === 0">
              <td colspan="6" class="text-center py-10 opacity-50">Nenhum registro no histórico.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

// 1. Filtra manutenções concluídas
const maintenanceHistory = computed(() => {
  return (fleetStore.maintenances || [])
    .filter(m => m.status === 'Concluída')
    .sort((a, b) => new Date(b.finishedAt) - new Date(a.finishedAt)); // Mais recentes primeiro
});

// 2. Calcula o total gasto
const totalSpent = computed(() => {
  return maintenanceHistory.value.reduce((sum, item) => sum + parseFloat(item.estimatedCost || 0), 0);
});

const formatDate = (date) => {
  if (!date) return '---';
  return new Date(date).toLocaleDateString('pt-BR');
};

const deleteEntry = (id) => {
  if (confirm("Deseja remover este registro do histórico permanentemente?")) {
    const idx = fleetStore.maintenances.findIndex(m => m.id === id);
    if (idx !== -1) {
      fleetStore.maintenances.splice(idx, 1);
      fleetStore.saveToStorage();
    }
  }
};
</script>