<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-2xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:account-plus" class="text-primary" />
        Cadastrar Novo Motorista
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Insira as informações básicas e funcionais do colaborador.</p>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Nome Completo</span></label>
          <input v-model="form.name" type="text" placeholder="Ex: João Silva" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">NIF / BI</span></label>
          <input v-model="form.nif" type="text" placeholder="000.000.000.00" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Telefone</span></label>
          <input v-model="form.phone" type="tel" placeholder="900 000 000" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Categoria de Licença</span></label>
          <select v-model="form.category" class="select select-bordered dark:bg-gray-800 dark:text-white w-full" required>
            <option disabled value="">Selecione</option>
            <option>Ligeiros (B)</option>
            <option>Pesados (C/D)</option>
            <option>Motociclos (A)</option>
            <option>Profissional (E)</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Validade da Licença</span></label>
          <input v-model="form.licenseExpiry" type="date" class="input input-bordered dark:bg-gray-800 dark:text-white w-full" required />
        </div>

        <div class="md:col-span-2 mt-4 flex justify-end gap-3">
          <button type="button" @click="$emit('navigate', 'drivers')" class="btn btn-ghost dark:text-gray-300">Cancelar</button>
          <button type="submit" class="btn btn-primary px-8 text-white">
            <Icon icon="mdi:check-circle" class="w-5 h-5 mr-2" />
            Salvar Motorista
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore'; // Importando a Store

const emit = defineEmits(['navigate']);

const form = ref({
  name: '',
  nif: '',
  phone: '',
  category: '',
  licenseExpiry: '' // Data para controle automático
});

const handleSubmit = () => {
  // Lógica para definir o status inicial da licença
  const expiryDate = new Date(form.value.licenseExpiry);
  const today = new Date();
  
  // Calculamos o status (simplificado)
  let licenseStatus = 'Ativa';
  if (expiryDate < today) {
    licenseStatus = 'Vencida';
  } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) < 30) {
    licenseStatus = 'Alerta'; // Vence em menos de 30 dias
  }

  // Salvando na Store (usando o método addDriver que definimos na Store)
  fleetStore.addDriver({
    ...form.value,
    status: licenseStatus,
    createdAt: new Date().toISOString()
  });

  alert('Motorista cadastrado com sucesso!');
  emit('navigate', 'drivers');
};
</script>