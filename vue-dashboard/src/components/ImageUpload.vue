<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text font-bold dark:text-gray-300">{{ label }}</span>
    </label>
    
    <div class="flex items-center gap-4">
      <div class="avatar shadow-md border dark:border-gray-600 rounded-lg overflow-hidden bg-base-200">
        <div class="w-16 h-16 flex items-center justify-center">
          <img v-if="preview" :is="preview" :src="preview" class="object-cover w-full h-full" />
          <Icon v-else icon="mdi:image-plus" class="text-3xl opacity-20" />
        </div>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        class="hidden" 
        ref="fileInput" 
        @change="handleFile" 
      />
      
      <button 
        type="button" 
        @click="$refs.fileInput.click()" 
        class="btn btn-sm btn-outline btn-primary"
      >
        <Icon icon="mdi:upload" /> Selecionar Foto
      </button>
      
      <button 
        v-if="preview" 
        @click="removeImage" 
        type="button" 
        class="btn btn-sm btn-ghost text-error"
      >
        <Icon icon="mdi:trash-can" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps(['label', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const preview = ref(props.modelValue || null);
const fileInput = ref(null);

const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validar tamanho (Max 1MB para não estourar o LocalStorage)
  if (file.size > 1024 * 1024) {
    alert("A imagem é muito grande! Escolha uma foto com menos de 1MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    preview.value = event.target.result;
    emit('update:modelValue', event.target.result); // Envia o Base64 para o formulário pai
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  preview.value = null;
  emit('update:modelValue', null);
};
</script>