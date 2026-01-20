<template>
    <div class="card bg-base-100 shadow-xl dark:bg-white/5 dark:backdrop-blur-md dark:border-white/20">
        <div class="card-body">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h2 class="card-title text-2xl font-bold dark:text-white">Motoristas Cadastrados</h2>
                    <p class="text-sm opacity-60">Gestão de condutores e documentos</p>
                </div>
                
                <div class="flex gap-2 w-full md:w-auto">
                    <div class="relative w-full">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Buscar por nome ou NIF..."
                            class="input input-bordered w-full pl-10 dark:bg-white/5 dark:border-white/10"
                        />
                        <Icon icon="line-md:search" class="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    </div>
                    <button @click="$emit('navigate', 'add-driver')" class="btn btn-primary">
                        <Icon icon="line-md:plus-circle" class="w-5 h-5 mr-1" />
                        Novo
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead class="bg-base-200 dark:bg-white/5 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th>Motorista</th>
                            <th>Identificação / Categoria</th>
                            <th>Validade Licença</th>
                            <th>Status</th>
                            <th class="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-base-200 dark:divide-white/10">
                        <tr v-for="driver in filteredDrivers" :key="driver.id" class="hover:bg-base-200/40 dark:hover:bg-white/5 transition-colors">
                            <td class="py-4">
                                <div class="flex items-center gap-3">
                                    <div class="avatar placeholder">
                                        <div class="bg-primary text-primary-content rounded-full w-10">
                                            <span class="text-lg">{{ driver.name.charAt(0) }}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold dark:text-white">{{ driver.name }}</div>
                                        <div class="text-xs opacity-50">{{ driver.phone || 'Sem telefone' }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="text-sm font-medium">{{ driver.nif }}</div>
                                <div class="badge badge-ghost badge-xs">{{ driver.category }}</div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <span class="text-sm">{{ formatDate(driver.licenseExpiry) }}</span>
                                    <progress 
                                        class="progress w-20" 
                                        :class="getExpiryProgressClass(driver.licenseExpiry)" 
                                        :value="getDaysRemaining(driver.licenseExpiry)" 
                                        max="365">
                                    </progress>
                                </div>
                            </td>
                            <td>
                                <span :class="statusClass(driver.status)" class="badge border-none py-3 px-4 font-semibold">
                                    {{ driver.status }}
                                </span>
                            </td>
                            <td>
                                <div class="flex justify-center gap-2">
                                    <button @click="deleteDriver(driver)" class="btn btn-ghost btn-xs text-error">
                                        <Icon icon="line-md:close-circle" class="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredDrivers.length === 0">
                            <td colspan="5" class="text-center py-10 opacity-50">Nenhum motorista encontrado.</td>
                        </tr>
                    </tbody>
                </table>
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

// Lógica de busca usando a Store Real
const filteredDrivers = computed(() => {
    const data = fleetStore.drivers || [];
    return data.filter(d => 
        d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        d.nif.includes(searchQuery.value)
    );
});

// Estilização baseada no status da licença e disponibilidade
const statusClass = (status) => {
    switch (status) {
        case 'Ativa': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
        case 'Alerta': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
        case 'Vencida': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
        default: return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400';
    }
};

const formatDate = (date) => date ? new Date(date).toLocaleDateString('pt-BR') : 'N/D';

const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0;
    const diffTime = new Date(expiryDate) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
};

const getExpiryProgressClass = (date) => {
    const days = getDaysRemaining(date);
    if (days <= 0) return 'progress-error';
    if (days <= 30) return 'progress-warning';
    return 'progress-primary';
};

const deleteDriver = (driver) => {
    if (confirm(`Remover motorista ${driver.name}?`)) {
        const idx = fleetStore.drivers.findIndex(d => d.id === driver.id);
        if (idx !== -1) {
            fleetStore.drivers.splice(idx, 1);
            fleetStore.saveToStorage();
        }
    }
};
</script>