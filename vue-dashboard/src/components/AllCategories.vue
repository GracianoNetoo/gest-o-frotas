<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">Monitoramento por Categoria</h2>
                <div class="text-xs opacity-50">Atualizado em tempo real</div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ícone</th>
                            <th>Total</th>
                            <th>Em Uso</th>
                            <th>Disponível</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in categories" :key="index" class="hover:bg-base-200/50 transition-colors">
                            <td><span class="font-semibold">{{ category.name }}</span></td>
                            <td><Icon :icon="category.icon" class="w-6 h-6 text-primary"/></td>
                            <td><span class="badge badge-neutral">{{ category.totalVehicles }}</span></td>
                            <td><span class="badge badge-success">{{ category.inUse }}</span></td>
                            <td><span class="badge badge-info">{{ category.available }}</span></td>
                            <td>
                                <span :class="`badge badge-${getStatusClass(category.status)}`">
                                    {{ category.status }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <button @click="editCategory(index)" class="btn btn-ghost btn-xs"><Icon icon="line-md:edit"/></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore'; // Importando a fonte da verdade
import { onMounted } from 'vue';

onMounted(() => {
    console.log("--- DEBUG CATEGORIAS ---");
    console.log("A Store foi carregada?", !!fleetStore);
    console.log("Dados atuais na Store:", fleetStore.vehicles);
});
// 1. Definimos as categorias base e seus ícones
const categoryConfig = [
    { name: 'Caminhões', icon: 'line-md:truck' },
    { name: 'Vans', icon: 'line-md:van' },
    { name: 'Carros', icon: 'line-md:car' },
    { name: 'Motocicletas', icon: 'line-md:bike' }
];

// AllCategories.vue

const categories = computed(() => {
    // Referenciamos fleetStore.vehicles diretamente aqui
    const data = fleetStore.vehicles; 
    
    console.log("Calculando categorias para:", data.length, "veículos");

    return categoryConfig.map(config => {
        const vehiclesInCategory = data.filter(v => v.category === config.name);
        
        return {
            name: config.name,
            icon: config.icon,
            totalVehicles: vehiclesInCategory.length,
            inUse: vehiclesInCategory.filter(v => v.status === 'Em Uso').length,
            available: vehiclesInCategory.filter(v => v.status === 'Disponível').length,
            status: vehiclesInCategory.length > 0 ? 'Ativa' : 'Inativa'
        };
    });
});

function getStatusClass(status) {
    const statusMap = {
        'Ativa': 'success',
        'Inativa': 'error',
        'Pendente': 'warning'
    };
    return statusMap[status] || 'info';
}

// Funções de ação (Logica de UI)
const openAddModal = () => console.log('Abrir modal...');
const editCategory = (index) => console.log('Editar:', categories.value[index].name);
const deleteCategory = (index) => {
    alert("Para excluir uma categoria, remova primeiro os veículos vinculados a ela.");
    console.log("Categorias Calculadas:", categories.value);
    console.log("Veículos na Store:", fleetStore.vehicles);
};
// Adicione isso temporariamente para ver se os dados aparecem no console
</script>