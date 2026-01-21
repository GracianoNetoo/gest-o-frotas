<template>
  <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
    <div class="card-body">
      <h2 class="card-title mb-4 flex items-center gap-2">
        <Icon icon="line-md:loading-twotone-loop" class="text-primary w-5 h-5" />
        Fluxo de Atividade Real
      </h2>
      
      <ul class="timeline timeline-vertical">
        <li v-for="(activity, index) in activities" :key="activity.id">
          <hr v-if="index !== 0" :class="activity.colorClass" />
          
          <div :class="index % 2 === 0 ? 'timeline-start' : 'timeline-end'" 
               class="timeline-box bg-base-200 dark:bg-white/5 border-none shadow-sm p-3">
            <div class="flex items-center gap-2 mb-1">
              <Icon :icon="activity.icon" :class="activity.iconClass" class="w-4 h-4" />
              <span class="text-sm font-bold">{{ activity.title }}</span>
            </div>
            <p class="text-xs opacity-70 mb-1">{{ activity.description }}</p>
            <time class="text-[10px] font-mono uppercase opacity-50">{{ activity.time }}</time>
          </div>

          <div class="timeline-middle">
            <Icon icon="mdi:checkbox-blank-circle" :class="activity.iconClass" class="w-3 h-3" />
          </div>

          <hr v-if="index !== activities.length - 1" :class="activity.colorClass" />
        </li>

        <div v-if="activities.length === 0" class="text-center opacity-50 py-10 text-sm italic">
          Aguardando movimentações na frota...
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const activities = computed(() => {
  const allEvents = [];

  // 1. Eventos de Veículos (Novos Cadastros)
  (fleetStore.vehicles || []).forEach(v => {
    allEvents.push({
      id: `v-${v.plate}`,
      title: 'Frota Atualizada',
      description: `Veículo ${v.plate} (${v.model}) adicionado.`,
      time: 'Recente', // Idealmente usar v.createdAt se existir
      timestamp: Date.now() - 10000, 
      icon: 'line-md:car',
      iconClass: 'text-blue-500',
      colorClass: 'bg-blue-500'
    });
  });

  // 2. Eventos de Manutenção
  (fleetStore.maintenances || []).forEach(m => {
    const isDone = m.status === 'Concluída';
    allEvents.push({
      id: `m-${m.id}`,
      title: isDone ? 'Manutenção Concluída' : 'Serviço Agendado',
      description: `${m.serviceType} para o veículo ${m.vehiclePlate}`,
      time: isDone ? 'Finalizado' : 'Pendente',
      timestamp: new Date(m.finishedAt || m.plannedDate).getTime(),
      icon: isDone ? 'line-md:confirm-circle' : 'line-md:wrench',
      iconClass: isDone ? 'text-green-500' : 'text-warning',
      colorClass: isDone ? 'bg-green-500' : 'bg-warning'
    });
  });

  // 3. Eventos de Motoristas
  (fleetStore.drivers || []).forEach(d => {
    allEvents.push({
      id: `d-${d.id}`,
      title: 'Novo Motorista',
      description: `${d.name} integrado à equipe.`,
      time: 'Cadastro',
      timestamp: Date.now() - 50000,
      icon: 'line-md:account',
      iconClass: 'text-purple-500',
      colorClass: 'bg-purple-500'
    });
  });

  // Ordenar por data (mais recente primeiro) e limitar a 6 itens
  return allEvents
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 6);
});
</script>