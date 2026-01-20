<template>
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold dark:text-white">Central de Relatórios</h2>
            <p class="text-sm opacity-60">Análise de desempenho e histórico da frota</p>
        </div>
        <button @click="generateFullPDF" class="btn btn-outline btn-sm gap-2">
            <Icon icon="mdi:file-export" /> Exportar Tudo (PDF)
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div @click="$emit('navigate', 'routes')" 
             class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:scale-105 border border-transparent hover:border-primary transition-all group">
            <div class="card-body items-center text-center relative">
                <div class="badge badge-primary absolute top-4 right-4">{{ activeRoutesCount }}</div>
                <Icon icon="mdi:map-marker-distance" class="text-4xl text-primary group-hover:scale-110 transition-transform" />
                <h2 class="card-title">Rotas Ativas</h2>
                <p class="text-xs text-gray-500">Monitorização em tempo real</p>
            </div>
        </div>

        <div @click="$emit('navigate', 'fuel')" 
             class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:scale-105 border border-transparent hover:border-secondary transition-all group">
            <div class="card-body items-center text-center relative">
                <div class="badge badge-secondary absolute top-4 right-4">{{ fleetAverageKmL }} km/L</div>
                <Icon icon="mdi:gas-station" class="text-4xl text-secondary group-hover:scale-110 transition-transform" />
                <h2 class="card-title">Consumo</h2>
                <p class="text-xs text-gray-500">Eficiência média da frota</p>
            </div>
        </div>

        <div @click="$emit('navigate', 'maintenance')" 
             class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:scale-105 border border-transparent hover:border-success transition-all group">
            <div class="card-body items-center text-center relative">
                <div class="badge badge-success text-white absolute top-4 right-4">KZ {{ totalMaintenanceCost }}</div>
                <Icon icon="mdi:history" class="text-4xl text-success group-hover:scale-110 transition-transform" />
                <h2 class="card-title">Manutenções</h2>
                <p class="text-xs text-gray-500">Custo total acumulado</p>
            </div>
        </div>
    </div>

    <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
        <div class="p-6">
            <h3 class="font-bold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Icon icon="mdi:chart-box" class="text-primary" />
                Resumo Operacional Atual
            </h3>
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div class="stat p-2 shadow-none border-r border-base-200 dark:border-gray-700">
                    <div class="stat-title text-[10px] uppercase font-bold">Frota Total</div>
                    <div class="stat-value text-2xl">{{ fleetStore.vehicles.length }}</div>
                </div>
                <div class="stat p-2 shadow-none border-r border-base-200 dark:border-gray-700">
                    <div class="stat-title text-[10px] uppercase font-bold text-primary">Em Rota</div>
                    <div class="stat-value text-2xl text-primary">{{ activeRoutesCount }}</div>
                </div>
                <div class="stat p-2 shadow-none border-r border-base-200 dark:border-gray-700">
                    <div class="stat-title text-[10px] uppercase font-bold">Motoristas</div>
                    <div class="stat-value text-2xl">{{ fleetStore.drivers.length }}</div>
                </div>
                <div class="stat p-2 shadow-none border-r border-base-200 dark:border-gray-700">
                    <div class="stat-title text-[10px] uppercase font-bold text-warning">Manutenção</div>
                    <div class="stat-value text-2xl text-warning">{{ vehiclesInMaintenance }}</div>
                </div>
                <div class="stat p-2 shadow-none">
                    <div class="stat-title text-[10px] uppercase font-bold text-success">Disponíveis</div>
                    <div class="stat-value text-2xl text-success">{{ vehiclesAvailable }}</div>
                </div>
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

// 1. Contador de Rotas Ativas (Certifique-se de que o status é exatamente 'Em Execução')
const activeRoutesCount = computed(() =>
    (fleetStore.routes || []).filter(r => r.status === 'Em Execução').length
);

// 2. Média Global (Simulada)
const fleetAverageKmL = computed(() => 4.2);

// 3. Custos de Manutenção
const totalMaintenanceCost = computed(() => {
    const total = (fleetStore.maintenances || [])
        .filter(m => m.status === 'Concluída')
        .reduce((sum, m) => sum + parseFloat(m.estimatedCost || 0), 0);
    return total.toLocaleString('pt-BR');
});

// 4. Status dos Veículos (Atenção ao status 'Em Uso')
const vehiclesInMaintenance = computed(() =>
    (fleetStore.vehicles || []).filter(v => v.status === 'Manutenção').length
);

const vehiclesAvailable = computed(() =>
    (fleetStore.vehicles || []).filter(v => v.status === 'Disponível').length
);

const generateFullPDF = () => {
    alert("Gerando relatório consolidado em PDF...");
};
</script>