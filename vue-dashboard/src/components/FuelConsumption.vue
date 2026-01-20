<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-xl text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="mdi:gas-station" class="text-secondary" />
          Eficiência da Frota
        </h2>
        <button @click="openFuelModal" class="btn btn-sm btn-secondary text-white">
          <Icon icon="mdi:plus" /> Registar Abastecimento
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full dark:text-gray-300">
          <thead class="bg-base-200 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200">
            <tr>
              <th>Veículo</th>
              <th>Média Atual</th>
              <th>Total Gasto ($)</th>
              <th>Status de Eficiência</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in fuelAnalysis" :key="vehicle.plate" class="hover:bg-base-200 dark:hover:bg-gray-700/50">
              <td>
                <div class="font-bold">{{ vehicle.model }}</div>
                <div class="text-xs opacity-50">{{ vehicle.plate }}</div>
              </td>
              <td class="font-mono">{{ vehicle.average }} km/L</td>
              <td class="font-mono text-secondary font-bold">${{ vehicle.totalCost }}</td>
              <td>
                <div :class="getEfficiencyColor(vehicle.average, vehicle.type)" class="flex items-center gap-1 font-semibold">
                  <Icon :icon="getEfficiencyIcon(vehicle.average, vehicle.type)" />
                  {{ getEfficiencyLabel(vehicle.average, vehicle.type) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="fuelAnalysis.length === 0" class="text-center py-8 opacity-50">
        Nenhum dado de combustível registado para os veículos atuais.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

// Lógica para processar os dados da Store
const fuelAnalysis = computed(() => {
  return fleetStore.vehicles.map(v => {
    // Aqui buscaríamos os dados reais de fuelLogs filtrados por placa
    // Por enquanto, vamos gerar uma média simulada baseada no modelo
    const isHeavy = v.model.toLowerCase().includes('scania') || v.model.toLowerCase().includes('volvo');
    
    return {
      plate: v.plate,
      model: v.model,
      type: isHeavy ? 'heavy' : 'light',
      average: isHeavy ? (Math.random() * (3.5 - 2.5) + 2.5).toFixed(1) : (Math.random() * (10 - 7) + 7).toFixed(1),
      totalCost: (Math.random() * 500 + 100).toFixed(2)
    };
  });
});

// Funções de Ajuda para o Visual
const getEfficiencyLabel = (avg, type) => {
  if (type === 'heavy') return avg > 3.0 ? 'Excelente' : 'Baixa';
  return avg > 8.5 ? 'Excelente' : 'Abaixo da Média';
};

const getEfficiencyColor = (avg, type) => {
  const label = getEfficiencyLabel(avg, type);
  return label === 'Excelente' ? 'text-success' : 'text-warning';
};

const getEfficiencyIcon = (avg, type) => {
  return getEfficiencyLabel(avg, type) === 'Excelente' ? 'mdi:trending-up' : 'mdi:trending-down';
};

const openFuelModal = () => alert("Módulo de registo de abastecimento em desenvolvimento.");
</script>