<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
        <div class="card-body">
            <h2 class="card-title">Atividade Recente</h2>
            <ul class="timeline timeline-vertical">
                <li v-for="(activity, index) in recentActivities" :key="index">
                    <template v-if="index % 2 === 0">
                        <div class="timeline-start timeline-box bg-white dark:bg-backgroundDark">
                            {{ activity.type }}        
                        </div>
                        <div class="timeline-middle">
                            <icon icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                            class="w-5 h-5 text-primary"/>
                        </div>
                        <hr class="bg-primary"/>
                    </template>
                    <template v-else>
                        <hr class="bg-primary"/>
                        <div class="timeline-middle">
                            <icon icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                            class="w-5 h-5 text-primary"/>
                        </div>
                        <div class="timeline-start timeline-box bg-white dark:bg-backgroundDark">
                            {{ activity.type }}        
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const recentActivities = ref([
    { type: 'Veículo ABC-1234 saiu para rota', time: '08:30', icon: 'check' },
    { type: 'Manutenção agendada para XYZ-5678', time: '09:15', icon: 'check' },
    { type: 'Novo motorista cadastrado', time: '10:00', icon: 'check' },
    { type: 'Veículo DEF-9012 retornou da rota', time: '14:20', icon: 'check' },
    { type: 'Abastecimento registrado - GHI-3456', time: '16:45', icon: 'check' },
]);
</script>