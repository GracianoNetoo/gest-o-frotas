<template>
  <div class="drawer lg:drawer-open font-display">
    <input type="checkbox" id="my-drawer" class="drawer-toggle" />
    <!--Page Content-->
    <div class="drawer-content flex flex-col">
      <Navbar
        :isDark="isDark"
        @toggle-drawer="toggleDrawer"
        @toggle-theme="toggleTheme"
      />
      <!-- Main Content -->
      <main class="flex-1 p-6 bg-base-200 dark:bg-backgroundDark">
        <!-- Dashboard View -->
        <div v-if="currentView === 'dashboard'">
          <StatsCards />
          <Charts />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Recents class="lg:col-span-2" />
            <RecentActivity />
          </div>
          <StackBarChart class="lg:col-span-1 mt-6" />
        </div>

        <!-- Categories View -->
        <div v-if="currentView === 'categories'">
          <AllCategories />
        </div>
        <!-- Vehicles View -->
        <div v-if="currentView === 'vehicles'">
          <Vehicles @navigate="handleNavigation" />
        </div>
        <!-- AddVehicles View -->
        <div v-if="currentView === 'add-vehicle' || currentView === 'addvehicles'">
          <AddVehicles @navigate="handleNavigation" />
        </div>
      </main>
    </div>

    <div
      class="drawer-side bg-white dark:bg-backgroundDark border border-gray-200 dark:border-primary/10"
    >
      <Sidebar @navigate="handleNavigation" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import StatsCards from "./components/StatsCards.vue";
import Charts from "./components/Charts.vue";
import Recents from "./components/Recents.vue";
import RecentActivity from "./components/RecentActivity.vue";
import StackBarChart from "./components/StackBarChart.vue";
import AllCategories from "./components/AllCategories.vue";
import Vehicles from "./components/Vehicles.vue";
import AddVehicles from "./components/AddVehicles.vue";

const isDark = ref(true);
const currentView = ref("dashboard");

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else if (systemPrefersDark) {
    isDark.value = true;
  }
});

watchEffect(() => {
  const html = document.documentElement;
  if (isDark.value) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

const toggleDrawer = () => {
  const drawer = document.getElementById("my-drawer");
  if (drawer) {
    drawer.checked = !drawer.checked;
  }
};

const handleNavigation = (view) => {
  currentView.value = view;
  // Fechar drawer em mobile após navegação
  if (window.innerWidth < 1024) {
    const drawer = document.getElementById("my-drawer");
    if (drawer) {
      drawer.checked = false;
    }
  }
};
</script>

<style scoped></style>
