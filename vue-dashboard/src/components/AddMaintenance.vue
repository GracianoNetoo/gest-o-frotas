<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-2xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:tools" class="text-info" />
        Agendar Manutenção
      </h2>
      <p class="text-sm opacity-60 mb-6">Selecione o veículo e defina os detalhes do serviço técnico.</p>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Veículo</span></label>
          <select v-model="form.vehiclePlate" class="select select-bordered dark:bg-gray-800 w-full" required>
            <option disabled value="">Selecione a Placa</option>
            <option v-for="v in fleetStore.vehicles" :key="v.plate" :value="v.plate">
              {{ v.plate }} - {{ v.model }}
            </option>
          </select>
          <label v-if="fleetStore.vehicles.length === 0" class="label">
            <span class="label-text-alt text-error">Nenhum veículo cadastrado!</span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Tipo de Serviço</span></label>
          <input
            v-model="form.serviceType"
            type="text"
            placeholder="Ex: Troca de Óleo, Travões..."
            class="input input-bordered dark:bg-gray-800 w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Data Agendada</span></label>
          <input
            v-model="form.plannedDate"
            type="date"
            class="input input-bordered dark:bg-gray-800 w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Oficina / Local</span></label>
          <input
            v-model="form.workshop"
            type="text"
            placeholder="Nome da oficina"
            class="input input-bordered dark:bg-gray-800 w-full"
          />
        </div>
        <div class="form-control w-full">
            <label class="label"><span class="label-text dark:text-gray-300">Custo Estimado</span></label>
            <div class="join w-full">
                <span class="join-item btn btn-disabled dark:bg-gray-700 text-lg font-bold text-success">Kz</span>
                <input
                v-model="form.estimatedCost"
                type="number"
                class="input input-bordered join-item w-full dark:bg-gray-800 focus:outline-none"
                />
                <span class="join-iten btn btn-disbled dark:bg-gray-800 focus-ring text-md font-black text-info">1.000</span>
            </div>
        </div>
        <div class="md:col-span-2 mt-4 flex justify-end gap-3">
          <button type="button" @click="$emit('navigate', 'maintenances')" class="btn btn-ghost dark:text-gray-300">Cancelar</button>
          <button type="submit" class="btn btn-info px-8 text-white">
            <Icon icon="mdi:calendar-check" class="w-5 h-5 mr-2" />
            Confirmar Agendamento
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const emit = defineEmits(['navigate']);

const form = ref({
  vehiclePlate: '',
  serviceType: '',
  plannedDate: '',
  workshop: '',
  estimatedCost: 0,
  status: 'Agendada' // Status inicial padrão
});

const handleSubmit = () => {
  // Certifica-se de que pegamos o valor exatamente como digitado, sem multiplicações escondidas
  const valorDigitado = parseFloat(form.value.estimatedCost) || 0;

  const maintenanceData = {
    ...form.value,
    id: Date.now(),
    estimatedCost: valorDigitado, // SALVA O VALOR REAL
    status: 'Agendada'
  };

  fleetStore.addMaintenance(maintenanceData);

  // Atualiza o veículo
  const veiculo = fleetStore.vehicles.find(v => v.plate === form.value.vehiclePlate);
  if (veiculo) veiculo.status = 'Manutenção';

  fleetStore.saveToStorage();
  emit('navigate', 'maintenancehistory');
};
</script>