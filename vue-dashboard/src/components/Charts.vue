<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-center md:text-left">
        Despesas de Manutenção (KZ)
      </h2>
      <div class="h-72">
        <Line :data="lineData" :options="lineOptions" />
      </div>
    </div>

    <div class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-center md:text-left">
        Status da Frota
      </h2>
      <div class="h-72">
        <Doughnut v-if="hasVehicles" :data="doughnutData" :options="doughnutOptions" />
        <div v-else class="h-full flex items-center justify-center opacity-50 italic">
          Nenhum veículo para monitorar.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Line, Doughnut } from "vue-chartjs";
import { fleetStore } from "../store/fleetStore";
import { 
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
  CategoryScale, LinearScale, PointElement, ArcElement, Filler 
} from "chart.js";

ChartJS.register(
  Title, Tooltip, Legend, LineElement, 
  CategoryScale, LinearScale, PointElement, ArcElement, Filler
);

// --- LÓGICA DO GRÁFICO DE LINHA (MANUTENÇÃO) ---
const lineData = computed(() => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const monthlyCosts = new Array(6).fill(0);

  // Filtra manutenções concluídas nos últimos 6 meses
  (fleetStore.maintenances || []).forEach(m => {
    if (m.status === 'Concluída' && m.finishedAt) {
      const date = new Date(m.finishedAt);
      const monthIndex = date.getMonth();
      if (monthIndex < 6) monthlyCosts[monthIndex] += Number(m.estimatedCost || 0);
    }
  });

  return {
    labels: months,
    datasets: [{
      label: "Gastos (KZ)",
      data: monthlyCosts,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4
    }]
  };
});

// --- LÓGICA DO GRÁFICO DE ROSCA (STATUS) ---
const hasVehicles = computed(() => fleetStore.vehicles?.length > 0);

const doughnutData = computed(() => {
  const stats = { 'Em Uso': 0, 'Disponível': 0, 'Manutenção': 0 };
  
  (fleetStore.vehicles || []).forEach(v => {
    if (stats.hasOwnProperty(v.status)) stats[v.status]++;
    else if (v.status === 'Em Rota') stats['Em Uso']++;
  });

  return {
    labels: Object.keys(stats),
    datasets: [{
      data: Object.values(stats),
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 15
    }]
  };
});

// --- OPÇÕES DOS GRÁFICOS ---
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: '#9CA3AF' } },
    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: { position: 'bottom', labels: { color: '#9CA3AF', usePointStyle: true, padding: 20 } },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.raw} veículos`
      }
    }
  }
};
</script>