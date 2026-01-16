<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">Todas as Categorias</h2>
                <button @click="openAddModal" class="btn btn-primary btn-sm">
                    <Icon icon="line-md:plus-circle" class="w-5 h-5 mr-1"/>
                    Adicionar Categoria
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ícone</th>
                            <th>Total de Veículos</th>
                            <th>Em Uso</th>
                            <th>Disponível</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in categories" :key="index">
                            <td>
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold">{{ category.name }}</span>
                                </div>
                            </td>
                            <td>
                                <Icon :icon="category.icon" class="w-6 h-6 text-primary"/>
                            </td>
                            <td>
                                <span class="badge badge-neutral">{{ category.totalVehicles }}</span>
                            </td>
                            <td>
                                <span class="badge badge-success">{{ category.inUse }}</span>
                            </td>
                            <td>
                                <span class="badge badge-info">{{ category.available }}</span>
                            </td>
                            <td>
                                <span :class="`badge badge-${getStatusClass(category.status)}`">
                                    {{ category.status }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <button 
                                        @click="editCategory(index)" 
                                        class="btn btn-ghost btn-xs"
                                        title="Editar"
                                    >
                                        <Icon icon="line-md:edit" class="w-4 h-4"/>
                                    </button>
                                    <button 
                                        @click="deleteCategory(index)" 
                                        class="btn btn-ghost btn-xs text-error"
                                        title="Excluir"
                                    >
                                        <Icon icon="line-md:close" class="w-4 h-4"/>
                                    </button>
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
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const categories = ref([
    { 
        name: 'Caminhões', 
        icon: 'line-md:truck',
        totalVehicles: 58,
        inUse: 45,
        available: 10,
        status: 'Ativa'
    },
    { 
        name: 'Vans', 
        icon: 'line-md:van',
        totalVehicles: 42,
        inUse: 32,
        available: 8,
        status: 'Ativa'
    },
    { 
        name: 'Carros', 
        icon: 'line-md:car',
        totalVehicles: 35,
        inUse: 28,
        available: 5,
        status: 'Ativa'
    },
    { 
        name: 'Motocicletas', 
        icon: 'line-md:bike',
        totalVehicles: 21,
        inUse: 18,
        available: 3,
        status: 'Ativa'
    },
]);

function getStatusClass(status) {
    const statusMap = {
        'Ativa': 'success',
        'Inativa': 'error',
        'Pendente': 'warning'
    };
    return statusMap[status] || 'info';
}

const openAddModal = () => {
    console.log('Abrir modal para adicionar categoria...');
    // Aqui você pode implementar um modal para adicionar nova categoria
};

const editCategory = (index) => {
    console.log('Editar categoria:', categories.value[index]);
    // Aqui você pode implementar a edição da categoria
};

const deleteCategory = (index) => {
    if (confirm(`Tem certeza que deseja excluir a categoria "${categories.value[index].name}"?`)) {
        categories.value.splice(index, 1);
        console.log('Categoria excluída');
    }
};
</script>