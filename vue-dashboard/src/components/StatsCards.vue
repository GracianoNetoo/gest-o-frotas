<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
    <div
      v-for="(stat, index) in dynamicStats"
      :key="index"
      class="stats bg-base-100 shadow-lg dark:bg-white/5 dark:backdrop-blur-md border border-base-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
    >
      <div class="stat p-4">
        <div class="stat-title text-xs uppercase tracking-widest font-semibold opacity-60">
          {{ stat.title }}
        </div>
        <div class="stat-value text-3xl font-black text-gray-800 dark:text-white">
          {{ stat.value }}
        </div>
        <div class="stat-desc flex items-center gap-1 mt-1 text-sm" :class="getDescClass(stat)">
          <span v-if="stat.trend">{{ stat.trend }}</span>
          {{ stat.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { fleetStore } from "../store/fleetStore"; 

const dynamicStats = computed(() => {
  // 1. Veículos em Uso (Aqueles que estão com status 'Em Rota')
  const inUse = (fleetStore.vehicles || []).filter(v => v.status === 'Em Rota').length;
  
  // 2. Manutenções Pendentes (Status 'Agendada')
  const pending = (fleetStore.maintenances || []).filter(m => m.status === 'Agendada').length;

  // 3. Motoristas Ativos (Aqueles que estão em rotas 'Em Execução')
  // Filtramos as rotas ativas e pegamos o nome do motorista único
  const driversInRoute = new Set(
    (fleetStore.routes || [])
      .filter(r => r.status === 'Em Execução')
      .map(r => r.driverName)
  ).size;

  return [
    {
      title: "Frota Total",
      value: fleetStore.vehicles?.length || 0,
      desc: "Veículos cadastrados",
      type: 'neutral'
    },
    {
      title: "Veículos em Uso",
      value: inUse,
      desc: inUse > 0 ? "Em operação agora" : "Frota parada",
      trend: inUse > 0 ? "↗" : "–"
    },
    {
      title: "Manutenções",
      value: pending,
      desc: pending > 0 ? "Aguardando oficina" : "Tudo em dia",
      trend: pending > 5 ? "↗" : "↙",
      alert: pending > 3 // Fica vermelho se tiver muita manutenção
    },
    {
      title: "Motoristas Ativos",
      value: driversInRoute,
      desc: "Trabalhando no momento",
      trend: driversInRoute > 0 ? "↗" : "–"
    },
  ];
});

// Função para decidir a cor baseada no contexto e não apenas no símbolo
const getDescClass = (stat) => {
  if (stat.alert) return "text-red-500 font-bold";
  if (stat.trend === "↗" && stat.title !== "Manutenções") return "text-green-500";
  if (stat.trend === "↙") return "text-blue-500";
  return "text-gray-400";
};
</script>