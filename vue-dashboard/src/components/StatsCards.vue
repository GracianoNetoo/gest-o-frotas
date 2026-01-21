<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
    <div
      v-for="(stat, index) in dynamicStats"
      :key="index"
      class="stats bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20 transition-all duration-300 border border-base-200"
    >
      <div class="stat p-4">
        <div class="stat-title text-sm opacity-70">{{ stat.title }}</div>
        <div class="stat-value text-3xl font-bold text-gray-800 dark:text-white">
          {{ stat.value }}
        </div>
        <div
          class="stat-desc flex items-center gap-1 mt-1 font-medium"
          :class="getDescClass(stat)"
        >
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
  // 1. Veículos em Uso (Lê 'Em Uso' do seu formulário ou 'Em Rota' do sistema)
  const inUse = (fleetStore.vehicles || []).filter(v => 
    v.status === 'Em Uso' || v.status === 'Em Rota'
  ).length;
  
  // 2. Manutenções Pendentes (Status 'Agendada')
  const pending = (fleetStore.maintenances || []).filter(m => m.status === 'Agendada').length;

  // 3. Motoristas Ativos (Quem está em rotas 'Em Execução')
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
      trend: "", // Neutro
      type: 'neutral'
    },
    {
      title: "Veículos em Uso",
      value: inUse,
      desc: inUse > 0 ? "Em operação agora" : "Frota disponível",
      trend: inUse > 0 ? "↗" : "–"
    },
    {
      title: "Manutenções",
      value: pending,
      desc: pending > 0 ? "Aguardando oficina" : "Tudo em dia",
      trend: pending > 2 ? "↗" : "↙",
      alert: pending > 3 // Alerta vermelho se houver mais de 3
    },
    {
      title: "Motoristas Ativos",
      value: driversInRoute,
      desc: "Em rotas oficiais",
      trend: driversInRoute > 0 ? "↗" : "–"
    },
  ];
});

// FUNÇÃO CORRIGIDA: Agora o Template consegue ler esta função
const getDescClass = (stat) => {
  if (stat.alert) return "text-red-500 font-bold";

  // Se a tendência é subir e NÃO é manutenção, é bom (Verde)
  if (stat.trend === "↗" && stat.title !== "Manutenções") return "text-green-500";

  // Se manutenção está a descer, é bom (Azul/Verde)
  if (stat.trend === "↙" && stat.title === "Manutenções") return "text-green-500";

  // Se está a descer em outros casos
  if (stat.trend === "↙") return "text-blue-500";

  return "text-gray-400 opacity-80";
};
</script>