<template>
  <div class="card bg-base-100 dark:bg-white/5 shadow-xl border border-base-200 dark:border-gray-700">
    <div class="card-body">
      <h2 class="card-title text-2xl text-gray-800 dark:text-white flex items-center gap-2">
        <Icon icon="mdi:map-marker-plus" class="text-primary" />
        Iniciar Nova Rota
      </h2>
      <p class="text-sm opacity-60 mb-6">Selecione os recursos e defina o trajeto para o início da operação.</p>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300 font-bold">Veículo Disponível</span></label>
          <select v-model="form.vehiclePlate" class="select select-bordered dark:bg-gray-800 w-full" required>
            <option disabled value="">Selecione um veículo</option>
            <option v-for="v in availableVehicles" :key="v.plate" :value="v.plate">
              {{ v.plate }} - {{ v.model }}
            </option>
          </select>
          <label class="label" v-if="availableVehicles.length === 0">
            <span class="label-text-alt text-error font-semibold">⚠️ Nenhum veículo disponível para uso.</span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300 font-bold">Motorista Habilitado</span></label>
          <select v-model="form.driverName" class="select select-bordered dark:bg-gray-800 w-full" required>
            <option disabled value="">Selecione um motorista</option>
            <option v-for="d in qualifiedDrivers" :key="d.id" :value="d.name">
              {{ d.name }} (Cat: {{ d.category }})
            </option>
          </select>
          <label class="label" v-if="qualifiedDrivers.length === 0">
            <span class="label-text-alt text-error font-semibold">⚠️ Nenhum motorista com licença ativa.</span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Ponto de Origem</span></label>
          <input v-model="form.origin" type="text" placeholder="Ex: Porto de Luanda" class="input input-bordered dark:bg-gray-800 w-full" required />
        </div>

        <div class="form-control w-full">
          <label class="label"><span class="label-text dark:text-gray-300">Ponto de Destino</span></label>
          <input v-model="form.destination" type="text" placeholder="Ex: Benguela Central" class="input input-bordered dark:bg-gray-800 w-full" required />
        </div>

        <div class="md:col-span-2 mt-4 flex justify-end gap-3">
          <button type="button" @click="$emit('navigate', 'routes')" class="btn btn-ghost dark:text-gray-300">Cancelar</button>
          <button type="submit" class="btn btn-primary px-8 text-white" :disabled="availableVehicles.length === 0 || qualifiedDrivers.length === 0">
            <Icon icon="mdi:play-circle" class="w-5 h-5 mr-2" />
            Lançar Rota
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { fleetStore } from '../store/fleetStore';

const emit = defineEmits(['navigate']);

const form = ref({
  vehiclePlate: '',
  driverName: '',
  origin: '',
  destination: '',
  progress: 0,
  status: 'Em Execução'
});


const availableVehicles = computed(() => {
  return (fleetStore.vehicles || []).filter(v => v.status === 'Disponível');
});

const qualifiedDrivers = computed(() => {
  return (fleetStore.drivers || []).filter(d => {

    return d.status === 'Ativa' || d.status === 'Alerta' || !d.status;
  });
});

const handleSubmit = () => {

  fleetStore.addRoute({ ...form.value });

  // B. Atualizar o status do veículo na Store Global
  const vehicle = fleetStore.vehicles.find(v => v.plate === form.value.vehiclePlate);
  if (vehicle) {
    vehicle.status = 'Em Uso';
    vehicle.driver = form.value.driverName;
  }

  fleetStore.saveToStorage();

  alert(`Rota iniciada! Veículo ${form.value.vehiclePlate} está agora em trânsito.`);
  emit('navigate', 'routes');
};
</script>