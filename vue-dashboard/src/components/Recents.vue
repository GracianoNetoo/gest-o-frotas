<template>
  <div class="card bg-base-100 shadow-xl dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
    <div class="card-body">
      <div class="flex justify-between items-center mb-2">
        <h2 class="card-title text-lg flex items-center gap-2">
          <Icon icon="mdi:pulse" class="text-primary animate-pulse" />
          Atividades Recentes
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="dark:border-white/10 opacity-70">
              <th>Evento</th>
              <th>Entidade</th>
              <th>Data/Hora</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in recentActivities" :key="activity.id" class="hover:bg-base-200/50 dark:hover:bg-white/5 transition-colors">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div :class="activity.type === 'vehicle' ? 'bg-blue-500' : 'bg-green-500'" class="text-white rounded-full w-8">
                      <Icon :icon="activity.type === 'vehicle' ? 'mdi:car-plus' : 'mdi:tools'" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold text-sm">{{ activity.action }}</div>
                    <div class="text-xs opacity-50">{{ activity.category }}</div>
                  </div>
                </div>
              </td>
              <td class="font-mono text-sm">{{ activity.target }}</td>
              <td class="text-xs">{{ formatDateTime(activity.date) }}</td>
              <td>
                <span :class="`badge badge-sm border-none text-white font-bold badge-${activity.statusClass}`">
                  {{ activity.status }}
                </span>
              </td>
            </tr>

            <tr v-if="recentActivities.length === 0">
              <td colspan="4" class="text-center py-10 opacity-50 italic">
                Nenhuma atividade recente registrada.
              </td>
            </tr>
          </tbody>
        </table>

        <div class="card-actions justify-end mt-4">
          <button @click="$emit('navigate', 'vehicles')" class="btn btn-ghost btn-xs gap-1 opacity-70 hover:opacity-100">
            Ver frota completa
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

defineEmits(['navigate']);

const recentActivities = computed(() => {
  const activities = [];

  // 1. Pega os últimos 3 veículos adicionados
  const vehicles = (fleetStore.vehicles || []).slice(-3).map(v => ({
    id: `v-${v.plate}`,
    type: 'vehicle',
    action: 'Novo Veículo',
    category: v.model,
    target: v.plate,
    date: v.createdAt || new Date(), // Ideal ter createdAt no addVehicle
    status: v.status,
    statusClass: getStatusClass(v.status),
    rawDate: v.createdAt ? new Date(v.createdAt).getTime() : 0
  }));

  // 2. Pega as últimas 3 manutenções (Concluídas ou Agendadas)
  const maintenances = (fleetStore.maintenances || []).slice(-3).map(m => ({
    id: `m-${m.id}`,
    type: 'maintenance',
    action: m.status === 'Concluída' ? 'Manutenção Finalizada' : 'Manutenção Agendada',
    category: m.serviceType,
    target: m.vehiclePlate,
    date: m.finishedAt || m.plannedDate,
    status: m.status,
    statusClass: m.status === 'Concluída' ? 'success' : 'warning',
    rawDate: new Date(m.finishedAt || m.plannedDate).getTime()
  }));

  // Combina e ordena por data (mais recente primeiro)
  return [...vehicles, ...maintenances]
    .sort((a, b) => b.rawDate - a.rawDate)
    .slice(0, 5); // Mostra apenas as 5 últimas ações no total
});

function getStatusClass(status) {
  const statusMap = {
    'Em Uso': 'success',
    'Em Rota': 'success',
    'Disponível': 'info',
    'Manutenção': 'warning',
    'Indisponível': 'error'
  };
  return statusMap[status] || 'ghost';
}

const formatDateTime = (date) => {
  if (!date) return '---';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + 
         ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};
</script>