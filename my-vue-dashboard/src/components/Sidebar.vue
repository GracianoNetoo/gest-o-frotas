<template>
  <label
    for="my-drawer"
    aria-label="Close sidebar"
    class="drawer-overlay"
  ></label>
  <nav
    class="menu p-4 w-89 min-h-full text-gray-800 dark:text-gray-200"
    aria-label="Main navigation"
  >
    <header class="mb-4 flex p-4">
      <h1 class="text-xl font-bold dark:text-white">Gestão de Frotas</h1>
    </header>
    <ul role="menu">
      <li
        role="none"
        class="p-2"
        v-for="(link, index) in links"
        :key="index"
      >
        <button
          type="button"
          role="menuItem"
          :aria-expanded="!!link.children && link.open"
          :aria-haspopup="!!link.children"
          :class="{ active: link.active }"
          @click="handleMainClick(index, link)"
          class="flex items-center w-full text-left hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white"
        >
          <Icon :icon="link.icon" class="h-5 w-5" />
          <span class="ml-2"> {{ link.name }} </span>
          <span v-if="link.children" class="ml-auto dropdown-icon">
            <Icon
              :icon="
                link.open
                  ? 'line-md:chevron-down'
                  : 'line-md:chevron-right'
              "
            />
          </span>
        </button>
        <ul
          v-if="link.children && link.open"
          class="ml-4 pl-4 border-l border-gray-200 dark:border-white/10"
        >
          <li
            v-for="(child, childIndex) in link.children"
            :key="childIndex"
          >
            <a
              href="#"
              @click.prevent="handleChildClick(child.name)"
              class="block py-1 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {{ child.name }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from '@iconify/vue';

const links = ref([
  {
    name: "Dashboard",
    icon: "line-md:home",
    active: true,
    open: false,
  },
  {
    name: "Veículos",
    icon: "line-md:car",
    active: false,
    open: false,
    children: [
      { name: "Todos os Veículos" },
      { name: "Adicionar Veículo" },
      { name: "Categorias" },
    ],
  },
  {
    name: "Motoristas",
    icon: "line-md:account",
    active: false,
    open: false,
    children: [
      { name: "Todos os Motoristas" },
      { name: "Adicionar Motorista" },
      { name: "Licenças" },
    ],
  },
  {
    name: "Manutenções",
    icon: "line-md:wrench",
    active: false,
    open: false,
    children: [
      { name: "Agendadas" },
      { name: "Em Andamento" },
      { name: "Histórico" },
    ],
  },
  {
    name: "Rotas",
    icon: "line-md:map",
    active: false,
    open: false,
  },
  {
    name: "Combustível",
    icon: "line-md:gas-station",
    active: false,
    open: false,
  },
  {
    name: "Relatórios",
    icon: "line-md:document-list",
    active: false,
    open: false,
  },
  {
    name: "Configurações",
    icon: "line-md:cog-filled",
    active: false,
    open: false,
  },
]);

const emit = defineEmits(['navigate']);

const handleMainClick = (index, link) => {
  // Se não tem filhos, navega diretamente
  if (!link.children) {
    const viewMap = {
      'Dashboard': 'dashboard',
      'Rotas': 'routes',
      'Combustível': 'fuel',
      'Relatórios': 'reports',
      'Configurações': 'settings'
    };
    const view = viewMap[link.name] || 'dashboard';
    emit('navigate', view);
  }
  
  //Toggle open state for items with children
  if (link.children) {
    link.open = !link.open;
  }

  //Set Active state
  links.value.forEach((l, i) => {
    l.active = i === index;
  });
};

const handleChildClick = (childName) => {
  const viewMap = {
    'Categorias': 'categories',
    'Todos os Veículos': 'vehicles',
    'Adicionar Veículo': 'add-vehicle',
    'Todos os Motoristas': 'drivers',
    'Adicionar Motorista': 'add-driver',
    'Licenças': 'licenses',
    'Agendadas': 'scheduled-maintenance',
    'Em Andamento': 'ongoing-maintenance',
    'Histórico': 'maintenance-history'
  };
  
  const view = viewMap[childName] || 'dashboard';
  emit('navigate', view);
};
</script>
