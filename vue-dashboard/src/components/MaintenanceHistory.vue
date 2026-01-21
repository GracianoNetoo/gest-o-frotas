<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700 w-full">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:history" class="text-success" />
          Histórico de Manutenções
        </h2>
        <div class="badge badge-outline border-success text-success p-5 gap-2">
          <span class="text-xs uppercase opacity-70">Total Gasto:</span>
          <span class="font-bold font-mono text-lg">KZ {{ formatCurrency(totalSpent) }}</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50">
            <tr class="dark:border-gray-700">
              <th>Data</th>
              <th>Veículo</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Custo</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in maintenanceHistory" :key="h.id" class="hover:bg-base-200 dark:hover:bg-gray-700/50">
              <td class="text-sm">{{ formatDate(h.finishedAt || h.plannedDate) }}</td>
              <td class="font-bold">{{ h.vehiclePlate }}</td>
              <td>{{ h.serviceType }}</td>
              <td>
                <span :class="h.status === 'Concluída' ? 'badge-success' : 'badge-warning'" class="badge badge-sm text-white border-none font-bold">
                  {{ h.status }}
                </span>
              </td>
              <td class="font-mono text-success font-bold text-md">
                KZ {{ formatCurrency(h.estimatedCost) }}
              </td>
              <td class="flex justify-center gap-2">
                <button v-if="h.status === 'Agendada'" @click="finishMaintenance(h.id)" class="btn btn-success btn-xs text-white">
                  Concluir
                </button>
                <button @click="deleteEntry(h.id)" class="btn btn-ghost btn-xs text-error">
                  <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
                </button>
              </td>
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

const maintenanceHistory = computed(() => [...(fleetStore.maintenances || [])].reverse());

// FIX: Soma robusta garantindo que os valores sejam números
const totalSpent = computed(() => {
  return (fleetStore.maintenances || []).reduce((sum, item) => {
    const valor = parseFloat(item.estimatedCost) || 0;
    return sum + valor;
  }, 0);
});

const formatCurrency = (value) => {
  // Padrão Angola: Pontos para milhar, vírgula para decimais (2 casas)
  return new Intl.NumberFormat('pt-AO', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(value || 0);
};

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : '---';

const finishMaintenance = (id) => {
  const m = fleetStore.maintenances.find(item => item.id === id);
  if (m) {
    m.status = 'Concluída';
    m.finishedAt = new Date().toISOString();
    const v = fleetStore.vehicles.find(veh => veh.plate === m.vehiclePlate);
    if (v) v.status = 'Disponível';
    fleetStore.saveToStorage();
  }
};

const deleteEntry = (id) => {
  if (confirm("Remover registro?")) {
    const idx = fleetStore.maintenances.findIndex(m => m.id === id);
    if (idx !== -1) {
      fleetStore.maintenances.splice(idx, 1);
      fleetStore.saveToStorage();
    }
  }
};
</script>