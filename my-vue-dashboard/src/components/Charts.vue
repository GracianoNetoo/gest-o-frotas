<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Line Chart -->
      <div
        class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
      >
        <h2 class="text-lg font-semibold mb-4">Consumo de Combustível Mensal</h2>
        <Line
          :data="revenuChartData"
          :options="LineChartOptions"
          class="max-h-75"
          :key="lineChartKey"
        />
      </div>
      <!-- Add more charts here if needed -->
      <div class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5
      dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
      <h2 class="text-lg font-semibold mb-4">Distribuição de Veículos</h2>
      <Doughnut
          :data="doughnutChartData"
          :options="doughnutChartOptions"
          class="max-h-75"
          :key="doughnutChartKey"
        />
      </div>
    </div>
</template>
<script setup>
import { Line, Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, 
    CategoryScale, LinearScale, PointElement, ArcElement } from "chart.js";
import { ref, onMounted } from "vue";
ChartJS.register(
  Title, Tooltip, Legend, LineElement, 
  CategoryScale, LinearScale, PointElement, ArcElement
)
const lineChartKey = ref(0)
const doughnutChartKey = ref(0)


const revenuChartData = ref({
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
  ],
  datasets: [{
      label: "Litros de Combustível",
      data: [12000, 19000, 30000, 25000, 50000, 60000],
      fill: false,
      borderWidth: 2,
      borderColor: '#E82561',
      backgroundColor: '#E82561',
      tension: 0.6,
    }]
})
const doughnutChartData = ref({
  labels: [
    "Em Uso",
    "Disponível",
    "Manutenção",
  ],
  datasets: [{
      data: [82, 45, 12],
      backgroundColor: ['#463581', '#E82561', '#ECE852'],
      borderWidth: 0,
      hoverOffset: 10
    }]

})
const LineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  animations: {
        tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: false
        }
      },
      plugins:{
        legend: {
            labels: {
                color: '#9CA3AF' // Cor do texto da legenda
            }
          }
        },
        scales:{
            x:{
                grid:{
                    color: 'rgba(0,0,0,0.1)' // Cor das linhas do grid
                },
                ticks:{
                    color: '#64748b' // Cor dos ticks do eixo x
                }
            },
            y:{
                grid:{
                    color: 'rgba(0,0,0,0.1)' // Cor das linhas do grid
                },
                ticks:{
                    color: '#64748b' // Cor dos ticks do eixo y
                }
            }
        }
})

const doughnutChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  animations: {
        duration: 1000,
        easing: "easeOutQuart",
        animateScale: true,
        animateRotate: true
  },
  plugins:{
    legend: {
        position: 'right',
        labels: {
            boxWidth: 12,
            padding: 20,
            color: '#9CA3AF' // Cor do texto da legenda
        }
      },
      tooltip: {
        callbacks:{
          label: function(context) {
            return ` ${context.label}: ${context.raw}%`;
          }
        }
      }
    },
})

onMounted(() => {
  //Force re-enter of charts to trigger animantions
  lineChartKey.value ++;
  doughnutChartKey.value ++;
});
</script>
