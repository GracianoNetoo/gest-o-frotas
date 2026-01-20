<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
    <div
      v-for="(stat, index) in dynamicStats"
      :key="index"
      class="stats bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20 transition-all duration-300"
    >
      <div class="stat">
        <div class="stat-title text-sm opacity-70">{{ stat.title }}</div>
        <div class="stat-value text-3xl font-bold">{{ stat.value }}</div>
        <div
          class="stat-desc flex items-center gap-1 mt-1"
          :class="{
            'text-green-500': isPositive(stat.desc),
            'text-red-500': !isPositive(stat.desc),
          }"
        >
          {{ stat.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { fleetStore } from "../store/fleetStore"; 


const dynamicStats = computed(() => [
  {
    title: "Total de Veículos",
    value: fleetStore.totalVehicles,
    desc: "↗ 5% desde o mês passado"
  },
  {
    title: "Veículos em Uso",
    value: fleetStore.vehiclesInUse,
    desc: "↗ 8% desde o mês passado"
  },
  {
    title: "Manutenções Pendentes",
    value: fleetStore.pendingMaintenance,
    desc: "↙ 3% desde o mês passado"
  },
  {
    title: "Motoristas Ativos",
    value: fleetStore.activeDrivers,
    desc: "↗ 2% desde o mês passado"
  },
]);

const isPositive = (desc) => {
  return desc.includes("↗");
};
</script>