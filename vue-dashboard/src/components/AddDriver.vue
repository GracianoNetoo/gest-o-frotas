<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center gap-4 mb-8">
      <button @click="$emit('navigate', 'drivers')" class="btn btn-ghost btn-circle">
        <Icon icon="mdi:arrow-left" class="w-6 h-6" />
      </button>
      <h1 class="text-3xl font-bold dark:text-white">Cadastrar Novo Motorista</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-white/5 p-8 rounded-2xl shadow-lg border border-base-200 dark:border-white/10">
      
      <div class="form-control w-full col-span-2">
        <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Nome Completo</span></label>
        <input v-model="form.name" type="text" placeholder="Ex: João Silva" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
      </div>

      <div class="form-control w-full">
        <label class="label"><span class="label-text dark:text-gray-300 font-semibold">NIF / Identificação</span></label>
        <input v-model="form.nif" type="text" placeholder="000000000" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
      </div>

      <div class="form-control w-full">
        <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Telefone</span></label>
        <input v-model="form.phone" type="tel" placeholder="900 000 000" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" />
      </div>

      <div class="form-control w-full">
        <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Categoria da Carta</span></label>
        <select v-model="form.category" class="select select-bordered dark:bg-gray-800 dark:text-white w-full">
          <option disabled value="">Selecione a categoria</option>
          <option value="A">A (Motociclos)</option>
          <option value="B">B (Ligeiros)</option>
          <option value="C">C (Pesados de Mercadorias)</option>
          <option value="D">D (Pesados de Passageiros)</option>
        </select>
      </div>

      <div class="form-control w-full">
        <label class="label"><span class="label-text dark:text-gray-300 font-semibold">Vencimento da Carta</span></label>
        <input v-model="form.licenseExpiry" type="date" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
      </div>

      <div class="col-span-2 flex justify-end gap-3 mt-6">
        <button type="button" @click="$emit('navigate', 'drivers')" class="btn btn-ghost">Cancelar</button>
        <button type="submit" class="btn btn-primary px-8 text-white">Salvar Motorista</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const emit = defineEmits(['navigate']);

const form = ref({
  name: '',
  nif: '',
  phone: '',
  category: 'B',
  licenseExpiry: '',
  status: 'Ativa'
});

const handleSubmit = () => {
  try {
    // 1. Criar o novo motorista garantindo os nomes das chaves
    const newDriver = {
      id: Date.now(),
      name: form.value.name,
      nif: form.value.nif,
      phone: form.value.phone,
      category: form.value.category,
      licenseExpiry: form.value.licenseExpiry, // ISO string vinda do input date
      status: 'Ativa' // O status será recalculado automaticamente na listagem
    };

    // 2. Adicionar ao Store
    if (!fleetStore.drivers) fleetStore.drivers = [];
    fleetStore.drivers.push(newDriver);

    // 3. Persistir
    fleetStore.saveToStorage();

    // 4. Navegar de volta
    emit('navigate', 'drivers');
  } catch (err) {
    console.error("Erro ao salvar:", err);
    alert("Falha ao salvar motorista.");
  }
};
</script>