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
          <input v-model="form.name" type="text" placeholder="Ex: João Silva" class="input input-bordered dark:bg-gray-700 dark:text-white w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">NIF</span></label>
          <input v-model="form.nif" type="text" placeholder="000.000.000.00" class="input input-bordered dark:bg-gray-700 dark:text-white w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Telefone</span></label>
          <input v-model="form.phone" type="tel" placeholder="000-000-000" class="input input-bordered dark:bg-gray-700 dark:text-white w-full" />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Categoria CNH</span></label>
          <select v-model="form.category" class="select select-bordered dark:bg-gray-700 dark:text-white w-full">
            <option disabled value="">Selecione</option>
            <option>Caminhões</option>
            <option>Carros</option>
            <option>Vans</option>
            <option>Motocicletas</option>
          </select>
        </div>

        <div class="md:col-span-2 mt-4 flex justify-end gap-3">
          <button type="button" @click="$emit('navigate', 'drivers')" class="btn btn-ghost dark:text-gray-300">Cancelar</button>
          <button type="submit" class="btn btn-primary px-8">
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

const emit = defineEmits(['navigate']);

const form = ref({
  name: '',
  nif: '',
  phone: '',
  category: ''
});

const handleSubmit = () => {
  console.log('Dados salvos:', form.value);
  emit('navigate', 'drivers');
};
</script>