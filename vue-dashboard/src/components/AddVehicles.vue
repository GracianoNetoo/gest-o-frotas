<template>
    <div class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20">
        <div class="card-body">
            <div class="flex items-center gap-4 mb-6">
                <button @click="goBack" class="btn btn-ghost btn-sm">
                    <Icon icon="line-md:arrow-left" class="w-5 h-5"/>
                </button>
                <h2 class="card-title">Adicionar Novo Veículo</h2>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Placa -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Placa *</span>
                        </label>
                        <input
                            type="text"
                            v-model="formData.plate"
                            placeholder="ABC-1234"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                            required
                        />
                    </div>

                    <!-- Modelo -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Modelo *</span>
                        </label>
                        <input
                            type="text"
                            v-model="formData.model"
                            placeholder="Ford Ranger"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                            required
                        />
                    </div>

                    <!-- Categoria -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Categoria *</span>
                        </label>
                        <select
                            v-model="formData.category"
                            class="select select-bordered dark:bg-white/5 dark:border-white/10"
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="Caminhões">Caminhões</option>
                            <option value="Vans">Vans</option>
                            <option value="Carros">Carros</option>
                            <option value="Motocicletas">Motocicletas</option>
                        </select>
                    </div>

                    <!-- Ano -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Ano *</span>
                        </label>
                        <input 
                            type="number"
                            v-model="formData.year"
                            placeholder="2024"
                            min="1900"
                            :max="new Date().getFullYear() + 1"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                            required
                        />
                    </div>
                    <!-- Motorista -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Motorista</span>
                        </label>
                        <select
                            v-model="formData.driver"
                            class="select select-bordered dark:bg-white/5 dark:border-white/10"
                        >
                            <option value="">Sem motorista atribuído</option>
                            <option value="João Silva">João Silva</option>
                            <option value="Maria Santos">Maria Santos</option>
                            <option value="Pedro Costa">Pedro Costa</option>
                            <option value="Ana Oliveira">Ana Oliveira</option>
                        </select>
                    </div>
                    <!-- Status -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Status *</span>
                        </label>
                        <select
                            v-model="formData.status"
                            class="select select-bordered dark:bg-white/5 dark:border-white/10"
                            required
                        >
                            <option value="Disponível">Disponível</option>
                            <option value="Em Uso">Em Uso</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Indisponível">Indisponível</option>
                        </select>
                    </div>
                    <!-- Chassi -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Chassi</span>
                        </label>
                        <input 
                            type="text"
                            v-model="formData.chassis"
                            placeholder="9BWZZZ377VT004251"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                        />
                    </div>

                    <!-- Cor -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Cor</span>
                        </label>
                        <input
                            type="text"
                            v-model="formData.color"
                            placeholder="Branco"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                        />
                    </div>

                    <!-- Quilometragem -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Quilometragem</span>
                        </label>
                        <input
                            type="number"
                            v-model="formData.mileage"
                            placeholder="0"
                            min="0"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                        />
                    </div>

                    <!-- Última Manutenção -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Data da Última Manutenção</span>
                        </label>
                        <input
                            type="date"
                            v-model="formData.lastMaintenance"
                            class="input input-bordered dark:bg-white/5 dark:border-white/10"
                        />
                    </div>
                </div>

                <!-- Observações -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Observações</span>
                    </label>
                    <textarea
                        v-model="formData.notes"
                        class="textarea textarea-bordered h-24 dark:bg-white/5 dark:border-white/10"
                        placeholder="Adicione observações sobre o veículo..."
                    ></textarea>
                </div>

                <!-- Botões de ação -->
                <div class="flex justify-end gap-4 mt-6">
                    <button type="button" @click="goBack" class="btn btn-ghost">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <Icon icon="line-md:check" class="w-5 h-5 mr-1"/>
                        Salvar Veículo
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

const formData = ref({
    plate: '',
    model: '',
    category: '',
    year: new Date().getFullYear(),
    driver: '',
    status: 'Disponível',
    chassis: '',
    color: '',
    mileage: 0,
    lastMaintenance: '',
    notes: ''
});

const handleSubmit = () => {
    console.log('Salvando veículo:', formData.value);
    // Aqui você pode adicionar a lógica para salvar o veículo
    alert('Veículo cadastrado com sucesso!');
    // Limpar formulário ou navegar de volta
    resetForm();
    emit('navigate', 'vehicles');
};

const resetForm = () => {
    formData.value = {
        plate: '',
        model: '',
        category: '',
        year: new Date().getFullYear(),
        driver: '',
        status: 'Disponível',
        chassis: '',
        color: '',
        mileage: 0,
        lastMaintenance: '',
        notes: ''
    };
};

const goBack = () => {
    emit('navigate', 'vehicles');
};
</script>

