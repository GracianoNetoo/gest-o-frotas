<template>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Motoristas Cadastrados</h2>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar motorista..."
          class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motorista</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CNH / Categoria</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="driver in filteredDrivers" :key="driver.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="h-10 w-10 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {{ driver.name.charAt(0) }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ driver.name }}</div>
                  <div class="text-sm text-gray-500">{{ driver.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">{{ driver.cnh }}</div>
              <div class="text-xs text-gray-500">Cat: {{ driver.category }}</div>
            </td>
            <td class="px-6 py-4">
              <span :class="statusClass(driver.status)" class="px-2 py-1 text-xs rounded-full font-semibold">
                {{ driver.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Mock de dados (Em um sistema real, isso viria de uma API)
const drivers = ref([
  { id: 1, name: 'João Silva', email: 'joao.s@frota.com', cnh: '123456789', category: 'D', status: 'Disponível' },
  { id: 2, name: 'Maria Santos', email: 'maria.s@frota.com', cnh: '987654321', category: 'E', status: 'Em Viagem' },
  { id: 3, name: 'Carlos Oliveira', email: 'carlos.o@frota.com', cnh: '456123789', category: 'C', status: 'Folga' },
]);

const searchQuery = ref('');

// Lógica de busca
const filteredDrivers = computed(() => {
  return drivers.value.filter(d => 
    d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    d.cnh.includes(searchQuery.value)
  );
});

// Estilização dinâmica de status
const statusClass = (status) => {
  return {
    'bg-green-100 text-green-800': status === 'Disponível',
    'bg-blue-100 text-blue-800': status === 'Em Viagem',
    'bg-yellow-100 text-yellow-800': status === 'Folga',
  };
};

const viewDriver = (id) => console.log('Editando motorista:', id);
const deleteDriver = (id) => console.log('Excluindo motorista:', id);
</script>