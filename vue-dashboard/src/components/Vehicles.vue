<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">Todos os Veículos</h2>
                <button @click="navigateToAdd" class="btn btn-primary btn-sm">
                    <Icon icon="line-md:plus-circle" class="w-5 h-5 mr-1"/>
                    Adicionar Veículo
                </button>
            </div>

            <!-- Filtros -->
            <div class="flex flex-wrap gap-4 mb-4">
                <div class="form-control">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Buscar por placa, modelo ou motorista..."
                        class="input input-bordered w-full max-w-xs dark:bg-white/5 dark:border-white/10"
                    />
                </div>
                <select
                    v-model="statusFilter"
                    class="select select-bordered dark:bg-white/5 dark:border-white/10"
                >
                    <option value="">Todos os Status</option>
                    <option value="Em Uso">Em Uso</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Indisponível">Indisponível</option>
                </select>
                <select
                    v-model="categoryFilter"
                    class="select select-bordered dark:bg-white/5 dark:border-white/10"
                >
                    <option value="">Todas as Categorias</option>
                    <option value="Caminhões">Caminhões</option>
                    <option value="Vans">Vans</option>
                    <option value="Carros">Carros</option>
                    <option value="Motocicletas">Motocicletas</option>
                </select>
            </div>

            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Categoria</th>
                            <th>Motorista</th>
                            <th>Ano</th>
                            <th>Status</th>
                            <th>Última Manutenção</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, index) in filteredVehicles" :key="index">
                            <td>
                                <div class="flex items-center gap-2">
                                    <Icon icon="line-md:car" class="w-5 h-5 text-primary"/>
                                    <span class="font-semibold">{{ vehicle.plate }}</span>
                                </div>
                            </td>
                            <td>{{ vehicle.model }}</td>
                            <td>
                                <span class="badge badge-outline">{{ vehicle.category }}</span>
                            </td>
                            <td>{{ vehicle.driver || 'Sem motorista' }}</td>
                            <td>{{ vehicle.year }}</td>
                            <td>
                                <span :class="`badge badge-${getStatusClass(vehicle.status)}`">
                                    {{ vehicle.status }}
                                </span>
                            </td>
                            <td>{{ formatDate(vehicle.lastMaintenance) }}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button
                                        @click="editVehicle(index)"
                                        class="btn btn-ghost btn-xs"
                                        title="Editar"
                                    >
                                        <Icon icon="line-md:edit" class="w-4 h-4"/>
                                    </button>
                                    <button
                                        @click="viewDetails(index)"
                                        class="btn btn-ghost btn-xs"
                                        title="Detalhes"
                                    >
                                        <Icon icon="line-md:eye" class="w-4 h-4"/>
                                    </button>
                                    <button
                                        @click="deleteVehicle(index)"
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

            <!-- Paginação -->
            <div class="flex justify-center mt-6">
                <div class="join">
                    <button class="join-item btn btn-sm" @click="currentPage = Math.max(1, currentPage - 1)">
                        <Icon icon="line-md:chevron-left" class="w-4 h-4"/>
                    </button>
                    <button class="join-item btn btn-sm">Página {{ currentPage }}</button>
                    <button class="join-item btn btn-sm" @click="currentPage = Math.min(totalPages, currentPage + 1)">
                        <Icon icon="line-md:chevron-right" class="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits(['navigate']);

const searchQuery = ref('');
const statusFilter = ref('');
const categoryFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const vehicles = ref([
    { plate: 'ABC-1234', model: 'Ford Ranger', category: 'Caminhões', driver: 'João Silva', year: 2022, status: 'Em Uso', lastMaintenance: '2024-01-15' },
    { plate: 'XYZ-5678', model: 'Volkswagen Amarok', category: 'Caminhões', driver: 'Maria Santos', year: 2021, status: 'Disponível', lastMaintenance: '2024-01-20' },
    { plate: 'DEF-9012', model: 'Toyota Hilux', category: 'Caminhões', driver: 'Pedro Costa', year: 2023, status: 'Manutenção', lastMaintenance: '2024-01-10' },
    { plate: 'GHI-3456', model: 'Chevrolet S10', category: 'Caminhões', driver: 'Ana Oliveira', year: 2022, status: 'Em Uso', lastMaintenance: '2024-01-18' },
    { plate: 'JKL-7890', model: 'Fiat Ducato', category: 'Vans', driver: 'Carlos Mendes', year: 2021, status: 'Disponível', lastMaintenance: '2024-01-12' },
    { plate: 'MNO-2468', model: 'Mercedes Sprinter', category: 'Vans', driver: 'Fernanda Lima', year: 2023, status: 'Em Uso', lastMaintenance: '2024-01-22' },
    { plate: 'PQR-1357', model: 'Honda Civic', category: 'Carros', driver: 'Roberto Alves', year: 2022, status: 'Disponível', lastMaintenance: '2024-01-14' },
    { plate: 'STU-9753', model: 'Yamaha Fazer', category: 'Motocicletas', driver: 'Lucas Souza', year: 2023, status: 'Em Uso', lastMaintenance: '2024-01-19' },
    { plate: 'VWX-8642', model: 'Ford Transit', category: 'Vans', driver: null, year: 2021, status: 'Disponível', lastMaintenance: '2024-01-16' },
    { plate: 'YZA-7410', model: 'Toyota Corolla', category: 'Carros', driver: 'Patricia Rocha', year: 2022, status: 'Em Uso', lastMaintenance: '2024-01-21' },
]);

const filteredVehicles = computed(() => {
    let filtered = vehicles.value;

    // Filtro de busca
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(v =>
            v.plate.toLowerCase().includes(query) ||
            v.model.toLowerCase().includes(query) ||
            (v.driver && v.driver.toLowerCase().includes(query))
        );
    }

    // Filtro de status
    if (statusFilter.value) {
        filtered = filtered.filter(v => v.status === statusFilter.value);
    }

    // Filtro de categoria
    if (categoryFilter.value) {
        filtered = filtered.filter(v => v.category === categoryFilter.value);
    }

    // Paginação
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filtered.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(vehicles.value.length / itemsPerPage);
});

function getStatusClass(status) {
    const statusMap = {
        'Em Uso': 'success',
        'Disponível': 'info',
        'Manutenção': 'warning',
        'Indisponível': 'error'
    };
    return statusMap[status] || 'info';
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const navigateToAdd = () => {
    console.log('Navegar para adicionar veículo...');
    // Emitir evento ou usar router
    emit('navigate', 'add-vehicle');
};

const editVehicle = (index) => {
    console.log('Editar veículo:', vehicles.value[index]);
};

const viewDetails = (index) => {
    console.log('Ver detalhes do veículo:', vehicles.value[index]);
};

const deleteVehicle = (index) => {
    const vehicle = vehicles.value[index];
    if (confirm(`Tem certeza que deseja excluir o veículo "${vehicle.plate}"?`)) {
        vehicles.value.splice(index, 1);
        console.log('Veículo excluído');
    }
};
</script>

