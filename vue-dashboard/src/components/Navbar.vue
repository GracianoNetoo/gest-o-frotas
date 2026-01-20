<template>
  <header
    class="navbar bg-white dark:bg-gray-900 dark:border-b dark:border-white/10 sticky top-0 z-10 shadow-sm px-4"
  >
    <nav class="flex-none lg:hidden">
      <label @click="$emit('toggle-drawer')" class="btn btn-square btn-ghost">
        <Icon
          icon="line-md:close-to-menu-alt-transition"
          class="inline-block w-5 h-5"
        />
      </label>
    </nav>

    <section class="flex-1">
      <div class="form-control">
        <div class="relative flex items-center">
          <Icon icon="mdi:magnify" class="absolute left-3 opacity-50" />
          <input
            type="text"
            placeholder="Pesquisar frota..."
            class="input input-bordered pl-10 w-46 md:w-auto dark:bg-white/5 dark:border-white/10 focus:border-primary transition-all"
          />
        </div>
      </div>
    </section>

    <section class="flex items-center gap-4">
      <button
        @click="$emit('toggle-theme')"
        class="btn btn-ghost btn-circle dark:bg-white/5"
        title="Alternar tema"
      >
        <Icon
          :icon="isDark ? 'line-md:sunny-outline-to-moon-alt-loop-transition' : 'line-md:moon-alt-to-sunny-outline-loop-transition'"
          class="w-6 h-6"
        />
      </button>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="flex items-center gap-3 hover:bg-base-200 dark:hover:bg-white/5 p-1 rounded-full transition-all cursor-pointer">
          <span class="hidden md:block text-sm font-medium dark:text-gray-200 ml-2">
            {{ userName }}
          </span>
          
          <div class="avatar">
            <div class="w-10 rounded-full ring ring-primary/20 ring-offset-base-100">
              <img v-if="userPhoto" :src="userPhoto" alt="Avatar" class="object-cover" />
              <img v-else src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Default" />
            </div>
          </div>
        </div>

        <ul
          tabindex="0"
          class="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box w-52 space-y-1 border dark:border-white/10"
        >
          <div class="px-4 py-2 border-b dark:border-white/5 mb-1 md:hidden">
             <p class="font-bold text-xs uppercase opacity-50">Usuário</p>
             <p class="truncate">{{ userName }}</p>
          </div>
          <li><a @click="$emit('navigate', 'settings')"><Icon icon="mdi:account-outline" /> Perfil</a></li>
          <li><a @click="$emit('navigate', 'settings')"><Icon icon="mdi:cog-outline" /> Configurações</a></li>
          <div class="divider my-0 opacity-20"></div>
          <li><a class="text-error"><Icon icon="mdi:logout" /> Terminar sessão</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';

defineProps({
  isDark: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["toggle-drawer", "toggle-theme", "navigate"]);

// Variáveis reativas para refletir o que está nas Configurações
const userName = ref('Admin');
const userPhoto = ref(null);

// Função para carregar dados do localStorage
const loadUserData = () => {
  userName.value = localStorage.getItem('settings_user_name') || 'Admin';
  userPhoto.value = localStorage.getItem('settings_user_photo') || null;
};

// Carrega ao montar e fica atento a mudanças
onMounted(() => {
  loadUserData();
  // Listener para caso o usuário mude o perfil em outra aba ou componente
  window.addEventListener('storage', loadUserData);
});
</script>