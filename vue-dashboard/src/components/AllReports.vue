<template>
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold dark:text-white">Central de Relatórios</h2>
        <button class="btn btn-outline btn-sm">
            <Icon icon="mdi:file-export" /> Exportar Tudo (PDF)
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div @click="$emit('navigate', 'fleet-routes')" class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:border-primary border border-transparent transition-all">
            <div class="card-body items-center text-center">
                <Icon icon="mdi:map-marker-distance" class="text-4xl text-primary" />
                <h2 class="card-title">Rotas Ativas</h2>
                <p class="text-xs text-gray-500">Monitorização em tempo real</p>
            </div>
        </div>
        <div @click="$emit('navigate', 'fuel-consumption')" class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:border-secondary border border-transparent transition-all">
            <div class="card-body items-center text-center">
                <Icon icon="mdi:gas-station" class="text-4xl text-secondary" />
                <h2 class="card-title">Consumo</h2>
                <p class="text-xs text-gray-500">Análise de eficiência (km/L)</p>
            </div>
        </div>
        <div @click="$emit('navigate', 'maintenancehistory')" class="card bg-base-100 dark:bg-white/5 shadow-xl cursor-pointer hover:border-success border border-transparent transition-all"><div class="card-body items-center text-center">
            <Icon icon="mdi:history" class="text-4xl text-success" />
            <h2 class="card-title">Histórico</h2>
            <p class="text-xs text-gray-500">Registo de manutenções</p>
        </div>
    </div>
</div>

    <div class="card bg-base-100 dark:bg-white/5 shadow-xl p-6 text-center">
        <p class="text-gray-500 dark:text-gray-400">Selecione uma categoria acima para ver os detalhes detalhados.</p>
    </div>
</div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineEmits(['navigate']);
</script>