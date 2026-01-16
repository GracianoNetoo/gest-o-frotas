<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/50">
        <div class="card-body">
            <h2 class="card-title">Veículos Recentes</h2>
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Motorista</th>
                            <th>Status</th>
                            <th>Última Manutenção</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, index) in recentVehicles" :key="index">
                            <td>{{ vehicle.plate }}</td>
                            <td>{{ vehicle.model }}</td>
                            <td>{{ vehicle.driver }}</td>
                            <td>
                                <span :class="`badge badge-${getStatusClass(vehicle.status)}`">
                                    {{ vehicle.status }}
                                </span>
                            </td>
                            <td>{{ formatDate(vehicle.lastMaintenance) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-actions justify-start mt-6">
                    <button @click="viewAllVehicles" class="btn bg-blue-500 hover:bg-blue-900 text-white">
                        Ver Todos os Veículos
                        <Icon icon="line-md:arrow-right" class="w-4 h-4 ml-1"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const recentVehicles = ref([
    { plate: 'ABC-1234', model: 'Ford Ranger', driver: 'João Silva', status: 'Em Uso', lastMaintenance: '2024-01-15' },
    { plate: 'XYZ-5678', model: 'Volkswagen Amarok', driver: 'Maria Santos', status: 'Disponível', lastMaintenance: '2024-01-20' },
    { plate: 'DEF-9012', model: 'Toyota Hilux', driver: 'Pedro Costa', status: 'Manutenção', lastMaintenance: '2024-01-10' },
    { plate: 'GHI-3456', model: 'Chevrolet S10', driver: 'Ana Oliveira', status: 'Em Uso', lastMaintenance: '2024-01-18' },
])

function getStatusClass(status){
    const statusMap = {
        'Em Uso': 'success',
        'Disponível': 'info',
        'Manutenção': 'warning',
        'Indisponível': 'error'
    }
    return statusMap[status] || 'info';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const viewAllVehicles = () => {
    // Função para navegar para a página de todos os veículos
    console.log('Navegando para ver todos os veículos...');
    // Aqui você pode adicionar a navegação usando Vue Router se estiver configurado
    // router.push('/vehicles');
};
</script>