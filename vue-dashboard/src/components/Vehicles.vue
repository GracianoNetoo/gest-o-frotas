<template>
  <div class="overflow-x-auto w-full bg-white dark:bg-white/5 rounded-xl shadow-lg border border-base-200 dark:border-white/10">
    <table class="table w-full">
      <thead>
        <tr class="text-gray-500 dark:text-gray-400 border-b border-base-200 dark:border-white/10">
          <th>Veículo</th>
          <th>Matrícula</th>
          <th>Categoria</th>
          <th>Motorista</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="vehicle in fleetStore.vehicles" :key="vehicle.id" class="hover:bg-base-200 dark:hover:bg-white/5 transition-colors">
          <td>
            <div class="font-bold text-base-content">{{ vehicle.model }}</div>
            <div class="text-sm opacity-50">{{ vehicle.color || 'Cor não definida' }}</div>
          </td>
          <td class="font-mono text-primary">{{ vehicle.plate }}</td>
          <td>{{ vehicle.category }}</td>
          <td>{{ vehicle.driver || 'Não atribuído' }}</td>
          <td>
            <span :class="getStatusClass(vehicle.status)" class="badge badge-sm border-none">
              {{ vehicle.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-ghost btn-xs">Editar</button>
          </td>
        </tr>

        <tr v-if="fleetStore.vehicles.length === 0">
          <td colspan="6" class="text-center py-10 opacity-50">
            Nenhum veículo encontrado no Supabase.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { fleetStore } from '../store/fleetStore';

// Função auxiliar para cores do status (opcional, conforme seu design)
const getStatusClass = (status) => {
  switch (status) {
    case 'Disponível': return 'bg-success/20 text-success';
    case 'Em Uso': return 'bg-info/20 text-info';
    case 'Manutenção': return 'bg-warning/20 text-warning';
    default: return 'bg-error/20 text-error';
  }
};
</script>