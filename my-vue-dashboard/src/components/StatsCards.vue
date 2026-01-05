<template>
  <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-5 mb-4">
    <div
      v-for="(stat, index) in statsData"
      :key="index"
      class="stats bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
    >
      <div class="stat">
        <div class="stat-title">{{ stat.title }}</div>
        <div class="stat-value">{{ stat.value }}</div>
        <div
          class="stat-desc"
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
import { ref } from "vue";
const statsData = ref([
  { title: "Total de Veículos", value: "156", desc: "↗ 5% desde o mês passado" },
  { title: "Veículos em Uso", value: "128", desc: "↗ 8% desde o mês passado" },
  { title: "Manutenções Pendentes", value: "12", desc: "↙ 3% desde o mês passado" },
  { title: "Motoristas Ativos", value: "89", desc: "↗ 2% desde o mês passado" },
]);

const isPositive = (desc) => {
  return desc.includes("↗");
};
</script>
