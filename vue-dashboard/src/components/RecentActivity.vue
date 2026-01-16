<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
        <div class="card-body">
            <h2 class="card-title">Atividade Recente</h2>
            <ul class="timeline timeline-vertical">
                <li v-for="(activity, index) in recentActivities" :key="index">
                    <template v-if="index % 2 === 0">
                        <div class="timeline-start timeline-box bg-white dark:bg-backgroundDark p-3 rounded-lg">
                            <div class="flex items-center gap-2 mb-1">
                                <Icon :icon="activity.icon" class="w-4 h-4 text-primary"/>
                                <span class="text-sm font-semibold">{{ activity.type }}</span>
                            </div>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
                        </div>
                        <div class="timeline-middle">
                            <Icon icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                            class="w-5 h-5 text-primary"/>
                        </div>
                        <hr class="bg-primary"/>
                    </template>
                    <template v-else>
                        <hr class="bg-primary"/>
                        <div class="timeline-middle">
                            <Icon icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                            class="w-5 h-5 text-primary"/>
                        </div>
                        <div class="timeline-start timeline-box bg-white dark:bg-backgroundDark p-3 rounded-lg">
                            <div class="flex items-center gap-2 mb-1">
                                <Icon :icon="activity.icon" class="w-4 h-4 text-primary"/>
                                <span class="text-sm font-semibold">{{ activity.type }}</span>
                            </div>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const recentActivities = ref([
    { type: 'Veículo ABC-1234 saiu para rota', time: 'Hoje às 08:30', icon: 'line-md:car' },
    { type: 'Manutenção agendada para XYZ-5678', time: 'Hoje às 09:15', icon: 'line-md:wrench' },
    { type: 'Novo motorista cadastrado', time: 'Hoje às 10:00', icon: 'line-md:account' },
    { type: 'Veículo DEF-9012 retornou da rota', time: 'Hoje às 14:20', icon: 'line-md:car' },
    { type: 'Abastecimento registrado - GHI-3456', time: 'Hoje às 16:45', icon: 'line-md:gas-station' },
]);
</script>