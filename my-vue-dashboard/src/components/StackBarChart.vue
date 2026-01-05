<template>
    <div class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20 mb-6">
        <h2 class="text-lg font-semibold mb-4">Distribuição de Veículos por Categoria</h2>
        <Bar
          :data="stackedBarData"
          :options="stackedBarOptions"
          class="max-h-100"
        />
    </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { ref } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement,
CategoryScale, LinearScale } from "chart.js";
ChartJS.register(
  Title, Tooltip, Legend, BarElement,
  CategoryScale, LinearScale
)

const stackedBarData = ref({
  labels: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
  ],
  datasets: [
    {
      label: "Caminhões",
      data: [45, 48, 52, 50, 55, 58],
      backgroundColor: '#E82561',
      stack: 'Stack 0'
    },
    {
      label: "Vans",
      data: [32, 35, 38, 36, 40, 42],
      backgroundColor: '#463581',
      stack: 'Stack 1'
    },
    {
      label: "Carros",
      data: [28, 30, 32, 31, 33, 35],
      backgroundColor: '#ECE852',
      stack: 'Stack 2'
    }
  ]
})

const stackedBarOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
      plugins:{
        title: {
          display: false,
        },
        legend: {
          position: 'top',
          labels: {
            color: '#64748b', // Cor dos textos da legenda
            boxWidth: 12,
            padding: 16,
            usePointStyle: true,
          }
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = Math.round((context.raw/total)* 100)
              return `Participação: ${percentage}%`
            }
          }
        }
      },
        scales:{
            x:{
                stacked:true,
                grid:{
                    display: false
                },
                ticks:{
                    color: '#64748b' // Cor dos ticks do eixo x
                }
            },
            y:{
                stacked:true,
                grid:{
                    color: 'rgba(0,0,0,0.05)' // Cor das linhas do grid
                },
                ticks:{
                    color: '#64748b',
                    callback: function(value){
                        return value.toLocaleString() + ' veículos'
                    }
                }
            }
        }
})

</script>