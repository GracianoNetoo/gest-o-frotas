<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">Todos os Veículos</h2>
                <button @click="navigateToAdd" class="btn btn-primary btn-sm">
                    <Icon icon="line-md:plus-circle" class="w-5 h-5 mr-1"/>
                    Adicionar Veículo
                </button>
            </div>

            <div class="flex flex-wrap gap-4 mb-4">
                <div class="form-control">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Buscar por placa, modelo..."
                        class="input input-bordered w-full max-w-xs dark:bg-white/5 dark:border-white/10"
                    />
                </div>
                <select v-model="statusFilter" class="select select-bordered dark:bg-white/5 dark:border-white/10">
                    <option value="">Todos os Status</option>
                    <option value="Em Uso">Em Uso</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Manutenção">Manutenção</option>
                </select>
                <select v-model="categoryFilter" class="select select-bordered dark:bg-white/5 dark:border-white/10">
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(vehicle, index) in filteredVehicles" :key="vehicle.plate" class="hover:bg-base-200/50">
                            <td>
                                <div class="flex items-center gap-2">
                                    <Icon icon="line-md:car" class="w-5 h-5 text-primary"/>
                                    <span class="font-semibold">{{ vehicle.plate }}</span>
                                </div>
                            </td>
                            <td>{{ vehicle.model }}</td>
                            <td><span class="badge badge-outline">{{ vehicle.category }}</span></td>
                            <td>{{ vehicle.driver || 'Sem motorista' }}</td>
                            <td>{{ vehicle.year }}</td>
                            <td>
                                <span :class="`badge badge-${getStatusClass(vehicle.status)}`">
                                    {{ vehicle.status }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <button @click="editVehicle(index)" class="btn btn-ghost btn-xs" title="Editar">
                                        <Icon icon="line-md:edit" class="w-4 h-4"/>
                                    </button>
                                    <button @click="deleteVehicle(vehicle)" class="btn btn-ghost btn-xs text-error" title="Excluir">
                                        <Icon icon="line-md:close" class="w-4 h-4"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredVehicles.length === 0">
                            <td colspan="7" class="text-center py-10 opacity-50">Nenhum veículo encontrado.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center mt-6">
                <div class="join">
                    <button class="join-item btn btn-sm" @click="currentPage = Math.max(1, currentPage - 1)">«</button>
                    <button class="join-item btn btn-sm">Página {{ currentPage }}</button>
                    <button class="join-item btn btn-sm" @click="currentPage = currentPage + 1">»</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const emit = defineEmits(['navigate']);

const searchQuery = ref('');
const statusFilter = ref('');
const categoryFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredVehicles = computed(() => {
    let filtered = fleetStore.vehicles || [];

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(v =>
            v.plate.toLowerCase().includes(query) ||
            v.model.toLowerCase().includes(query) ||
            (v.driver && v.driver.toLowerCase().includes(query))
        );
    }

    if (statusFilter.value) {
        filtered = filtered.filter(v => v.status === statusFilter.value);
    }

    if (categoryFilter.value) {
        filtered = filtered.filter(v => v.category === categoryFilter.value);
    }

    const start = (currentPage.value - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(fleetStore.vehicles.length / itemsPerPage));

function getStatusClass(status) {
    const map = { 'Em Uso': 'success', 'Disponível': 'info', 'Manutenção': 'warning', 'Indisponível': 'error' };
    return map[status] || 'neutral';
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '---';

const navigateToAdd = () => emit('navigate', 'add-vehicle');
const editVehicle = (idx) => console.log('Editar:', filteredVehicles.value[idx]);

const deleteVehicle = (vehicle) => {
    if (confirm(`Excluir veículo ${vehicle.plate}?`)) {
        const idx = fleetStore.vehicles.findIndex(v => v.plate === vehicle.plate);
        if (idx !== -1) {
            fleetStore.vehicles.splice(idx, 1);
            fleetStore.saveToStorage();
        }
    }
};
</script>