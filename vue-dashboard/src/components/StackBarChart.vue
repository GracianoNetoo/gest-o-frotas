<template>
  <div class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20 mb-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Frota por Categoria</h2>
      <div class="text-xs font-mono opacity-50">Snapshot em tempo real</div>
    </div>

    <div class="h-64">
      <Bar 
        v-if="totalVehicles > 0"
        :data="chartData" 
        :options="chartOptions" 
      />
      <div v-else class="h-full flex items-center justify-center opacity-40 italic text-sm">
        Aguardando dados da frota...
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import { fleetStore } from "../store/fleetStore";
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, 
  CategoryScale, LinearScale 
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const totalVehicles = computed(() => fleetStore.vehicles?.length || 0);

const categoryStats = computed(() => {
  const stats = { Caminhões: 0, Vans: 0, Carros: 0, Motocicletas: 0 };
  if (fleetStore.vehicles) {
    fleetStore.vehicles.forEach(v => {
      if (stats.hasOwnProperty(v.category)) stats[v.category]++;
    });
  }
  return stats;
});

const chartData = computed(() => ({
  // As labels agora ficam no eixo Y (vertical)
  labels: ["Caminhões", "Vans", "Carros", "Motocicletas"],
  datasets: [
    {
      label: "Quantidade",
      data: [
        categoryStats.value.Caminhões,
        categoryStats.value.Vans,
        categoryStats.value.Carros,
        categoryStats.value.Motocicletas
      ],
      // Cores sólidas e modernas
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)', // Azul
        'rgba(139, 92, 246, 0.8)', // Roxo
        'rgba(234, 179, 8, 0.8)',  // Amarelo
        'rgba(239, 68, 68, 0.8)'   // Vermelho
      ],
      borderRadius: 6,
      borderWidth: 0,
      barThickness: 25, // Controla a "espessura" da barra para não ficar gigante
    }
  ]
}));

const chartOptions = {
  indexAxis: 'y', // <--- ISTO TRANSFORMA EM HORIZONTAL
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Escondemos a legenda pois as labels já dizem tudo
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 12,
      callbacks: {
        label: (context) => ` ${context.raw} veículos`
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
      ticks: { 
        color: '#94a3b8',
        stepSize: 1,
        precision: 0
      }
    },
    y: {
      grid: { display: false },
      ticks: { 
        color: '#94a3b8',
        font: { weight: 'bold' }
      }
    }
  }
};
</script>